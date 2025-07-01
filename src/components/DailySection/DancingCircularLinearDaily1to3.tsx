
import React from 'react';
import { TOPIC_CONFIG } from '@/config/topics';
import DailyExerciseWrapper from '@/components/ui/DailyExerciseWrapper';

interface DancingCircularLinearDaily1to3Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const DancingCircularLinearDaily1to3: React.FC<DancingCircularLinearDaily1to3Props> = ({
  completedTasks,
  onTaskLevelChange
}) => {
  return (
    <DailyExerciseWrapper
      topicKey={TOPIC_CONFIG.DANCING_CIRCULAR_LINEAR.key}
      completedTasks={completedTasks}
      onTaskLevelChange={onTaskLevelChange}
    />
  );
};

export default DancingCircularLinearDaily1to3;
