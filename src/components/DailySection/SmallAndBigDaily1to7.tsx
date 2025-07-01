
import React from 'react';
import { TOPIC_CONFIG } from '@/config/topics';
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
      topicKey={TOPIC_CONFIG.DANCING_SMALL_BIG.key}
      completedTasks={completedTasks}
      onTaskLevelChange={onTaskLevelChange}
    />
  );
};

export default SmallAndBigDaily1to7;
