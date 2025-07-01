import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import DailyAssignmentsHeader from '@/components/ui/DailyAssignmentsHeader';
import DailyAccordion from '@/components/ui/DailyAccordion';
import { TOPIC_CONFIG } from '@/config/topics';

interface DancingHighLowDaily1to7Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const DancingHighLowDaily1to7: React.FC<DancingHighLowDaily1to7Props> = ({
  completedTasks,
  onTaskLevelChange,
}) => {
  const { t } = useTranslation();
  const topic = TOPIC_CONFIG.DANCING_HIGH_LOW;
  
  const {
    activatedDays,
    whichDailiesWereActivated,
    whichDailyIsNextOnActivationOrder,
  } = useDailyTopicActivation(topic.key, topic.index, topic.totalDays);

  // Calculate data for header
  const activatedDaysList = whichDailiesWereActivated();
  const daysUnlocked = Math.max(...activatedDaysList, 0);
  const nextDayToActivate = whichDailyIsNextOnActivationOrder();

  return (
    <div className="space-y-6">
      <DailyAssignmentsHeader
        daysUnlocked={daysUnlocked}
        totalDays={topic.totalDays}
        nextDayToActivate={nextDayToActivate}
      />

      <DailyAccordion
        totalDays={topic.totalDays}
        activatedDays={activatedDaysList}
        nextDayToActivate={nextDayToActivate}
        completedTasks={completedTasks}
        onTaskLevelChange={onTaskLevelChange}
        topicName={topic.key}
        topicIndex={topic.index}
      />
    </div>
  );
};

export default DancingHighLowDaily1to7;
