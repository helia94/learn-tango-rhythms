
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Assignment } from '@/data/assignments';
import LevelSelector from './LevelSelector';
import InfoModal from './InfoModal';

interface AssignmentListProps {
  assignments: Assignment[];
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
            <div className="flex items-center">
              <LevelSelector
                level={completedTasks[taskId] || 0}
                onLevelChange={(level) => onTaskLevelChange(taskId, level)}
              />
              <InfoModal />
            </div>
            <label className="text-gray-700 text-lg cursor-pointer leading-relaxed flex-1">
              {t(assignment.content)}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default AssignmentList;
