
import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  const { activateTopic, isActivating, isTopicActive, getTopicDeadline, getActiveTopic } = useTopicActivation();
  const [isActive, setIsActive] = useState(false);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(true);
  const hasInitialized = useRef(false);

  // Move async calls to useEffect to prevent render loops
  useEffect(() => {
    const checkTopicStatus = async () => {
      if (!user) {
        setIsActive(false);
        setDeadline(null);
        setShouldShowButton(true); // Show button for non-logged in users
        return;
      }

      if (hasInitialized.current) {
        return; // Already checked, don't check again
      }

      setIsCheckingStatus(true);
      
      try {
        // Check if this specific topic is active
        const active = await isTopicActive(topicKey, topicIndex);
        setIsActive(active);
        
        if (active) {
          const topicDeadline = await getTopicDeadline(topicKey, topicIndex);
          setDeadline(topicDeadline);
          setShouldShowButton(true); // Show button if this topic is active
        } else {
          setDeadline(null);
          
          // Check if user has any other active topic
          const activeTopic = await getActiveTopic();
          if (activeTopic && 
              (activeTopic.topic_key !== topicKey || activeTopic.topic_index !== topicIndex)) {
            // User has a different active topic, hide the button
            setShouldShowButton(false);
          } else {
            // No active topic or this is the active topic, show the button
            setShouldShowButton(true);
          }
        }
        
        hasInitialized.current = true;
      } catch (error) {
        console.error('Error checking topic status:', error);
        setIsActive(false);
        setDeadline(null);
        setShouldShowButton(true); // Show button on error as fallback
      } finally {
        setIsCheckingStatus(false);
      }
    };

    checkTopicStatus();
  }, [user, topicKey, topicIndex, isTopicActive, getTopicDeadline, getActiveTopic]);

  const handleTopicAction = async () => {
    if (!user) {
      navigate('/auth');
    } else {
      try {
        await activateTopic(topicKey, topicIndex);
        
        // Reset and refresh status
        hasInitialized.current = false;
        setIsActive(true); // Optimistically set to true
        setShouldShowButton(true); // Show button since this topic is now active
        
        // Refresh the deadline
        const newDeadline = await getTopicDeadline(topicKey, topicIndex);
        setDeadline(newDeadline);
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
      return `Active Until ${formatDeadline(deadline)}`;
    }
    
    return t('common.startThisTopic');
  };

  // Don't render the button if it shouldn't be shown
  if (!shouldShowButton) {
    return null;
  }

  const isButtonDisabled = isCheckingStatus || isActivating;

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
