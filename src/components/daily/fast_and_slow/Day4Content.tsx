
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
        {t('exercises.dancingFastSlow.daily.day4.content')}
      </p>
      
      <p className="text-gray-600 text-lg leading-relaxed mb-6">
        {t('exercises.dancingFastSlow.daily.day4.description')}
      </p>

      <TipsSection 
        title={t('exercises.dancingFastSlow.tips.extremeSlowness')}
        tips={[
          t('exercises.dancingFastSlow.tips.extremeSlownessTip1'),
          t('exercises.dancingFastSlow.tips.extremeSlownessTip2'),
          t('exercises.dancingFastSlow.tips.extremeSlownessTip3'),
          t('exercises.dancingFastSlow.tips.extremeSlownessTip4')
        ]}
      />

      <Assignment
        assignment={{ content: 'exercises.dancingFastSlow.daily.day4.task' }}
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
