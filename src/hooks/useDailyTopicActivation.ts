
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useTopicActivation } from './useTopicActivation';
import { useUnlockAll } from './useFeatureFlag';

export const useDailyTopicActivation = (topicKey: string, topicIndex: number, totalDays: number) => {
  const [activatedDays, setActivatedDays] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Cache recent activations to avoid race conditions with database
  const [recentActivations, setRecentActivations] = useState<Map<number, Date>>(new Map());
  const { user } = useAuth();
  const { getActiveTopic } = useTopicActivation();
  const unlockAllEnabled = useUnlockAll();

  const fetchActivatedDays = async () => {
    if (!user) {
      setActivatedDays([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('daily_topic_activations')
        .select('day_index')
        .eq('user_id', user.id)
        .eq('topic_key', topicKey)
        .eq('topic_index', topicIndex)
        .order('day_index');

      if (error) {
        console.error('Error fetching daily activations:', error);
        setActivatedDays([]);
      } else {
        const dayIndices = data.map(item => item.day_index);
        setActivatedDays(dayIndices);
      }
    } catch (error) {
      console.error('Error fetching daily activations:', error);
      setActivatedDays([]);
    } finally {
      setIsLoading(false);
    }
  };

  const activateDay = async (dayIndex: number) => {
    if (!user) {
      throw new Error('User must be logged in to activate day');
    }

    // If unlockAll is enabled, skip time restrictions
    if (!unlockAllEnabled) {
      // Check if we can activate this day
      const canActivate = await canActivateDay(dayIndex);
      if (!canActivate) {
        throw new Error('Cannot activate this day yet - minimum wait time not met');
      }
    }

    try {
      const { error } = await supabase
        .from('daily_topic_activations')
        .insert({
          user_id: user.id,
          topic_key: topicKey,
          topic_index: topicIndex,
          day_index: dayIndex
        });

      if (error) {
        throw error;
      }

      // Update local state and cache the activation time
      const activationTime = new Date();
      setActivatedDays(prev => [...prev, dayIndex].sort((a, b) => a - b));
      setRecentActivations(prev => new Map(prev).set(dayIndex, activationTime));
      console.log(`Day ${dayIndex} activated for topic ${topicKey}`);
    } catch (error) {
      console.error('Error activating day:', error);
      throw error;
    }
  };

  const whichDailiesWereActivated = (): number[] => {
    // If unlockAll is enabled, return all days as activated
    if (unlockAllEnabled) {
      return Array.from({ length: totalDays }, (_, i) => i + 1);
    }
    return [...activatedDays].sort((a, b) => a - b);
  };

  const whichDailyIsNextOnActivationOrder = (): number | null => {
    // If unlockAll is enabled, all days are available
    if (unlockAllEnabled) {
      return null; // All days are unlocked
    }
    
    // Find the first day that hasn't been activated yet
    for (let day = 1; day <= totalDays; day++) {
      if (!activatedDays.includes(day)) {
        return day;
      }
    }
    return null; // All days have been activated
  };

  const getTopicActivationDate = async (): Promise<Date | null> => {
    try {
      const activeTopic = await getActiveTopic();
      if (!activeTopic || activeTopic.topic_key !== topicKey || activeTopic.topic_index !== topicIndex) {
        return null;
      }
      return new Date(activeTopic.activated_at);
    } catch (error) {
      console.error('Error getting topic activation date:', error);
      return null;
    }
  };

  const getLastDailyActivationDate = async (): Promise<Date | null> => {
    if (!user || activatedDays.length === 0) {
      return null;
    }

    // Check recent activations cache first to avoid race conditions
    const lastActivatedDay = Math.max(...activatedDays);
    const cachedActivation = recentActivations.get(lastActivatedDay);
    if (cachedActivation) {
      return cachedActivation;
    }

    try {
      const { data, error } = await supabase
        .from('daily_topic_activations')
        .select('activated_at')
        .eq('user_id', user.id)
        .eq('topic_key', topicKey)
        .eq('topic_index', topicIndex)
        .order('activated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error getting last daily activation:', error);
        return null;
      }

      return data && data.length > 0 ? new Date(data[0].activated_at) : null;
    } catch (error) {
      console.error('Error getting last daily activation:', error);
      return null;
    }
  };

  const whenCanNextDailyBeActivated = async (): Promise<Date | null> => {
    // If unlockAll is enabled, next daily can always be activated
    if (unlockAllEnabled) {
      return new Date(); // Immediate activation
    }

    const nextDay = whichDailyIsNextOnActivationOrder();
    if (nextDay === null) {
      return null; // All days activated
    }

    try {
      if (nextDay === 1) {
        // First daily needs one day delay from topic activation
        const topicActivationDate = await getTopicActivationDate();
        if (!topicActivationDate) {
          return null;
        }
        const nextActivationDate = new Date(topicActivationDate);
        nextActivationDate.setDate(nextActivationDate.getDate() + 1);
        return nextActivationDate;
      } else {
        // Subsequent dailies need one day delay from last daily activation
        const lastDailyActivation = await getLastDailyActivationDate();
        if (!lastDailyActivation) {
          return null;
        }
        const nextActivationDate = new Date(lastDailyActivation);
        nextActivationDate.setDate(nextActivationDate.getDate() + 1);
        return nextActivationDate;
      }
    } catch (error) {
      console.error('Error calculating when next daily can be activated:', error);
      return null;
    }
  };

  const canActivateDay = async (dayIndex: number): Promise<boolean> => {
    // If unlockAll is enabled, any day can be activated
    if (unlockAllEnabled) {
      return !activatedDays.includes(dayIndex); // Only prevent if already activated
    }

    if (activatedDays.includes(dayIndex)) {
      return false; // Already activated
    }

    const nextDay = whichDailyIsNextOnActivationOrder();
    if (nextDay !== dayIndex) {
      return false; // Not the next day in order
    }

    const nextActivationDate = await whenCanNextDailyBeActivated();
    if (!nextActivationDate) {
      return false;
    }

    const now = new Date();
    return now >= nextActivationDate;
  };

  const getTimeUntilNextActivation = async (): Promise<number | null> => {
    // If unlockAll is enabled, no waiting time
    if (unlockAllEnabled) {
      return 0;
    }

    const nextActivationDate = await whenCanNextDailyBeActivated();
    if (!nextActivationDate) {
      return null;
    }

    const now = new Date();
    const timeDiff = nextActivationDate.getTime() - now.getTime();
    return Math.max(0, timeDiff);
  };

  useEffect(() => {
    fetchActivatedDays();
  }, [user, topicKey, topicIndex]);

  // Return nextDayToActivate and unlockAllEnabled that were missing
  const nextDayToActivate = whichDailyIsNextOnActivationOrder();

  return {
    activatedDays,
    nextDayToActivate,
    unlockAllEnabled,
    activateDay,
    isLoading,
    refetch: fetchActivatedDays,
    whichDailiesWereActivated,
    whichDailyIsNextOnActivationOrder,
    whenCanNextDailyBeActivated,
    canActivateDay,
    getTimeUntilNextActivation
  };
};
