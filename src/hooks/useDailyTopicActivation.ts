
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useTopicActivation } from './useTopicActivation';

export const useDailyTopicActivation = (topicKey: string, topicIndex: number) => {
  const [activatedDays, setActivatedDays] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { getActiveTopic } = useTopicActivation();

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

    // Check if we can activate this day
    const canActivate = await canActivateDay(dayIndex);
    if (!canActivate) {
      throw new Error('Cannot activate this day yet - minimum wait time not met');
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

  const whichDailiesWereActivated = (): number[] => {
    return [...activatedDays].sort((a, b) => a - b);
  };

  const whichDailyIsNextOnActivationOrder = (): number | null => {
    // Find the first day that hasn't been activated yet
    for (let day = 1; day <= 7; day++) {
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

  return {
    activatedDays,
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
