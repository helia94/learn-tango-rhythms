
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';

interface Day2ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName?: string;
  topicIndex?: number;
}

const Day2Content: React.FC<Day2ContentProps> = ({ 
  completedTasks, 
  onTaskLevelChange,
  topicName = 'dancing-small-big',
  topicIndex = 1
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('daily.day2.content')}
      </p>

      <Assignment
        assignment={{ content: 'daily.day2.task', task: 'daily.day2.task' }}
        taskId="day-2-task"
        level={completedTasks['day-2-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day2Content;
