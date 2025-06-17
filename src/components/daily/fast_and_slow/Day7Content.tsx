
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import TipsSection from '@/components/TipsSection';
import Assignment from '@/components/Assignment';

interface Day7ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const Day7Content: React.FC<Day7ContentProps> = ({ completedTasks, onTaskLevelChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('daily.day7.content')}
      </p>
      
      <TipsSection 
        title={t('tips.ochoCortadoChallengeTitle')}
        tips={[
          t('tips.ochoCortadoChallengeTip1'),
          t('tips.ochoCortadoChallengeTip2'),
          t('tips.ochoCortadoChallengeTip3'),
          t('tips.ochoCortadoChallengeTip4'),
          t('tips.ochoCortadoChallengeTip5')
        ]}
      />

      <Assignment
        assignment={{ content: 'daily.day7.task', task: 'daily.day7.task' }}
        taskId="day-7-task"
        level={completedTasks['day-7-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
      />
    </div>
  );
};

export default Day7Content;
