
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

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

  return (
    <div className="text-center mb-8">
      <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
      <h2 className="text-3xl font-display text-gray-800">{t('daily.title')}</h2>
      <p className="text-gray-600 mt-2">
        {t('daily.subtitle')} ({daysUnlocked}/{totalDays} days unlocked)
        {unlockAllEnabled && (
          <span className="block text-sm text-green-600 font-medium mt-1">
            🚀 All content unlocked (Dev Mode)
          </span>
        )}
      </p>
      {nextDayToActivate && !unlockAllEnabled && (
        <p className="text-sm text-golden-yellow mt-1">
          Next day to unlock: Day {nextDayToActivate}
        </p>
      )}
    </div>
  );
};

export default DailyAssignmentsHeader;
