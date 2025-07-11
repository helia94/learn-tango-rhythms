
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import VideoGuideNotice from '@/components/ui/VideoGuideNotice';
import { getAssignment } from '@/data/assignments/dancing_high_low';
import TextContent from '@/components/ui/TextContent';

interface Day3ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day3Content: React.FC<Day3ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();
  const assignment = getAssignment('day3');

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingHighLow.daily.day3.content' as any)}
      </TextContent>

      <VideoGuideNotice className="mb-6" />
      
      <Assignment
        assignment={assignment}
        taskId="day-3-go-stop-signals"
        level={completedTasks['day-3-go-stop-signals'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day3Content;
