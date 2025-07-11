
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import VideoGuideNotice from '@/components/ui/VideoGuideNotice';
import TextContent from '@/components/ui/TextContent';

interface Day4ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day4Content: React.FC<Day4ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingSmallBig.daily.day4.content' as any)}
      </TextContent>

      <VideoGuideNotice className="mb-6" />
      
      <Assignment
        assignment={{ 
          content: 'exercises.dancingSmallBig.daily.day4.task' as any
        }}
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
