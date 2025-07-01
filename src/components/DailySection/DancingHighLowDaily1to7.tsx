
import React from 'react';
import { TOPIC_CONFIG } from '@/config/topics';
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
      topicKey={TOPIC_CONFIG.DANCING_HIGH_LOW.key}
      completedTasks={completedTasks}
      onTaskLevelChange={onTaskLevelChange}
    />
  );
};

export default DancingHighLowDaily1to7;
