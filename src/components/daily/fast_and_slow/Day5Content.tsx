
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import TipsSection from '@/components/TipsSection';
import Assignment from '@/components/Assignment';
import TextContent from '@/components/ui/TextContent';

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
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingFastSlow.daily.day5.content')}
      </TextContent>
      
      <TipsSection 
        title={t('exercises.dancingFastSlow.tips.extremeSpeed')}
        tips={[
          t('exercises.dancingFastSlow.tips.extremeSpeedTip1'),
          t('exercises.dancingFastSlow.tips.extremeSpeedTip2')
        ]}
      />

      <Assignment
        assignment={{ content: 'exercises.dancingFastSlow.daily.day5.task' }}
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
