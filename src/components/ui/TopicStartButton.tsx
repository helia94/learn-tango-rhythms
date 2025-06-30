
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { useTopicActivation } from '@/hooks/useTopicActivation';
import { trackTopicActivation } from '@/utils/googleAnalytics';
import { RefreshCw, AlertTriangle } from 'lucide-react';

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
  const [showRefreshHint, setShowRefreshHint] = useState(false);
  const hasInitialized = useRef(false);

  // Move async calls to useEffect to prevent render loops
  useEffect(() => {
    const checkTopicStatus = async () => {
      if (!user) {
        setIsActive(false);
        setDeadline(null);
        setShouldShowButton(true); // Show button for non-logged in users
        setShowRefreshHint(false);
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
          setShowRefreshHint(false); // Clear any refresh hints for active topics
        } else {
          setDeadline(null);
          
          // Check if user has any other active topic
          const activeTopic = await getActiveTopic();
          if (activeTopic && 
              (activeTopic.topic_key !== topicKey || activeTopic.topic_index !== topicIndex)) {
            // User has a different active topic, hide the button
            setShouldShowButton(false);
            setShowRefreshHint(false);
          } else {
            // No active topic or this is the active topic, show the button
            setShouldShowButton(true);
            setShowRefreshHint(false);
          }
        }
        
        hasInitialized.current = true;
      } catch (error) {
        console.error('Error checking topic status:', error);
        setIsActive(false);
        setDeadline(null);
        setShouldShowButton(true); // Show button on error as fallback
        // Show refresh hint if there's an error and user is logged in
        setShowRefreshHint(true);
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
        
        // Track topic activation
        trackTopicActivation(topicKey, topicIndex);
        
        // Reset and refresh status
        hasInitialized.current = false;
        setIsActive(true); // Optimistically set to true
        setShouldShowButton(true); // Show button since this topic is now active
        setShowRefreshHint(false); // Clear refresh hint
        
        // Refresh the deadline
        const newDeadline = await getTopicDeadline(topicKey, topicIndex);
        setDeadline(newDeadline);
      } catch (error) {
        console.error('Failed to activate topic:', error);
      }
    }
  };

  const handleRefresh = () => {
    window.location.reload();
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
    
    if (!isActive && shouldShowButton) {
      return t('common.startThisTopic');
    }
    
    return 'This topic is not currently active';
  };

  // Don't render the button if it shouldn't be shown (user has different active topic)
  if (!shouldShowButton && !showRefreshHint) {
    return (
      <div className="text-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-amber-800 font-medium">This topic is not currently active</p>
      </div>
    );
  }

  const isButtonDisabled = isCheckingStatus || isActivating;

  return (
    <div className="space-y-4">
      <Button
        onClick={handleTopicAction}
        variant="outline"
        disabled={isButtonDisabled}
        className={`bg-sandy-beige/80 hover:bg-sandy-beige border-warm-brown/30 text-warm-brown px-6 py-2 text-base font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-50 ${className || ''}`}
      >
        {getButtonText()}
      </Button>

      {/* Show refresh hint if there are issues loading topic status */}
      {showRefreshHint && user && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">Having trouble loading topic status?</span>
          </div>
          <p className="text-amber-700 text-sm">
            If you're seeing "unlock time not available" or other loading issues, try refreshing the page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-800"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Page
            </Button>
            <Button
              onClick={() => navigate('/report')}
              variant="outline"
              size="sm"
              className="bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Problem
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicStartButton;
