
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/useTranslation';
import { Assignment } from '@/data/assignments';

interface AssignmentListProps {
  assignments: Assignment[];
  completedTasks: Record<string, boolean>;
  onTaskComplete: (taskId: string) => void;
  keyPrefix?: string;
  className?: string;
}

const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  completedTasks,
  onTaskComplete,
  keyPrefix = 'assignment',
  className = ''
}) => {
  const { t } = useTranslation();

  return (
    <div className={`space-y-6 ${className}`}>
      {assignments.map((assignment, index) => {
        const taskId = `${keyPrefix}-${index}`;
        
        return (
          <div 
            key={taskId} 
            className="flex items-start gap-4 bg-golden-yellow/20 backdrop-blur-sm rounded-2xl p-6 border border-golden-yellow/30"
          >
            <Checkbox 
              id={taskId}
              checked={completedTasks[taskId] || false}
              onCheckedChange={() => onTaskComplete(taskId)}
            />
            <label 
              htmlFor={taskId} 
              className="text-gray-700 text-lg cursor-pointer leading-relaxed"
            >
              {t(assignment.content)}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default AssignmentList;
