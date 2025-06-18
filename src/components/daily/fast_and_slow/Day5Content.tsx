
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import TipsSection from '@/components/TipsSection';
import Assignment from '@/components/Assignment';

interface Day5ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName?: string;
  topicIndex?: number;
}

const Day5Content: React.FC<Day5ContentProps> = ({ 
  completedTasks, 
  onTaskLevelChange,
  topicName = 'dancing-fast-slow',
  topicIndex = 0
}) => {
  const { t } = useTranslation('fast-and-slow');

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('daily.day5.content' as any)}
      </p>
      
      <TipsSection 
        title={t('tips.extremeSpeed' as any)}
        tips={[
          t('tips.extremeSpeedTip1' as any),
          t('tips.extremeSpeedTip2' as any)
        ]}
      />

      <Assignment
        assignment={{ content: 'daily.day5.task' as any, task: 'daily.day5.task' as any }}
        taskId="day-5-task"
        level={completedTasks['day-5-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day5Content;
