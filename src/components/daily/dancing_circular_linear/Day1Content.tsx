
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import TextContent from '@/components/ui/TextContent';
import VideoGuideNotice from '@/components/ui/VideoGuideNotice';
import { getAssignment } from '@/data/assignments/dancing_circular_linear';

interface Day1ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day1Content: React.FC<Day1ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();
  const assignment = getAssignment('day1');

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingCircularLinear.daily.day1.content' as any)}
      </TextContent>

      <VideoGuideNotice className="mb-6" />
      
      {assignment && (
        <Assignment
          assignment={assignment}
          taskId="day-1-task"
          level={completedTasks['day-1-task'] || 0}
          onLevelChange={onTaskLevelChange}
          variant="sage"
          topicName={topicName}
          topicIndex={topicIndex}
        />
      )}
    </div>
  );
};

export default Day1Content;
