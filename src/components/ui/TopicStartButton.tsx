
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
      console.log('TopicStartButton: Checking topic status...', { user: !!user, topicKey, topicIndex });
      
      if (!user) {
        console.log('TopicStartButton: No user, setting inactive');
        setIsActive(false);
        setDeadline(null);
        return;
      }

      setIsCheckingStatus(true);
      try {
        console.log('TopicStartButton: Calling isTopicActive...');
        const active = await isTopicActive(topicKey, topicIndex);
        console.log('TopicStartButton: Topic active status:', active);
        setIsActive(active);
        
        if (active) {
          console.log('TopicStartButton: Topic is active, getting deadline...');
          const topicDeadline = await getTopicDeadline(topicKey, topicIndex);
          console.log('TopicStartButton: Topic deadline:', topicDeadline);
          setDeadline(topicDeadline);
        } else {
          console.log('TopicStartButton: Topic is not active');
          setDeadline(null);
        }
      } catch (error) {
        console.error('TopicStartButton: Error checking topic status:', error);
        setIsActive(false);
        setDeadline(null);
      } finally {
        setIsCheckingStatus(false);
        console.log('TopicStartButton: Finished checking status');
      }
    };

    checkTopicStatus();
  }, [user, topicKey, topicIndex, isTopicActive, getTopicDeadline]);

  const handleTopicAction = async () => {
    console.log('TopicStartButton: Handle topic action clicked', { user: !!user, isActive });
    
    if (!user) {
      console.log('TopicStartButton: No user, navigating to auth');
      navigate('/auth');
    } else if (!isActive) {
      try {
        console.log('TopicStartButton: Activating topic...');
        await activateTopic(topicKey, topicIndex);
        console.log('TopicStartButton: Topic activated, refreshing status...');
        
        // Refresh the status after activation
        const active = await isTopicActive(topicKey, topicIndex);
        console.log('TopicStartButton: New active status after activation:', active);
        setIsActive(active);
        
        if (active) {
          const topicDeadline = await getTopicDeadline(topicKey, topicIndex);
          console.log('TopicStartButton: New deadline after activation:', topicDeadline);
          setDeadline(topicDeadline);
        }
      } catch (error) {
        console.error('TopicStartButton: Failed to activate topic:', error);
      }
    } else {
      console.log('TopicStartButton: Topic already active, no action needed');
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
    console.log('TopicStartButton: Getting button text...', { 
      isCheckingStatus, 
      isActivating, 
      user: !!user, 
      isActive, 
      deadline: !!deadline 
    });
    
    if (isCheckingStatus || isActivating) {
      const loadingText = t('common.loading') || 'Loading...';
      console.log('TopicStartButton: Returning loading text:', loadingText);
      return loadingText;
    }
    
    if (!user) {
      const loginText = t('common.loginToStart');
      console.log('TopicStartButton: Returning login text:', loginText);
      return loginText;
    }
    
    if (isActive && deadline) {
      const activeText = `Topic Active Until ${formatDeadline(deadline)}`;
      console.log('TopicStartButton: Returning active text:', activeText);
      return activeText;
    }
    
    const startText = t('common.startThisTopic');
    console.log('TopicStartButton: Returning start text:', startText);
    return startText;
  };

  const isButtonDisabled = isCheckingStatus || isActivating || isActive;
  
  console.log('TopicStartButton: Render state:', {
    isCheckingStatus,
    isActivating,
    isActive,
    deadline: !!deadline,
    isButtonDisabled,
    buttonText: getButtonText()
  });

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
