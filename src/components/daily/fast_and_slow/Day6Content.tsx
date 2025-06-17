
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import TipsSection from '@/components/TipsSection';
import Assignment from '@/components/Assignment';

interface Day6ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const Day6Content: React.FC<Day6ContentProps> = ({ completedTasks, onTaskLevelChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('daily.day6.content')}
      </p>
      
      <TipsSection 
        title={t('tips.backOchoChallengeTitle')}
        tips={[
          t('tips.backOchoChallengeTip1'),
          t('tips.backOchoChallengeTip2'),
          t('tips.backOchoChallengeTip3'),
          t('tips.backOchoChallengeTip4')
        ]}
      />

      <Assignment
        assignment={{ content: 'daily.day6.task', task: 'daily.day6.task' }}
        taskId="day-6-task"
        level={completedTasks['day-6-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
      />
    </div>
  );
};

export default Day6Content;
