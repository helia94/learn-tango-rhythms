
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

interface TopicStartButtonProps {
  className?: string;
}

const TopicStartButton: React.FC<TopicStartButtonProps> = ({ className }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleTopicAction = () => {
    if (!user) {
      navigate('/auth');
    } else {
      // Do nothing for now as requested
      console.log('Start this topic clicked - no action implemented yet');
    }
  };

  return (
    <Button
      onClick={handleTopicAction}
      variant="outline"
      className={`bg-sandy-beige/80 hover:bg-sandy-beige border-warm-brown/30 text-warm-brown px-6 py-2 text-base font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${className || ''}`}
    >
      {user ? t('common.startThisTopic') : t('common.loginToStart')}
    </Button>
  );
};

export default TopicStartButton;
