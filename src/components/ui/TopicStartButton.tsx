
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useTopicActivation } from '@/hooks/useTopicActivation';

const TopicStartButton: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isTopicActive, activateTopic } = useTopicActivation();
  
  const [isActivated, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  const checkStatus = useCallback(async () => {
    if (!user || hasInitialized) return;
    
    try {
      const status = await isTopicActive('dancing-fast-slow', 0);
      setIsActivated(status);
      setHasInitialized(true);
    } catch (error) {
      console.error('Error checking topic status:', error);
      setIsActivated(false);
      setHasInitialized(true);
    } finally {
      setIsLoading(false);
    }
  }, [user, isTopicActive, hasInitialized]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const handleActivation = async () => {
    if (!user || isActivated) return;
    
    setIsLoading(true);
    try {
      await activateTopic('dancing-fast-slow', 0);
      setIsActivated(true);
    } catch (error) {
      console.error('Error activating topic:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Button 
        size="lg"
        className="bg-golden-yellow hover:bg-golden-yellow/90 text-warm-brown font-semibold text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
        onClick={() => {/* Navigate to auth if needed */}}
      >
        {t('exercises.dancingFastSlow.startThisTopic')}
      </Button>
    );
  }

  if (isLoading) {
    return (
      <Button 
        size="lg"
        disabled
        className="bg-golden-yellow/50 text-warm-brown font-semibold text-lg px-8 py-3 rounded-full"
      >
        {t('common.loading')}...
      </Button>
    );
  }

  if (isActivated) {
    return (
      <Button 
        size="lg"
        disabled
        className="bg-sage-green text-white font-semibold text-lg px-8 py-3 rounded-full"
      >
        ✓ {t('exercises.dancingFastSlow.topicActivated')}
      </Button>
    );
  }

  return (
    <Button 
      size="lg"
      onClick={handleActivation}
      className="bg-golden-yellow hover:bg-golden-yellow/90 text-warm-brown font-semibold text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
    >
      {t('exercises.dancingFastSlow.startThisTopic')}
    </Button>
  );
};

export default TopicStartButton;
