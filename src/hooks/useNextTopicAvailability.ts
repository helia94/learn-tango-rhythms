
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface NextTopicAvailability {
  topicIndex: number;
  availableDate: Date;
}

export const useNextTopicAvailability = () => {
  const [nextTopicAvailability, setNextTopicAvailability] = useState<NextTopicAvailability | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasInitialized = useRef(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNextTopicAvailability = async () => {
      // Only fetch once per page reload
      if (hasInitialized.current || !user) {
        setIsLoading(false);
        return;
      }

      hasInitialized.current = true;
      setIsLoading(true);

      try {
        // Get all topic activations for the user, ordered by topic_index and activation date
        const { data, error } = await supabase
          .from('topic_activations')
          .select('topic_index, activated_at')
          .eq('user_id', user.id)
          .order('topic_index', { ascending: true })
          .order('activated_at', { ascending: true });

        if (error) {
          console.error('Error fetching topic activations:', error);
          setNextTopicAvailability(null);
          return;
        }

        if (!data || data.length === 0) {
          // No topics activated yet, next topic (1) will be available 7 days after topic 0 is activated
          setNextTopicAvailability({ topicIndex: 1, availableDate: new Date() });
          return;
        }

        // Group activations by topic_index and get the first activation for each
        const firstActivations: Record<number, Date> = {};
        data.forEach(activation => {
          if (!firstActivations[activation.topic_index]) {
            firstActivations[activation.topic_index] = new Date(activation.activated_at);
          }
        });

        // Find the next topic that will be unlocked
        for (let topicIndex = 1; topicIndex <= 10; topicIndex++) {
          const previousTopicIndex = topicIndex - 1;
          const previousTopicFirstActivation = firstActivations[previousTopicIndex];

          if (previousTopicFirstActivation) {
            const availableDate = new Date(previousTopicFirstActivation);
            availableDate.setDate(availableDate.getDate() + 7);

            // If this topic is not yet available, it's our next topic
            if (new Date() < availableDate) {
              setNextTopicAvailability({ topicIndex, availableDate });
              return;
            }
          } else {
            // Previous topic was never activated, so this topic is not available yet
            break;
          }
        }

        // If we get here, all topics might be unlocked or there's no clear next topic
        setNextTopicAvailability(null);
      } catch (error) {
        console.error('Error calculating next topic availability:', error);
        setNextTopicAvailability(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNextTopicAvailability();
  }, [user]);

  const getNextTopicAvailability = (topicIndex: number): Date | null => {
    if (!nextTopicAvailability || nextTopicAvailability.topicIndex !== topicIndex) {
      return null;
    }
    return nextTopicAvailability.availableDate;
  };

  return {
    getNextTopicAvailability,
    isLoading
  };
};
