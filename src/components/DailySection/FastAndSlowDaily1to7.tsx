
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import { useUnlockAll } from '@/hooks/useFeatureFlag';
import DailyAssignmentsHeader from '@/components/ui/DailyAssignmentsHeader';
import DailyAccordion from '@/components/ui/DailyAccordion';

interface FastAndSlowDaily1to7Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const FastAndSlowDaily1to7: React.FC<FastAndSlowDaily1to7Props> = ({
  completedTasks,
  onTaskLevelChange
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const unlockAllEnabled = useUnlockAll();
  const totalDays = 7;
  
  const { 
    activatedDays, 
    activateDay, 
    isLoading, 
    whichDailiesWereActivated,
    whichDailyIsNextOnActivationOrder,
    canActivateDay
  } = useDailyTopicActivation('dancing-fast-slow', 0, totalDays);

  // Calculate days unlocked based on activated days
  const daysUnlocked = Math.max(...whichDailiesWereActivated(), 0);
  const nextDayToActivate = whichDailyIsNextOnActivationOrder();

  const handleDayActivation = async (dayNumber: number) => {
    if (!user) return;
    
    try {
      const canActivate = await canActivateDay(dayNumber);
      if (!canActivate) {
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
        <DailyAssignmentsHeader
          daysUnlocked={0}
          totalDays={totalDays}
        />
        <div className="text-center">
          <p className="text-gray-600 mt-2">{t('common.loading')}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <DailyAssignmentsHeader
        daysUnlocked={daysUnlocked}
        totalDays={totalDays}
        nextDayToActivate={nextDayToActivate}
      />

      <DailyAccordion
        totalDays={totalDays}
        activatedDays={whichDailiesWereActivated()}
        nextDayToActivate={nextDayToActivate}
        completedTasks={completedTasks}
        onTaskLevelChange={onTaskLevelChange}
        onDayActivation={handleDayActivation}
        topicName="dancing-fast-slow"
        topicIndex={0}
      />
    </div>
  );
};

export default FastAndSlowDaily1to7;
