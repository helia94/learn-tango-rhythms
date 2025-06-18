
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';

interface Day7ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day7Content: React.FC<Day7ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('daily.day7.content' as any)}
      </p>
      
      <Assignment
        assignment={{ 
          content: 'daily.day7.task' as any, 
          task: 'daily.day7.task' as any 
        }}
        taskId="day-7-task"
        level={completedTasks['day-7-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day7Content;
