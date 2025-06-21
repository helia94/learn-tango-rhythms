
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTopicVisibility } from '@/contexts/TopicVisibilityContext';
import { supabase } from '@/integrations/supabase/client';

// Hook to automatically check and unlock next topics when current ones expire
export const useTopicProgressCheck = () => {
  const { user } = useAuth();
  const { unlockNextTopic, refreshVisibility } = useTopicVisibility();

  useEffect(() => {
    if (!user) return;

    const checkExpiredTopics = async () => {
      try {
        const now = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Find topics that expired exactly 7 days ago (or more)
        const { data: expiredActivations, error } = await supabase
          .from('topic_activations')
          .select('topic_index, activated_at')
          .eq('user_id', user.id)
          .lte('activated_at', sevenDaysAgo.toISOString());

        if (error) {
          console.error('Error checking expired topics:', error);
          return;
        }

        // For each expired topic, unlock the next one
        for (const activation of expiredActivations || []) {
          await unlockNextTopic(activation.topic_index);
        }

        if (expiredActivations && expiredActivations.length > 0) {
          await refreshVisibility();
        }
      } catch (error) {
        console.error('Error in topic progress check:', error);
      }
    };

    // Check immediately
    checkExpiredTopics();

    // Set up interval to check every hour
    const interval = setInterval(checkExpiredTopics, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user, unlockNextTopic, refreshVisibility]);
};
