
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import TextContent from '@/components/ui/TextContent';

interface Day6ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day6Content: React.FC<Day6ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingSmallBig.daily.day6.content' as any)}
      </TextContent>
      
      <Assignment
        assignment={{ 
          content: 'exercises.dancingSmallBig.daily.day6.task' as any
        }}
        taskId="day-6-task"
        level={completedTasks['day-6-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day6Content;
