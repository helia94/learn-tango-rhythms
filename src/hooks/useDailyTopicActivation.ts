
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useDailyTopicActivation = (topicKey: string, topicIndex: number) => {
  const [activatedDays, setActivatedDays] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

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

  useEffect(() => {
    fetchActivatedDays();
  }, [user, topicKey, topicIndex]);

  return {
    activatedDays,
    activateDay,
    isLoading,
    refetch: fetchActivatedDays
  };
};
