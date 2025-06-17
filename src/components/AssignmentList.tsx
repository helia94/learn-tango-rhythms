
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Assignment } from '@/data/assignments';
import LevelSelector from '@/components/LevelSelector';

interface AssignmentListProps {
  assignments: Assignment[];
  taskLevels: Record<string, number>;
  onLevelChange: (taskId: string, level: number) => void;
  keyPrefix?: string;
  className?: string;
  variant?: 'default' | 'sage' | 'golden' | 'dusty-rose' | 'terracotta';
}

const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  taskLevels,
  onLevelChange,
  keyPrefix = 'assignment',
  className = '',
  variant = 'golden'
}) => {
  const { t } = useTranslation();

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'golden':
        return 'bg-golden-yellow/20 border-golden-yellow/30';
      case 'dusty-rose':
        return 'bg-dusty-rose/20 border-dusty-rose/30';
      case 'terracotta':
        return 'bg-terracotta/20 border-terracotta/30';
      case 'sage':
        return 'bg-sage-green/20 border-sage-green/30';
      case 'default':
      default:
        return 'bg-warm-brown/20 border-warm-brown/30';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {assignments.map((assignment, index) => {
        const taskId = `${keyPrefix}-${index}`;
        
        return (
          <div 
            key={taskId} 
            className={`flex items-center gap-4 ${getVariantStyles(variant)} backdrop-blur-sm rounded-2xl p-6 border`}
          >
            <LevelSelector
              level={taskLevels[taskId] || 0}
              onLevelChange={(level) => onLevelChange(taskId, level)}
              variant={variant}
            />
            <div className="text-gray-700 text-lg leading-relaxed">
              {t(assignment.content)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssignmentList;
