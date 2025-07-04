
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTopicVisibility } from '@/contexts/TopicVisibilityContext';

interface DailyAssignmentsHeaderProps {
  daysUnlocked: number;
  totalDays: number;
  nextDayToActivate?: number;
  unlockAllEnabled?: boolean;
}

const DailyAssignmentsHeader: React.FC<DailyAssignmentsHeaderProps> = ({
  daysUnlocked,
  totalDays,
  nextDayToActivate,
  unlockAllEnabled = false
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isAdminUnlockActive } = useTopicVisibility();

  const isUserLoggedIn = !!user;

  const handleSignInClick = () => {
    navigate('/auth');
  };

  // Show admin unlock status if active
  const showAdminMode = isAdminUnlockActive || unlockAllEnabled;

  return (
    <div className="text-center mb-8">
      <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
      <div className="flex items-center justify-center gap-4 mb-2">
        <h2 className="text-3xl font-display text-gray-800">{t('daily.title')}</h2>
        {!isUserLoggedIn && (
          <Button
            onClick={handleSignInClick}
            size="sm"
            variant="outline"
            className="bg-golden-yellow/20 hover:bg-golden-yellow/30 border-golden-yellow/30 text-warm-brown font-medium"
          >
            {t('common.signInToUnlockDaily')}
          </Button>
        )}
      </div>
      <p className="text-gray-600 mt-2">
        {t('daily.subtitle')} ({daysUnlocked}/{totalDays} days unlocked)
        {showAdminMode && (
          <span className="block text-sm text-green-600 font-medium mt-1">
            🚀 All content unlocked {isAdminUnlockActive ? '(Admin Mode)' : '(Dev Mode)'}
          </span>
        )}
      </p>
      {nextDayToActivate && !showAdminMode && isUserLoggedIn && (
        <p className="text-sm text-golden-yellow mt-1">
          Next day to unlock: Day {nextDayToActivate}
        </p>
      )}
    </div>
  );
};

export default DailyAssignmentsHeader;
