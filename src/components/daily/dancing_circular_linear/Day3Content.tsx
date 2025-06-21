
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import { getAssignment } from '@/data/assignments/dancing_circular_linear';

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

  return (
    <div className="space-y-6">
      <div className="text-gray-600 leading-relaxed">
        {t('exercises.dancingCircularLinear.daily.day3.content' as any)}
      </div>
      
      {assignment && (
        <Assignment
          assignment={assignment}
          completedTasks={completedTasks}
          onTaskLevelChange={onTaskLevelChange}
          keyPrefix="day-3"
          topicName={topicName}
          topicIndex={topicIndex}
        />
      )}
    </div>
  );
};

export default Day3Content;
