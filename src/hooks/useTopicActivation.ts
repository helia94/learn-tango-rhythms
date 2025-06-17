
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

  return {
    activateTopic,
    isActivating
  };
};
