import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import { useUnlockAll } from '@/hooks/useFeatureFlag';
import DailyAssignmentsHeader from '@/components/ui/DailyAssignmentsHeader';
import DailyAccordion from '@/components/ui/DailyAccordion';
import { TOPIC_CONFIG } from '@/config/topics';

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
  const topic = TOPIC_CONFIG.DANCING_SMALL_BIG;
  const unlockAllEnabled = useUnlockAll();
  const totalDays = topic.totalDays;
    
  const { 
    activatedDays, 
    activateDay, 
    isLoading, 
    whichDailiesWereActivated,
    whichDailyIsNextOnActivationOrder,
    canActivateDay
  } = useDailyTopicActivation(topic.key, topic.index, topic.totalDays);

  // Calculate days unlocked based on activated days or feature flag
  const activatedDaysArray = whichDailiesWereActivated();
  const daysUnlocked = unlockAllEnabled ? topic.totalDays : Math.max(...activatedDaysArray, 0);
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
        totalDays={topic.totalDays}
        nextDayToActivate={nextDayToActivate}
        unlockAllEnabled={unlockAllEnabled}
      />

      <DailyAccordion
        totalDays={topic.totalDays}
        activatedDays={activatedDaysArray}
        nextDayToActivate={nextDayToActivate}
        completedTasks={completedTasks}
        onTaskLevelChange={onTaskLevelChange}
        onDayActivation={handleDayActivation}
        topicName={topic.key}
        topicIndex={topic.index}
      />
    </div>
  );
};

export default SmallAndBigDaily1to7;
