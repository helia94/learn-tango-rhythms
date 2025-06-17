
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useTopicActivation = () => {
  const [isActivating, setIsActivating] = useState(false);
  const { user } = useAuth();

  const activateTopic = async (topicKey: string, topicIndex: number) => {
    if (!user) {
      throw new Error('User must be logged in to activate topic');
    }

    setIsActivating(true);
    
    try {
      const { error } = await supabase
        .from('topic_activations')
        .insert({
          user_id: user.id,
          topic_key: topicKey,
          topic_index: topicIndex
        });

      if (error) {
        throw error;
      }

      console.log(`Topic ${topicKey} activated successfully`);
    } catch (error) {
      console.error('Error activating topic:', error);
      throw error;
    } finally {
      setIsActivating(false);
    }
  };

  const isTopicActive = async (topicKey: string, topicIndex: number): Promise<boolean> => {
    if (!user) {
      return false;
    }

    try {
      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data, error } = await supabase
        .from('topic_activations')
        .select('activated_at')
        .eq('user_id', user.id)
        .eq('topic_key', topicKey)
        .eq('topic_index', topicIndex)
        .gte('activated_at', sevenDaysAgo.toISOString())
        .order('activated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error checking topic activation:', error);
        return false;
      }

      // Topic is active if there's at least one activation within the last 7 days
      return data && data.length > 0;
    } catch (error) {
      console.error('Error checking topic activation:', error);
      return false;
    }
  };

  const hasActiveTopic = async (): Promise<boolean> => {
    if (!user) {
      return false;
    }

    try {
      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data, error } = await supabase
        .from('topic_activations')
        .select('id')
        .eq('user_id', user.id)
        .gte('activated_at', sevenDaysAgo.toISOString())
        .limit(1);

      if (error) {
        console.error('Error checking for active topics:', error);
        return false;
      }

      return data && data.length > 0;
    } catch (error) {
      console.error('Error checking for active topics:', error);
      return false;
    }
  };

  const getActiveTopic = async (): Promise<{ topic_key: string; topic_index: number; activated_at: string } | null> => {
    if (!user) {
      return null;
    }

    try {
      // Calculate the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data, error } = await supabase
        .from('topic_activations')
        .select('topic_key, topic_index, activated_at')
        .eq('user_id', user.id)
        .gte('activated_at', sevenDaysAgo.toISOString())
        .order('activated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error getting active topic:', error);
        return null;
      }

      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error('Error getting active topic:', error);
      return null;
    }
  };

  return {
    activateTopic,
    isTopicActive,
    hasActiveTopic,
    getActiveTopic,
    isActivating
  };
};
