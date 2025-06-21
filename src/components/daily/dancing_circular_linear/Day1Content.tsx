
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
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
      <div className="text-gray-600 leading-relaxed">
        {t('exercises.dancingCircularLinear.daily.day1.content' as any)}
      </div>
      
      {assignment && (
        <Assignment
          assignment={assignment}
          completedTasks={completedTasks}
          onTaskLevelChange={onTaskLevelChange}
          keyPrefix="day-1"
          topicName={topicName}
          topicIndex={topicIndex}
        />
      )}
    </div>
  );
};

export default Day1Content;
