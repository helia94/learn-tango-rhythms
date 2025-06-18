
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import { useUnlockAll } from '@/hooks/useFeatureFlag';
import DayItem from '@/components/daily/DayItem';
import { getDayStatus } from '@/components/daily/DayStatus';

interface SmallAndBigDaily1to7Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const SmallAndBigDaily1to7: React.FC<SmallAndBigDaily1to7Props> = ({
  completedTasks,
  onTaskLevelChange
}) => {
  const { t } = useTranslation('small-and-big');
  const { user } = useAuth();
  const unlockAllEnabled = useUnlockAll();
  
  const { 
    activatedDays, 
    activateDay, 
    isLoading, 
    whichDailiesWereActivated,
    whichDailyIsNextOnActivationOrder,
    canActivateDay
  } = useDailyTopicActivation('dancing-small-big', 1);

  // Calculate days unlocked based on activated days or feature flag
  const activatedDaysArray = whichDailiesWereActivated();
  const daysUnlocked = unlockAllEnabled ? 7 : Math.max(...activatedDaysArray, 0);
  const nextDayToActivate = whichDailyIsNextOnActivationOrder();

  const handleDayActivation = async (dayNumber: number) => {
    if (!user) return;
    
    try {
      const canActivate = await canActivateDay(dayNumber);
      if (!canActivate && !unlockAllEnabled) {
        console.log(`Cannot activate day ${dayNumber} yet`);
        return;
      }
      
      await activateDay(dayNumber);
    } catch (error) {
      console.error('Failed to activate day:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="mb-16">
        <div className="text-center mb-8">
          <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
          <h2 className="text-3xl font-display text-gray-800">{t('daily.title' as any)}</h2>
          <p className="text-gray-600 mt-2">{t('common.loading' as any)}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
        <h2 className="text-3xl font-display text-gray-800">{t('daily.title' as any)}</h2>
        <p className="text-gray-600 mt-2">
          {t('daily.subtitle' as any)} ({daysUnlocked}/7 days unlocked)
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

      <Accordion type="single" collapsible className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7].map(dayNumber => {
          const isActivated = activatedDaysArray.includes(dayNumber);
          const isNextToActivate = nextDayToActivate === dayNumber;
          
          // When unlockAll is enabled, treat all days as unlocked
          let status;
          if (unlockAllEnabled) {
            status = 'unlocked';
          } else {
            status = isActivated ? 'unlocked' : isNextToActivate ? 'tomorrow' : 'locked';
          }
          
          const isCompleted = completedTasks[`day-${dayNumber}-task`] > 0;
          
          return (
            <DayItem
              key={dayNumber}
              dayNumber={dayNumber}
              status={status}
              isCompleted={isCompleted}
              completedTasks={completedTasks}
              onTaskLevelChange={onTaskLevelChange}
              onDayActivation={user && (isNextToActivate || unlockAllEnabled) ? () => handleDayActivation(dayNumber) : undefined}
            />
          );
        })}
      </Accordion>
    </div>
  );
};

export default SmallAndBigDaily1to7;
