
import React from 'react';
import { Lock } from 'lucide-react';
import { Assignment as AssignmentType } from '@/data/assignments/fastAndSlow';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from './Assignment';

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
  topicName?: string;
  topicIndex?: number;
}

const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  assignmentMetadata = [],
  completedTasks,
  onTaskLevelChange,
  keyPrefix = 'assignment',
  className = '',
  topicName = 'dancing-fast-slow',
  topicIndex = 0
}) => {
  const { t } = useTranslation();

  console.log('🎯 AssignmentList - completedTasks:', completedTasks);
  console.log('🎯 AssignmentList - assignments count:', assignments.length);
  console.log('🎯 AssignmentList - assignmentMetadata:', assignmentMetadata);

  return (
    <div className={`space-y-6 ${className}`}>
      {assignments.map((assignment, index) => {
        const metadata = assignmentMetadata[index];
        const taskId = metadata ? 
          (metadata.dayNumber ? `${metadata.taskIdPrefix}-task` : metadata.taskIdPrefix) :
          `${keyPrefix}-${index}`;

        console.log(`📝 Assignment ${index}:`, {
          taskId,
          metadata,
          level: completedTasks[taskId] || 0,
          assignment: assignment.content
        });

        // Handle locked assignments - simple lock display
        if (metadata?.isLocked) {
          return (
            <div 
              key={taskId}
              className="bg-warm-brown/10 backdrop-blur-sm rounded-2xl border border-cream/20 p-6 opacity-60"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-lg text-gray-400 font-medium">
                  {t('daily.locked')}
                </span>
              </div>
            </div>
          );
        }

        // Handle unlocked assignments - simple assignment display
        return (
          <Assignment
            key={taskId}
            assignment={assignment}
            taskId={taskId}
            level={completedTasks[taskId] || 0}
            onLevelChange={onTaskLevelChange}
            variant="sage"
            topicName={topicName}
            topicIndex={topicIndex}
          />
        );
      })}
    </div>
  );
};

export default AssignmentList;
