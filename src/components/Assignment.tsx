
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Assignment as AssignmentType } from '@/data/assignments/fastAndSlow';
import { useAssignmentReporting } from '@/hooks/useAssignmentReporting';
import LevelSelector from './LevelSelector';
import InfoModal from './InfoModal';

interface AssignmentProps {
  assignment: AssignmentType;
  taskId: string;
  level: number;
  onLevelChange: (taskId: string, level: number) => void;
  className?: string;
  variant?: 'default' | 'sage' | 'golden' | 'dusty-rose' | 'terracotta';
  topicName?: string;
  topicIndex?: number;
}

const Assignment: React.FC<AssignmentProps> = ({
  assignment,
  taskId,
  level,
  onLevelChange,
  className = '',
  variant = 'sage',
  topicName = 'dancing-fast-slow',
  topicIndex = 0
}) => {
  const { t, currentLanguage } = useTranslation();
  const { reportAssignmentLevel, isLoading } = useAssignmentReporting();

  const handleLevelChange = async (newLevel: number) => {
    // Update local state immediately for responsiveness
    onLevelChange(taskId, newLevel);
    
    // Report to database
    try {
      await reportAssignmentLevel(topicName, topicIndex, taskId, newLevel);
    } catch (error) {
      console.error('Failed to report assignment level:', error);
      // You could add a toast notification here if needed
    }
  };

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
    <div className={`${getVariantStyles(variant)} backdrop-blur-sm rounded-2xl p-6 border ${className}`}>
      <label className="text-gray-700 text-lg font-medium cursor-pointer block mb-4">
        {t(assignment.content)}
      </label>
      <div className="flex items-center">
        <LevelSelector
          level={level}
          onLevelChange={handleLevelChange}
        />
        <InfoModal />
        {isLoading && (
          <span className="ml-2 text-sm text-gray-500">Saving...</span>
        )}
      </div>
    </div>
  );
};

export default Assignment;
