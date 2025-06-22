
import React from 'react';
import DailyExerciseWrapper from '@/components/ui/DailyExerciseWrapper';

interface FastAndSlowDaily1to7Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const FastAndSlowDaily1to7: React.FC<FastAndSlowDaily1to7Props> = ({
  completedTasks,
  onTaskLevelChange
}) => {
  return (
    <DailyExerciseWrapper
      topicKey="dancing-fast-slow"
      topicIndex={0}
      totalDays={7}
      completedTasks={completedTasks}
      onTaskLevelChange={onTaskLevelChange}
    />
  );
};

export default FastAndSlowDaily1to7;
