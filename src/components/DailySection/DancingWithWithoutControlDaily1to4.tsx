
import React from 'react';
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
      topicKey="dancing-with-without-control"
      topicIndex={4}
      totalDays={4}
      completedTasks={completedTasks}
      onTaskLevelChange={onTaskLevelChange}
    />
  );
};

export default DancingWithWithoutControlDaily1to4;
