
import React from 'react';
import DailyExerciseWrapper from '@/components/ui/DailyExerciseWrapper';

interface DancingHighLowDaily1to7Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const DancingHighLowDaily1to7: React.FC<DancingHighLowDaily1to7Props> = ({
  completedTasks,
  onTaskLevelChange
}) => {
  return (
    <DailyExerciseWrapper
      topicKey="dancing-high-low"
      topicIndex={2}
      totalDays={5}
      completedTasks={completedTasks}
      onTaskLevelChange={onTaskLevelChange}
    />
  );
};

export default DancingHighLowDaily1to7;
