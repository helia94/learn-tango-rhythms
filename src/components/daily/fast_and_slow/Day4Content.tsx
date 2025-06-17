
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import TipsSection from '@/components/TipsSection';
import Assignment from '@/components/Assignment';

interface Day4ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName?: string;
  topicIndex?: number;
}

const Day4Content: React.FC<Day4ContentProps> = ({ 
  completedTasks, 
  onTaskLevelChange,
  topicName = 'dancing-fast-slow',
  topicIndex = 0
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('daily.day4.content')}
      </p>
      
      <p className="text-gray-600 text-lg leading-relaxed mb-6">
        {t('daily.day4.description')}
      </p>

      <TipsSection 
        title={t('tips.extremeSlowness')}
        tips={[
          t('tips.extremeSlownessTip1'),
          t('tips.extremeSlownessTip2'),
          t('tips.extremeSlownessTip3'),
          t('tips.extremeSlownessTip4')
        ]}
      />

      <Assignment
        assignment={{ content: 'daily.day4.task', task: 'daily.day4.task' }}
        taskId="day-4-task"
        level={completedTasks['day-4-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day4Content;
