
import React from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import { Assignment as AssignmentType } from '@/data/assignments';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from './Assignment';
import TextContent from './ui/TextContent';

interface AssignmentMetadata {
  isLocked: boolean;
  dayNumber: number | null;
  taskIdPrefix: string;
}

interface AssignmentListProps {
  assignments: AssignmentType[];
  assignmentMetadata?: AssignmentMetadata[];
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  keyPrefix?: string;
  className?: string;
}

const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  assignmentMetadata = [],
  completedTasks,
  onTaskLevelChange,
  keyPrefix = 'assignment',
  className = ''
}) => {
  const { t } = useTranslation();

  return (
    <div className={`space-y-6 ${className}`}>
      {assignments.map((assignment, index) => {
        const metadata = assignmentMetadata[index];
        const taskId = metadata ? 
          (metadata.dayNumber ? `${metadata.taskIdPrefix}-task` : metadata.taskIdPrefix) :
          `${keyPrefix}-${index}`;
        
        const isCompleted = completedTasks[taskId] > 0;

        // Handle locked assignments
        if (metadata?.isLocked) {
          return (
            <div 
              key={taskId}
              className="bg-warm-brown/10 backdrop-blur-sm rounded-2xl border border-cream/20 p-6 opacity-60"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <h3 className="text-xl font-display text-gray-700">
                  {metadata.dayNumber ? `Day ${metadata.dayNumber}` : t(assignment.content)}
                  <span className="text-sm text-gray-400 font-medium ml-2">
                    {t('daily.locked')}
                  </span>
                </h3>
              </div>
            </div>
          );
        }

        // Handle unlocked assignments
        return (
          <div key={taskId} className="space-y-4">
            {metadata?.dayNumber && (
              <div className="flex items-center gap-3 mb-2">
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-sage-green flex-shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex-shrink-0" />
                )}
                <h3 className="text-xl font-display text-gray-700">
                  Day {metadata.dayNumber}
                </h3>
              </div>
            )}
            
            {metadata?.dayNumber && (
              <TextContent variant="body" className="mb-4">
                {t(assignment.content)}
              </TextContent>
            )}
            
            <Assignment
              assignment={assignment}
              taskId={taskId}
              level={completedTasks[taskId] || 0}
              onLevelChange={onTaskLevelChange}
              variant={metadata?.dayNumber ? "sage" : "golden"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AssignmentList;
