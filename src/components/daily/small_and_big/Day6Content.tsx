
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';

interface Day6ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName?: string;
  topicIndex?: number;
}

const Day6Content: React.FC<Day6ContentProps> = ({ 
  completedTasks, 
  onTaskLevelChange,
  topicName = 'dancing-small-big',
  topicIndex = 1
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('daily.day6.content')}
      </p>

      <Assignment
        assignment={{ content: 'daily.day6.task', task: 'daily.day6.task' }}
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
