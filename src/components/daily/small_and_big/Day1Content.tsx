
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';

interface Day1ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName?: string;
  topicIndex?: number;
}

const Day1Content: React.FC<Day1ContentProps> = ({ 
  completedTasks, 
  onTaskLevelChange,
  topicName = 'dancing-small-big',
  topicIndex = 1
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('daily.day1.content')}
      </p>

      <Assignment
        assignment={{ content: 'daily.day1.task', task: 'daily.day1.task' }}
        taskId="day-1-task"
        level={completedTasks['day-1-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day1Content;
