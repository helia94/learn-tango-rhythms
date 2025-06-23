import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useTopicActivation } from './useTopicActivation';
import { useUnlockAll } from './useFeatureFlag';

export const useDailyTopicActivation = (topicKey: string, topicIndex: number, totalDays: number) => {
  const [activatedDays, setActivatedDays] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, profile } = useAuth();
  const { getActiveTopic } = useTopicActivation();
  const unlockAllEnabled = useUnlockAll();

  // Check if current user has admin unlock all activated
  const checkAdminUnlockAll = async (): Promise<boolean> => {
    if (!profile?.username) return false;

    try {
      // First check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('username')
        .eq('username', profile.username)
        .single();

      if (adminError || !adminData) {
        return false; // Not an admin
      }

      // Then check if unlock all is activated for this admin
      const { data: unlockData, error: unlockError } = await supabase
        .from('unlock_all_activated')
        .select('id')
        .eq('username', profile.username)
        .eq('index_activated', 1)
        .single();

      return !unlockError && !!unlockData;
    } catch (error) {
      console.error('Error checking admin unlock all:', error);
      return false;
    }
  };

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

    // Check if admin unlock all is active or regular unlock all is enabled
    const isAdminUnlockAllActive = await checkAdminUnlockAll();
    
    // If unlockAll or admin unlock all is enabled, skip time restrictions
    if (!unlockAllEnabled && !isAdminUnlockAllActive) {
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

      // Update local state
      setActivatedDays(prev => [...prev, dayIndex].sort((a, b) => a - b));
      console.log(`Day ${dayIndex} activated for topic ${topicKey}`);
    } catch (error) {
      console.error('Error activating day:', error);
      throw error;
    }
  };

  const whichDailiesWereActivated = async (): Promise<number[]> => {
    // Check if admin unlock all is active
    const isAdminUnlockAllActive = await checkAdminUnlockAll();
    
    // If unlockAll or admin unlock all is enabled, return all days as activated
    if (unlockAllEnabled || isAdminUnlockAllActive) {
      return Array.from({ length: totalDays }, (_, i) => i + 1);
    }
    return [...activatedDays].sort((a, b) => a - b);
  };

  const whichDailyIsNextOnActivationOrder = async (): Promise<number | null> => {
    // Check if admin unlock all is active
    const isAdminUnlockAllActive = await checkAdminUnlockAll();
    
    // If unlockAll or admin unlock all is enabled, all days are available
    if (unlockAllEnabled || isAdminUnlockAllActive) {
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
    // Check if admin unlock all is active
    const isAdminUnlockAllActive = await checkAdminUnlockAll();
    
    // If unlockAll or admin unlock all is enabled, next daily can always be activated
    if (unlockAllEnabled || isAdminUnlockAllActive) {
      return new Date(); // Immediate activation
    }

    const nextDay = await whichDailyIsNextOnActivationOrder();
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
    // Check if admin unlock all is active
    const isAdminUnlockAllActive = await checkAdminUnlockAll();
    
    // If unlockAll or admin unlock all is enabled, any day can be activated
    if (unlockAllEnabled || isAdminUnlockAllActive) {
      return !activatedDays.includes(dayIndex); // Only prevent if already activated
    }

    if (activatedDays.includes(dayIndex)) {
      return false; // Already activated
    }

    const nextDay = await whichDailyIsNextOnActivationOrder();
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
    // Check if admin unlock all is active
    const isAdminUnlockAllActive = await checkAdminUnlockAll();
    
    // If unlockAll or admin unlock all is enabled, no waiting time
    if (unlockAllEnabled || isAdminUnlockAllActive) {
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

  // Return all required values, but use async versions for functions that check admin unlock all
  const nextDayToActivate = null; // This will be calculated async now

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
