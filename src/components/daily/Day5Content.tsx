
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import TipsSection from '@/components/TipsSection';
import Assignment from '@/components/Assignment';

interface Day5ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const Day5Content: React.FC<Day5ContentProps> = ({ completedTasks, onTaskLevelChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('daily.day5.content')}
      </p>
      
      <TipsSection 
        title={t('tips.extremeSpeed')}
        tips={[
          t('tips.extremeSpeedTip1'),
          t('tips.extremeSpeedTip2')
        ]}
      />

      <Assignment
        assignment={{ content: 'daily.day5.task', task: 'daily.day5.task' }}
        taskId="day-5-task"
        level={completedTasks['day-5-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
      />
    </div>
  );
};

export default Day5Content;
