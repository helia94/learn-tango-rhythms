
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import VideoGuideNotice from '@/components/ui/VideoGuideNotice';
import { getAssignment } from '@/data/assignments/dancing_high_low';
import TextContent from '@/components/ui/TextContent';

interface Day5ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day5Content: React.FC<Day5ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();
  const assignment = getAssignment('day5');

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingHighLow.daily.day5.content' as any)}
      </TextContent>

      <VideoGuideNotice className="mb-6" />
      
      <Assignment
        assignment={assignment}
        taskId="day-5-extreme-height"
        level={completedTasks['day-5-extreme-height'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day5Content;
