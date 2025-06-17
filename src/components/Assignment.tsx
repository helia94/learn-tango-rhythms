
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Assignment as AssignmentType } from '@/data/assignments';
import LevelSelector from './LevelSelector';

interface AssignmentProps {
  assignment: AssignmentType;
  taskId: string;
  level: number;
  onLevelChange: (taskId: string, level: number) => void;
  className?: string;
  variant?: 'default' | 'sage' | 'golden' | 'dusty-rose' | 'terracotta';
}

const Assignment: React.FC<AssignmentProps> = ({
  assignment,
  taskId,
  level,
  onLevelChange,
  className = '',
  variant = 'sage'
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
      default:
        return 'bg-sage-green/20 border-sage-green/30';
    }
  };

  return (
    <div className={`flex items-center gap-4 ${getVariantStyles(variant)} backdrop-blur-sm rounded-2xl p-6 border ${className}`}>
      <LevelSelector
        level={level}
        onLevelChange={(newLevel) => onLevelChange(taskId, newLevel)}
      />
      <label className="text-gray-700 text-lg font-medium cursor-pointer flex-1">
        {t(assignment.content)}
      </label>
    </div>
  );
};

export default Assignment;
