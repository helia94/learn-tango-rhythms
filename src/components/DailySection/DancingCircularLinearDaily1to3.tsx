
import React from 'react';
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
      topicKey="dancing-circular-linear"
      topicIndex={3}
      totalDays={3}
      completedTasks={completedTasks}
      onTaskLevelChange={onTaskLevelChange}
    />
  );
};

export default DancingCircularLinearDaily1to3;
