
import React from 'react';
import { Lock } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { DayStatus } from './DayStatus';

interface LockedDayContentProps {
  status: DayStatus;
}

const LockedDayContent: React.FC<LockedDayContentProps> = ({ status }) => {
  const { t } = useTranslation();

  if (status === 'tomorrow') {
    return (
      <div className="flex items-center justify-center p-8 text-gray-600">
        <div className="text-center">
          <Lock className="w-8 h-8 mx-auto mb-3 text-golden-yellow" />
          <p className="text-lg">{t('daily.unlockTomorrow')}</p>
        </div>
      </div>
    );
  }

  if (status === 'locked') {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <div className="text-center">
          <Lock className="w-8 h-8 mx-auto mb-3" />
          <p className="text-lg">{t('daily.locked')}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default LockedDayContent;
