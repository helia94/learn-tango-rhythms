import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import { useUnlockAll } from '@/hooks/useFeatureFlag';
import DailyAssignmentsHeader from '@/components/ui/DailyAssignmentsHeader';
import DailyAccordion from '@/components/ui/DailyAccordion';
import { TOPIC_CONFIG } from '@/config/topics';

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
  const topic = TOPIC_CONFIG.DANCING_FAST_SLOW;
  const unlockAllEnabled = useUnlockAll();
  
  const { 
    activatedDays, 
    activateDay, 
    isLoading, 
    whichDailiesWereActivated,
    whichDailyIsNextOnActivationOrder,
    canActivateDay
  } = useDailyTopicActivation(topic.key, topic.index, topic.totalDays);

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
          totalDays={topic.totalDays}
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
        totalDays={topic.totalDays}
        nextDayToActivate={nextDayToActivate}
      />

      <DailyAccordion
        totalDays={topic.totalDays}
        activatedDays={whichDailiesWereActivated()}
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

export default FastAndSlowDaily1to7;
