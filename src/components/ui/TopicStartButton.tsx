
import React, { useEffect, useState } from 'react';
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
  const { activateTopic, isActivating, isTopicActive, getTopicDeadline } = useTopicActivation();
  const [isActive, setIsActive] = useState(false);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // Check if topic is active when component mounts or user changes
  useEffect(() => {
    const checkTopicStatus = async () => {
      if (!user) {
        setIsActive(false);
        setDeadline(null);
        return;
      }

      setIsCheckingStatus(true);
      try {
        const active = await isTopicActive(topicKey, topicIndex);
        setIsActive(active);
        
        if (active) {
          const topicDeadline = await getTopicDeadline(topicKey, topicIndex);
          setDeadline(topicDeadline);
        } else {
          setDeadline(null);
        }
      } catch (error) {
        console.error('Error checking topic status:', error);
        setIsActive(false);
        setDeadline(null);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    checkTopicStatus();
  }, [user, topicKey, topicIndex, isTopicActive, getTopicDeadline]);

  const handleTopicAction = async () => {
    if (!user) {
      navigate('/auth');
    } else if (!isActive) {
      try {
        await activateTopic(topicKey, topicIndex);
        // Refresh the status after activation
        const active = await isTopicActive(topicKey, topicIndex);
        setIsActive(active);
        if (active) {
          const topicDeadline = await getTopicDeadline(topicKey, topicIndex);
          setDeadline(topicDeadline);
        }
      } catch (error) {
        console.error('Failed to activate topic:', error);
      }
    }
  };

  const formatDeadline = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getButtonText = () => {
    if (isCheckingStatus || isActivating) {
      return t('common.loading') || 'Loading...';
    }
    
    if (!user) {
      return t('common.loginToStart');
    }
    
    if (isActive && deadline) {
      return `Topic Active Until ${formatDeadline(deadline)}`;
    }
    
    return t('common.startThisTopic');
  };

  const isButtonDisabled = isCheckingStatus || isActivating || isActive;

  return (
    <Button
      onClick={handleTopicAction}
      variant="outline"
      disabled={isButtonDisabled}
      className={`bg-sandy-beige/80 hover:bg-sandy-beige border-warm-brown/30 text-warm-brown px-6 py-2 text-base font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-50 ${className || ''}`}
    >
      {getButtonText()}
    </Button>
  );
};

export default TopicStartButton;
