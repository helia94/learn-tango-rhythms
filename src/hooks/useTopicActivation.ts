
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useTopicActivation = () => {
  const [isActivating, setIsActivating] = useState(false);
  const { user } = useAuth();

  // Helper function to get the 7-day cutoff date
  const getSevenDaysAgo = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return sevenDaysAgo.toISOString();
  };

  const activateTopic = async (topicKey: string, topicIndex: number) => {
    if (!user) {
      throw new Error('User must be logged in to activate topic');
    }

    setIsActivating(true);
    
    try {
      // First check if there's already an active topic
      const existingActiveTopic = await hasActiveTopic();
      if (existingActiveTopic) {
        throw new Error('Another topic is already active. Only one topic can be activated at a time.');
      }

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
      console.log(`isTopicActive: No user logged in, returning false for topic ${topicKey}`);
      return false;
    }

    try {
      const sevenDaysAgoISO = getSevenDaysAgo();
      console.log(`isTopicActive: Checking topic ${topicKey} (${topicIndex}) for activations since ${sevenDaysAgoISO}`);

      const { data, error } = await supabase
        .from('topic_activations')
        .select('activated_at')
        .eq('user_id', user.id)
        .eq('topic_key', topicKey)
        .eq('topic_index', topicIndex)
        .gte('activated_at', sevenDaysAgoISO)
        .order('activated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error checking topic activation:', error);
        return false;
      }

      console.log(`isTopicActive: Query result for topic ${topicKey}:`, data);

      // Topic is active if there's at least one activation within the last 7 days
      const isActive = data && data.length > 0;
      console.log(`isTopicActive: Topic ${topicKey} is ${isActive ? 'ACTIVE' : 'NOT ACTIVE'}`);
      
      return isActive;
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
      const sevenDaysAgoISO = getSevenDaysAgo();

      const { data, error } = await supabase
        .from('topic_activations')
        .select('id')
        .eq('user_id', user.id)
        .gte('activated_at', sevenDaysAgoISO)
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
      const sevenDaysAgoISO = getSevenDaysAgo();

      const { data, error } = await supabase
        .from('topic_activations')
        .select('topic_key, topic_index, activated_at')
        .eq('user_id', user.id)
        .gte('activated_at', sevenDaysAgoISO)
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

  const getTopicDeadline = async (topicKey: string, topicIndex: number): Promise<Date | null> => {
    if (!user) {
      return null;
    }

    try {
      // First check if the topic is activated within the last 7 days
      const sevenDaysAgoISO = getSevenDaysAgo();

      const { data, error } = await supabase
        .from('topic_activations')
        .select('activated_at')
        .eq('user_id', user.id)
        .eq('topic_key', topicKey)
        .eq('topic_index', topicIndex)
        .gte('activated_at', sevenDaysAgoISO)
        .order('activated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error getting topic deadline:', error);
        return null;
      }

      if (!data || data.length === 0) {
        return null; // Topic is not active within the last 7 days
      }

      // Calculate deadline: 7 days from the most recent activation date
      const activationDate = new Date(data[0].activated_at);
      const deadline = new Date(activationDate);
      deadline.setDate(deadline.getDate() + 7);

      return deadline;
    } catch (error) {
      console.error('Error calculating topic deadline:', error);
      return null;
    }
  };

  const topicIsUnlocked = async (topicIndex: number): Promise<boolean> => {
    // Topic 0 (first topic) is always unlocked - FIXED: changed from topicIndex === 1 to topicIndex === 0
    if (topicIndex === 0) {
      return true;
    }

    // Topics 1-3 are unlocked if user is not logged in - FIXED: changed from topicIndex >= 2 && topicIndex <= 4 to topicIndex >= 1 && topicIndex <= 3
    if (!user && topicIndex >= 1 && topicIndex <= 3) {
      return true;
    }

    // If user is not logged in and topic is beyond 3, it's locked - FIXED: changed from beyond 4 to beyond 3
    if (!user) {
      return false;
    }

    try {
      // For topic n, check if topic (n-1) has ever been activated for longer than 7 days
      const previousTopicIndex = topicIndex - 1;

      // Get the first activation of the previous topic
      const { data, error } = await supabase
        .from('topic_activations')
        .select('activated_at')
        .eq('user_id', user.id)
        .eq('topic_index', previousTopicIndex)
        .order('activated_at', { ascending: true })
        .limit(1);

      if (error) {
        console.error('Error checking previous topic activation:', error);
        return false;
      }

      if (!data || data.length === 0) {
        return false;
      }

      // Check if the first activation was more than 7 days ago
      const firstActivationDate = new Date(data[0].activated_at);
      const sevenDaysAfterActivation = new Date(firstActivationDate);
      sevenDaysAfterActivation.setDate(sevenDaysAfterActivation.getDate() + 7);

      // Topic is unlocked if more than 7 days have passed since the first activation of the previous topic
      return new Date() > sevenDaysAfterActivation;
    } catch (error) {
      console.error('Error checking topic unlock status:', error);
      return false;
    }
  };

  const getAllUnlockedTopics = async (): Promise<number[]> => {
    const unlockedTopics: number[] = [];
    
    // Topic 0 (first topic) is always unlocked - FIXED: changed from pushing 1 to pushing 0
    unlockedTopics.push(0);

    // Topics 1-3 are unlocked if user is not logged in - FIXED: changed from pushing 2,3,4 to pushing 1,2,3
    if (!user) {
      unlockedTopics.push(1, 2, 3);
      return unlockedTopics;
    }

    try {
      // Get all topic activations for the user, ordered by topic_index and activation date
      const { data, error } = await supabase
        .from('topic_activations')
        .select('topic_index, activated_at')
        .eq('user_id', user.id)
        .order('topic_index', { ascending: true })
        .order('activated_at', { ascending: true });

      if (error) {
        console.error('Error getting topic activations:', error);
        return unlockedTopics;
      }

      if (!data || data.length === 0) {
        return unlockedTopics;
      }

      // Group activations by topic_index and get the first activation for each
      const firstActivations: Record<number, Date> = {};
      data.forEach(activation => {
        if (!firstActivations[activation.topic_index]) {
          firstActivations[activation.topic_index] = new Date(activation.activated_at);
        }
      });

      // Check each topic from 1 onwards - FIXED: changed from starting at 2 to starting at 1
      for (let topicIndex = 1; topicIndex <= 50; topicIndex++) { // Assuming max 50 topics
        const previousTopicIndex = topicIndex - 1;
        const previousTopicFirstActivation = firstActivations[previousTopicIndex];

        if (previousTopicFirstActivation) {
          const sevenDaysAfterActivation = new Date(previousTopicFirstActivation);
          sevenDaysAfterActivation.setDate(sevenDaysAfterActivation.getDate() + 7);

          if (new Date() > sevenDaysAfterActivation) {
            unlockedTopics.push(topicIndex);
          } else {
            // If this topic is not unlocked, no subsequent topics will be unlocked
            break;
          }
        } else {
          // If previous topic was never activated, this and all subsequent topics are locked
          break;
        }
      }

      return unlockedTopics;
    } catch (error) {
      console.error('Error getting all unlocked topics:', error);
      return unlockedTopics;
    }
  };

  return {
    activateTopic,
    isTopicActive,
    hasActiveTopic,
    getActiveTopic,
    getTopicDeadline,
    topicIsUnlocked,
    getAllUnlockedTopics,
    isActivating
  };
};
