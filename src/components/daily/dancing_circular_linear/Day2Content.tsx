
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import { getAssignment } from '@/data/assignments/dancing_circular_linear';

interface Day2ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day2Content: React.FC<Day2ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();
  const assignment = getAssignment('day2');

  return (
    <div className="space-y-6">
      <div className="text-gray-600 leading-relaxed">
        {t('exercises.dancingCircularLinear.daily.day2.content' as any)}
      </div>
      
      {assignment && (
        <Assignment
          assignment={assignment}
          taskId="day-2-task"
          level={completedTasks['day-2-task'] || 0}
          onLevelChange={onTaskLevelChange}
          variant="sage"
          topicName={topicName}
          topicIndex={topicIndex}
        />
      )}
    </div>
  );
};

export default Day2Content;
