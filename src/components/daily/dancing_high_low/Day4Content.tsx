
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import VideoGuideNotice from '@/components/ui/VideoGuideNotice';
import { getAssignment } from '@/data/assignments/dancing_high_low';
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
  const assignment = getAssignment('day4');

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingHighLow.daily.day4.content' as any)}
      </TextContent>

      <VideoGuideNotice className="mb-6" />
      
      <Assignment
        assignment={assignment}
        taskId="day-4-lower-turns"
        level={completedTasks['day-4-lower-turns'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day4Content;
