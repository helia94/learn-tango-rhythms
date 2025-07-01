
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useTopicActivation } from './useTopicActivation';
import { useUnlockAll } from './useFeatureFlag';

export const useDailyTopicActivation = (topicKey: string, topicIndex: number, totalDays: number) => {
  const [activatedDays, setActivatedDays] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { getActiveTopic } = useTopicActivation();
  const unlockAllEnabled = useUnlockAll();

  console.log(`[useDailyTopicActivation] Hook initialized for topic: ${topicKey}, index: ${topicIndex}, unlockAll: ${unlockAllEnabled}`);

  const fetchActivatedDays = async () => {
    console.log(`[useDailyTopicActivation] fetchActivatedDays called for user: ${user?.id}, topic: ${topicKey}`);
    
    if (!user) {
      console.log(`[useDailyTopicActivation] No user found, setting empty activated days`);
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
        console.error('[useDailyTopicActivation] Error fetching daily activations:', error);
        setActivatedDays([]);
      } else {
        const dayIndices = data.map(item => item.day_index);
        console.log(`[useDailyTopicActivation] Fetched activated days:`, dayIndices);
        setActivatedDays(dayIndices);
      }
    } catch (error) {
      console.error('[useDailyTopicActivation] Error fetching daily activations:', error);
      setActivatedDays([]);
    } finally {
      setIsLoading(false);
      console.log(`[useDailyTopicActivation] fetchActivatedDays completed, isLoading set to false`);
    }
  };

  const activateDay = async (dayIndex: number) => {
    console.log(`[useDailyTopicActivation] activateDay called for day: ${dayIndex}, user: ${user?.id}`);
    
    if (!user) {
      const error = 'User must be logged in to activate day';
      console.error(`[useDailyTopicActivation] ${error}`);
      throw new Error(error);
    }

    // If unlockAll is enabled, skip time restrictions
    if (!unlockAllEnabled) {
      console.log(`[useDailyTopicActivation] Checking if day ${dayIndex} can be activated (unlockAll disabled)`);
      const canActivate = await canActivateDay(dayIndex);
      if (!canActivate) {
        const error = 'Cannot activate this day yet - minimum wait time not met';
        console.error(`[useDailyTopicActivation] ${error}`);
        throw new Error(error);
      }
    } else {
      console.log(`[useDailyTopicActivation] Skipping activation check (unlockAll enabled)`);
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
        console.error(`[useDailyTopicActivation] Database error activating day ${dayIndex}:`, error);
        throw error;
      }

      // Update local state
      setActivatedDays(prev => {
        const newActivatedDays = [...prev, dayIndex].sort((a, b) => a - b);
        console.log(`[useDailyTopicActivation] Updated activated days:`, newActivatedDays);
        return newActivatedDays;
      });
      console.log(`[useDailyTopicActivation] Day ${dayIndex} activated successfully for topic ${topicKey}`);
    } catch (error) {
      console.error('[useDailyTopicActivation] Error activating day:', error);
      throw error;
    }
  };

  const whichDailiesWereActivated = (): number[] => {
    // If unlockAll is enabled, return all days as activated
    if (unlockAllEnabled) {
      const allDays = Array.from({ length: totalDays }, (_, i) => i + 1);
      console.log(`[useDailyTopicActivation] whichDailiesWereActivated - unlockAll enabled, returning all days:`, allDays);
      return allDays;
    }
    const sortedDays = [...activatedDays].sort((a, b) => a - b);
    console.log(`[useDailyTopicActivation] whichDailiesWereActivated - returning activated days:`, sortedDays);
    return sortedDays;
  };

  const whichDailyIsNextOnActivationOrder = (): number | null => {
    // If unlockAll is enabled, all days are available
    if (unlockAllEnabled) {
      console.log(`[useDailyTopicActivation] whichDailyIsNextOnActivationOrder - unlockAll enabled, returning null`);
      return null; // All days are unlocked
    }
    
    // Find the first day that hasn't been activated yet
    for (let day = 1; day <= totalDays; day++) {
      if (!activatedDays.includes(day)) {
        console.log(`[useDailyTopicActivation] whichDailyIsNextOnActivationOrder - next day to activate: ${day}`);
        return day;
      }
    }
    console.log(`[useDailyTopicActivation] whichDailyIsNextOnActivationOrder - all days activated, returning null`);
    return null; // All days have been activated
  };

  const getTopicActivationDate = async (): Promise<Date | null> => {
    console.log(`[useDailyTopicActivation] getTopicActivationDate called`);
    
    try {
      const activeTopic = await getActiveTopic();
      console.log(`[useDailyTopicActivation] Active topic data:`, activeTopic);
      
      if (!activeTopic || activeTopic.topic_key !== topicKey || activeTopic.topic_index !== topicIndex) {
        console.log(`[useDailyTopicActivation] Topic not active or mismatch - expected: ${topicKey}/${topicIndex}, got: ${activeTopic?.topic_key}/${activeTopic?.topic_index}`);
        return null;
      }
      
      const activationDate = new Date(activeTopic.activated_at);
      console.log(`[useDailyTopicActivation] Topic activation date:`, activationDate);
      return activationDate;
    } catch (error) {
      console.error('[useDailyTopicActivation] Error getting topic activation date:', error);
      return null;
    }
  };

  const getLastDailyActivationDate = async (): Promise<Date | null> => {
    console.log(`[useDailyTopicActivation] getLastDailyActivationDate called for user: ${user?.id}, activatedDays: ${activatedDays.length}`);
    
    if (!user || activatedDays.length === 0) {
      console.log(`[useDailyTopicActivation] No user or no activated days, returning null`);
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
        console.error('[useDailyTopicActivation] Error getting last daily activation:', error);
        return null;
      }

      const lastActivationDate = data && data.length > 0 ? new Date(data[0].activated_at) : null;
      console.log(`[useDailyTopicActivation] Last daily activation date:`, lastActivationDate);
      return lastActivationDate;
    } catch (error) {
      console.error('[useDailyTopicActivation] Error getting last daily activation:', error);
      return null;
    }
  };

  const whenCanNextDailyBeActivated = async (): Promise<Date | null> => {
    console.log(`[useDailyTopicActivation] whenCanNextDailyBeActivated called, unlockAll: ${unlockAllEnabled}`);
    
    // If unlockAll is enabled, next daily can always be activated
    if (unlockAllEnabled) {
      console.log(`[useDailyTopicActivation] UnlockAll enabled, returning current time`);
      return new Date(); // Immediate activation
    }

    const nextDay = whichDailyIsNextOnActivationOrder();
    console.log(`[useDailyTopicActivation] Next day to activate: ${nextDay}`);
    
    if (nextDay === null) {
      console.log(`[useDailyTopicActivation] No next day (all activated), returning null`);
      return null; // All days activated
    }

    try {
      if (nextDay === 1) {
        console.log(`[useDailyTopicActivation] Next day is first day, checking topic activation date`);
        // First daily needs one day delay from topic activation
        const topicActivationDate = await getTopicActivationDate();
        if (!topicActivationDate) {
          console.log(`[useDailyTopicActivation] No topic activation date found`);
          return null;
        }
        const nextActivationDate = new Date(topicActivationDate);
        nextActivationDate.setDate(nextActivationDate.getDate() + 1);
        console.log(`[useDailyTopicActivation] First daily can be activated at:`, nextActivationDate);
        return nextActivationDate;
      } else {
        console.log(`[useDailyTopicActivation] Next day is ${nextDay}, checking last daily activation`);
        // Subsequent dailies need one day delay from last daily activation
        const lastDailyActivation = await getLastDailyActivationDate();
        if (!lastDailyActivation) {
          console.log(`[useDailyTopicActivation] No last daily activation found`);
          return null;
        }
        const nextActivationDate = new Date(lastDailyActivation);
        nextActivationDate.setDate(nextActivationDate.getDate() + 1);
        console.log(`[useDailyTopicActivation] Next daily can be activated at:`, nextActivationDate);
        return nextActivationDate;
      }
    } catch (error) {
      console.error('[useDailyTopicActivation] Error calculating when next daily can be activated:', error);
      return null;
    }
  };

  const canActivateDay = async (dayIndex: number): Promise<boolean> => {
    console.log(`[useDailyTopicActivation] canActivateDay called for day: ${dayIndex}, unlockAll: ${unlockAllEnabled}`);
    
    // If unlockAll is enabled, any day can be activated
    if (unlockAllEnabled) {
      const canActivate = !activatedDays.includes(dayIndex);
      console.log(`[useDailyTopicActivation] UnlockAll enabled, can activate: ${canActivate} (already activated: ${activatedDays.includes(dayIndex)})`);
      return canActivate; // Only prevent if already activated
    }

    if (activatedDays.includes(dayIndex)) {
      console.log(`[useDailyTopicActivation] Day ${dayIndex} already activated`);
      return false; // Already activated
    }

    const nextDay = whichDailyIsNextOnActivationOrder();
    if (nextDay !== dayIndex) {
      console.log(`[useDailyTopicActivation] Day ${dayIndex} not next in order (next: ${nextDay})`);
      return false; // Not the next day in order
    }

    const nextActivationDate = await whenCanNextDailyBeActivated();
    if (!nextActivationDate) {
      console.log(`[useDailyTopicActivation] No next activation date available`);
      return false;
    }

    const now = new Date();
    const canActivate = now >= nextActivationDate;
    console.log(`[useDailyTopicActivation] Current time: ${now}, activation time: ${nextActivationDate}, can activate: ${canActivate}`);
    return canActivate;
  };

  const getTimeUntilNextActivation = async (): Promise<number | null> => {
    console.log(`[useDailyTopicActivation] getTimeUntilNextActivation called, unlockAll: ${unlockAllEnabled}`);
    
    // If unlockAll is enabled, no waiting time
    if (unlockAllEnabled) {
      console.log(`[useDailyTopicActivation] UnlockAll enabled, returning 0 wait time`);
      return 0;
    }

    const nextActivationDate = await whenCanNextDailyBeActivated();
    if (!nextActivationDate) {
      console.log(`[useDailyTopicActivation] No next activation date, returning null`);
      return null;
    }

    const now = new Date();
    const timeDiff = nextActivationDate.getTime() - now.getTime();
    const waitTime = Math.max(0, timeDiff);
    console.log(`[useDailyTopicActivation] Time until next activation: ${waitTime}ms (${Math.floor(waitTime / 60000)} minutes)`);
    return waitTime;
  };

  useEffect(() => {
    console.log(`[useDailyTopicActivation] useEffect triggered - user: ${user?.id}, topic: ${topicKey}, index: ${topicIndex}`);
    fetchActivatedDays();
  }, [user, topicKey, topicIndex]);

  // Return nextDayToActivate and unlockAllEnabled that were missing
  const nextDayToActivate = whichDailyIsNextOnActivationOrder();

  console.log(`[useDailyTopicActivation] Hook returning - activatedDays: ${activatedDays.length}, nextDay: ${nextDayToActivate}, isLoading: ${isLoading}`);

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
