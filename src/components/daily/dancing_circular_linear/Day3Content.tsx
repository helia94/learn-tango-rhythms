
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import TextContent from '@/components/ui/TextContent';
import { getAssignment } from '@/data/assignments/dancing_circular_linear';

interface Day3ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day3Content: React.FC<Day3ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();
  const assignment = getAssignment('day3');

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingCircularLinear.daily.day3.content' as any)}
      </TextContent>
      
      {assignment && (
        <Assignment
          assignment={assignment}
          taskId="day-3-task"
          level={completedTasks['day-3-task'] || 0}
          onLevelChange={onTaskLevelChange}
          variant="sage"
          topicName={topicName}
          topicIndex={topicIndex}
        />
      )}
    </div>
  );
};

export default Day3Content;
