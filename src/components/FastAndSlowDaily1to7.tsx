
import React, { useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import DayItem from '@/components/daily/DayItem';
import DailyAssignmentsHeader from '@/components/ui/DailyAssignmentsHeader';

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
  
  const { 
    activatedDays, 
    activateDay, 
    isLoading, 
    whichDailiesWereActivated,
    whichDailyIsNextOnActivationOrder,
    canActivateDay
  } = useDailyTopicActivation('dancing-fast-slow', 0);

  // Calculate days unlocked based on activated days
  const daysUnlocked = Math.max(...whichDailiesWereActivated(), 0);
  const nextDayToActivate = whichDailyIsNextOnActivationOrder();
  const totalDays = 7;

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

      <Accordion type="single" collapsible className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7].map(dayNumber => {
          const isActivated = whichDailiesWereActivated().includes(dayNumber);
          const isNextToActivate = nextDayToActivate === dayNumber;
          const status = isActivated ? 'unlocked' : isNextToActivate ? 'tomorrow' : 'locked';
          const isCompleted = completedTasks[`day-${dayNumber}-task`] > 0;
          
          return (
            <DayItem
              key={dayNumber}
              dayNumber={dayNumber}
              status={status}
              isCompleted={isCompleted}
              completedTasks={completedTasks}
              onTaskLevelChange={onTaskLevelChange}
              onDayActivation={user && isNextToActivate ? () => handleDayActivation(dayNumber) : undefined}
            />
          );
        })}
      </Accordion>
    </div>
  );
};

export default FastAndSlowDaily1to7;
