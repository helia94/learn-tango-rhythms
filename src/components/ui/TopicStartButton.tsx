
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TopicStartButtonProps {
  /** Index of the topic (for ordering) */
  topicIndex: number;
  /** Unique key for the topic */
  topicKey: string;
  /** Optional additional CSS classes */
  className?: string;
}

const TopicStartButton: React.FC<TopicStartButtonProps> = ({
  topicIndex,
  topicKey,
  className = ''
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isActivating, setIsActivating] = useState(false);

  const handleStartTopic = async () => {
    if (!user) return;

    setIsActivating(true);
    
    try {
      const { error } = await supabase
        .from('topic_activations')
        .insert({
          user_id: user.id,
          topic_index: topicIndex,
          topic_key: topicKey
        });

      if (error) {
        // If error is about duplicate, that's fine - topic already activated
        if (error.code === '23505') {
          toast.success(t('topic.alreadyActivated'));
        } else {
          console.error('Error activating topic:', error);
          toast.error(t('topic.activationError'));
        }
      } else {
        toast.success(t('topic.activationSuccess'));
      }
    } catch (error) {
      console.error('Error activating topic:', error);
      toast.error(t('topic.activationError'));
    } finally {
      setIsActivating(false);
    }
  };

  if (!user) {
    return (
      <Link to="/auth">
        <Button 
          size="lg"
          className={`bg-terracotta hover:bg-burnt-orange text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 ${className}`}
        >
          {t('topic.loginToStart')}
        </Button>
      </Link>
    );
  }

  return (
    <Button 
      onClick={handleStartTopic}
      disabled={isActivating}
      size="lg"
      className={`bg-deep-teal hover:bg-sage-green text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none ${className}`}
    >
      {isActivating ? t('topic.activating') : t('topic.startTopic')}
    </Button>
  );
};

export default TopicStartButton;
