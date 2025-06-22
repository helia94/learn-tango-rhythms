
import React from 'react';
import DailyExerciseWrapper from '@/components/ui/DailyExerciseWrapper';

interface SmallAndBigDaily1to7Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const SmallAndBigDaily1to7: React.FC<SmallAndBigDaily1to7Props> = ({
  completedTasks,
  onTaskLevelChange
}) => {
  return (
    <DailyExerciseWrapper
      topicKey="dancing-small-big"
      topicIndex={1}
      totalDays={7}
      completedTasks={completedTasks}
      onTaskLevelChange={onTaskLevelChange}
    />
  );
};

export default SmallAndBigDaily1to7;
