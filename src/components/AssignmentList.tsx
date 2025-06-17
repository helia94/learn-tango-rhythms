
import React from 'react';
import { Assignment as AssignmentType } from '@/data/assignments';
import Assignment from './Assignment';

interface AssignmentListProps {
  assignments: AssignmentType[];
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  keyPrefix?: string;
  className?: string;
}

const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  completedTasks,
  onTaskLevelChange,
  keyPrefix = 'assignment',
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {assignments.map((assignment, index) => {
        const taskId = `${keyPrefix}-${index}`;
        
        return (
          <Assignment
            key={taskId}
            assignment={assignment}
            taskId={taskId}
            level={completedTasks[taskId] || 0}
            onLevelChange={onTaskLevelChange}
            variant="golden"
          />
        );
      })}
    </div>
  );
};

export default AssignmentList;
