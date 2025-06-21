
import React, { useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import { useUnlockAll } from '@/hooks/useFeatureFlag';
import DayItem from '@/components/daily/DayItem';
import DailyAssignmentsHeader from '@/components/ui/DailyAssignmentsHeader';

interface SmallAndBigDaily1to7Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const SmallAndBigDaily1to7: React.FC<SmallAndBigDaily1to7Props> = ({
  completedTasks,
  onTaskLevelChange
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const unlockAllEnabled = useUnlockAll();
  
  console.log('SmallAndBigDaily1to7 - Component mounted for dancing-small-big topic');
  
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
  const totalDays = 7;

  console.log('SmallAndBigDaily1to7 - Topic info:', {
    topicName: 'dancing-small-big',
    topicIndex: 1,
    daysUnlocked,
    activatedDaysArray
  });

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
        <DailyAssignmentsHeader
          daysUnlocked={0}
          totalDays={totalDays}
          unlockAllEnabled={unlockAllEnabled}
        />
        <div className="text-center">
          <p className="text-gray-600 mt-2">{t('common.loading' as any)}...</p>
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
        unlockAllEnabled={unlockAllEnabled}
      />

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
          
          console.log(`SmallAndBigDaily1to7 - Day ${dayNumber} props:`, {
            topicName: 'dancing-small-big',
            topicIndex: 1,
            status,
            isCompleted
          });
          
          return (
            <DayItem
              key={dayNumber}
              dayNumber={dayNumber}
              status={status}
              isCompleted={isCompleted}
              completedTasks={completedTasks}
              onTaskLevelChange={onTaskLevelChange}
              onDayActivation={user && (isNextToActivate || unlockAllEnabled) ? () => handleDayActivation(dayNumber) : undefined}
              topicName="dancing-small-big"
              topicIndex={1}
            />
          );
        })}
      </Accordion>
    </div>
  );
};

export default SmallAndBigDaily1to7;
