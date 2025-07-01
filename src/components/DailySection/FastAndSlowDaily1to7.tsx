
import React from 'react';
import { TOPIC_CONFIG } from '@/config/topics';
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
      topicKey={TOPIC_CONFIG.DANCING_FAST_SLOW.key}
      completedTasks={completedTasks}
      onTaskLevelChange={onTaskLevelChange}
    />
  );
};

export default FastAndSlowDaily1to7;
