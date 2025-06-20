
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';

interface Day1ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day1Content: React.FC<Day1ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();

  console.log('Day1Content (small_and_big) - Component rendered with props:', {
    topicName,
    topicIndex
  });

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('exercises.dancingSmallBig.daily.day1.content' as any)}
      </p>
      
      <Assignment
        assignment={{ 
          content: 'exercises.dancingSmallBig.daily.day1.task' as any
        }}
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
