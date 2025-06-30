
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import TipsSection from '@/components/TipsSection';
import Assignment from '@/components/Assignment';
import VideoGuideNotice from '@/components/ui/VideoGuideNotice';
import TextContent from '@/components/ui/TextContent';

interface Day6ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName?: string;
  topicIndex?: number;
}

const Day6Content: React.FC<Day6ContentProps> = ({ 
  completedTasks, 
  onTaskLevelChange,
  topicName = 'dancing-fast-slow',
  topicIndex = 0
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingFastSlow.daily.day6.content')}
      </TextContent>
      
      <VideoGuideNotice className="mb-6" />
      
      <TipsSection 
        title={t('exercises.dancingFastSlow.tips.backOchoChallengeTitle')}
        tips={[
          t('exercises.dancingFastSlow.tips.backOchoChallengeTip1'),
          t('exercises.dancingFastSlow.tips.backOchoChallengeTip2'),
          t('exercises.dancingFastSlow.tips.backOchoChallengeTip3'),
          t('exercises.dancingFastSlow.tips.backOchoChallengeTip4')
        ]}
      />

      <Assignment
        assignment={{ content: 'exercises.dancingFastSlow.daily.day6.task' }}
        taskId="day-6-task"
        level={completedTasks['day-6-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day6Content;
