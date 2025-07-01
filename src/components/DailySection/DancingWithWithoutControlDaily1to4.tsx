
import React from 'react';
import { TOPIC_CONFIG } from '@/config/topics';
import DailyExerciseWrapper from '@/components/ui/DailyExerciseWrapper';

interface DancingWithWithoutControlDaily1to4Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const DancingWithWithoutControlDaily1to4: React.FC<DancingWithWithoutControlDaily1to4Props> = ({
  completedTasks,
  onTaskLevelChange
}) => {
  return (
    <DailyExerciseWrapper
      topicKey={TOPIC_CONFIG.DANCING_WITH_WITHOUT_CONTROL.key}
      completedTasks={completedTasks}
      onTaskLevelChange={onTaskLevelChange}
    />
  );
};

export default DancingWithWithoutControlDaily1to4;
