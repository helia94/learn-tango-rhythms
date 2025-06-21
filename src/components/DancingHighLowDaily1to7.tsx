
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import DailyAssignmentsHeader from '@/components/ui/DailyAssignmentsHeader';
import DailyAccordion from '@/components/ui/DailyAccordion';

interface DancingHighLowDaily1to7Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const DancingHighLowDaily1to7: React.FC<DancingHighLowDaily1to7Props> = ({
  completedTasks,
  onTaskLevelChange,
}) => {
  const { t } = useTranslation();
  const topicKey = 'dancing-high-low';
  const topicIndex = 2;
  const totalDays = 5;
  
  const {
    activatedDays,
    whichDailiesWereActivated,
    whichDailyIsNextOnActivationOrder,
  } = useDailyTopicActivation(topicKey, topicIndex, totalDays);

  // Calculate data for header
  const activatedDaysList = whichDailiesWereActivated();
  const daysUnlocked = Math.max(...activatedDaysList, 0);
  const nextDayToActivate = whichDailyIsNextOnActivationOrder();

  return (
    <div className="space-y-6">
      <DailyAssignmentsHeader
        daysUnlocked={daysUnlocked}
        totalDays={totalDays}
        nextDayToActivate={nextDayToActivate}
      />

      <DailyAccordion
        totalDays={totalDays}
        activatedDays={activatedDaysList}
        nextDayToActivate={nextDayToActivate}
        completedTasks={completedTasks}
        onTaskLevelChange={onTaskLevelChange}
        topicName={topicKey}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default DancingHighLowDaily1to7;
