
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import DailyAccordion from '@/components/ui/DailyAccordion';
import { getDayStatus } from '@/components/daily/DayStatus';

interface DancingWithWithoutControlDaily1to4Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const DancingWithWithoutControlDaily1to4: React.FC<DancingWithWithoutControlDaily1to4Props> = ({
  completedTasks,
  onTaskLevelChange
}) => {
  const { t } = useTranslation();
  const topicKey = 'dancing-with-without-control';
  const topicIndex = 4;
  const totalDays = 4;
  
  const { 
    activatedDays,
    nextDayToActivate,
    unlockAllEnabled,
    activateDay
  } = useDailyTopicActivation(topicKey, topicIndex, totalDays);

  return (
    <DailyAccordion
      totalDays={totalDays}
      activatedDays={activatedDays}
      nextDayToActivate={nextDayToActivate}
      completedTasks={completedTasks}
      onTaskLevelChange={onTaskLevelChange}
      onDayActivation={activateDay}
      topicName={topicKey}
      topicIndex={topicIndex}
    />
  );
};

export default DancingWithWithoutControlDaily1to4;
