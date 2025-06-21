
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import TextContent from '@/components/ui/TextContent';
import { getAssignment } from '@/data/assignments/dancing_with_without_control';

interface Day4ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day4Content: React.FC<Day4ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();
  const assignment = getAssignment('day4');

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingWithWithoutControl.daily.day4.content' as any)}
      </TextContent>
      
      {assignment && (
        <Assignment
          assignment={assignment}
          taskId="day-4-task"
          level={completedTasks['day-4-task'] || 0}
          onLevelChange={onTaskLevelChange}
          variant="sage"
          topicName={topicName}
          topicIndex={topicIndex}
        />
      )}
    </div>
  );
};

export default Day4Content;
