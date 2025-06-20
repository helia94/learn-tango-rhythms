
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import TipsSection from '@/components/TipsSection';
import Assignment from '@/components/Assignment';

interface Day7ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName?: string;
  topicIndex?: number;
}

const Day7Content: React.FC<Day7ContentProps> = ({ 
  completedTasks, 
  onTaskLevelChange,
  topicName = 'dancing-fast-slow',
  topicIndex = 0
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('exercises.dancingFastSlow.daily.day7.content')}
      </p>
      
      <TipsSection 
        title={t('exercises.dancingFastSlow.tips.ochoCortadoChallengeTitle')}
        tips={[
          t('exercises.dancingFastSlow.tips.ochoCortadoChallengeTip1'),
          t('exercises.dancingFastSlow.tips.ochoCortadoChallengeTip2'),
          t('exercises.dancingFastSlow.tips.ochoCortadoChallengeTip3'),
          t('exercises.dancingFastSlow.tips.ochoCortadoChallengeTip4'),
          t('exercises.dancingFastSlow.tips.ochoCortadoChallengeTip5')
        ]}
      />

      <Assignment
        assignment={{ content: 'exercises.dancingFastSlow.daily.day7.task' }}
        taskId="day-7-task"
        level={completedTasks['day-7-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day7Content;
