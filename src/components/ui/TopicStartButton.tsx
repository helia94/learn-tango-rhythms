
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { useTopicActivation } from '@/hooks/useTopicActivation';
import { useTopicVisibility } from '@/contexts/TopicVisibilityContext';

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
  const { activateTopic, isActivating, isTopicActive, getTopicDeadline, hasActiveTopic } = useTopicActivation();
  const { activeTopic, refreshVisibility } = useTopicVisibility();
  const [isActive, setIsActive] = useState(false);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [hasOtherActiveTopic, setHasOtherActiveTopic] = useState(false);
  const hasInitialized = useRef(false);

  // Move async calls to useEffect to prevent render loops
  useEffect(() => {
    const checkTopicStatus = async () => {
      if (!user) {
        setIsActive(false);
        setDeadline(null);
        setHasOtherActiveTopic(false);
        return;
      }

      if (hasInitialized.current) {
        return; // Already checked, don't check again
      }

      setIsCheckingStatus(true);
      
      try {
        const active = await isTopicActive(topicKey, topicIndex);
        setIsActive(active);
        
        if (active) {
          const topicDeadline = await getTopicDeadline(topicKey, topicIndex);
          setDeadline(topicDeadline);
          setHasOtherActiveTopic(false);
        } else {
          setDeadline(null);
          // Check if user has any other active topic
          const hasOtherActive = await hasActiveTopic();
          setHasOtherActiveTopic(hasOtherActive);
        }
        
        hasInitialized.current = true;
      } catch (error) {
        console.error('Error checking topic status:', error);
        setIsActive(false);
        setDeadline(null);
        setHasOtherActiveTopic(false);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    checkTopicStatus();
  }, [user, topicKey, topicIndex, isTopicActive, getTopicDeadline, hasActiveTopic]);

  const handleTopicAction = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // If user has another active topic, don't allow activation
    if (hasOtherActiveTopic && !isActive) {
      return;
    }

    try {
      await activateTopic(topicKey, topicIndex);
      
      // Reset and refresh status
      hasInitialized.current = false;
      setIsActive(true); // Optimistically set to true
      
      // Refresh the deadline and visibility context
      const newDeadline = await getTopicDeadline(topicKey, topicIndex);
      setDeadline(newDeadline);
      
      // Refresh the visibility context to hide other topics
      await refreshVisibility();
    } catch (error) {
      console.error('Failed to activate topic:', error);
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

    if (hasOtherActiveTopic && !isActive) {
      return 'Another topic is active';
    }
    
    if (isActive && deadline) {
      return `Active Until ${formatDeadline(deadline)}`;
    }
    
    return t('common.startThisTopic');
  };

  const isButtonDisabled = isCheckingStatus || isActivating || (hasOtherActiveTopic && !isActive);

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
