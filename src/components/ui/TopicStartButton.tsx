
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { useTopicActivation } from '@/hooks/useTopicActivation';

interface TopicStartButtonProps {
  className?: string;
  topicKey?: string;
  topicIndex?: number;
}

const TopicStartButton: React.FC<TopicStartButtonProps> = ({ 
  className, 
  topicKey = 'dancing-fast-slow',
  topicIndex = 0 
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { activateTopic, isActivating } = useTopicActivation();

  const handleTopicAction = async () => {
    if (!user) {
      navigate('/auth');
    } else {
      try {
        await activateTopic(topicKey, topicIndex);
      } catch (error) {
        console.error('Failed to activate topic:', error);
      }
    }
  };

  return (
    <Button
      onClick={handleTopicAction}
      variant="outline"
      disabled={isActivating}
      className={`bg-sandy-beige/80 hover:bg-sandy-beige border-warm-brown/30 text-warm-brown px-6 py-2 text-base font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-50 ${className || ''}`}
    >
      {isActivating 
        ? t('common.loading') || 'Loading...'
        : user 
          ? t('common.startThisTopic') 
          : t('common.loginToStart')
      }
    </Button>
  );
};

export default TopicStartButton;
