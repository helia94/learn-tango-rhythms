import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Assignment as AssignmentType } from '@/data/assignments/fastAndSlow';
import { useAssignmentReporting } from '@/hooks/useAssignmentReporting';
import { useAuth } from '@/contexts/AuthContext';
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
  const { user } = useAuth();

  console.log('🎯 Assignment component:', {
    taskId,
    level,
    topicName,
    topicIndex,
    user: user?.id,
    assignmentContent: assignment?.content
  });

  // Add null check for assignment
  if (!assignment || !assignment.content) {
    console.error('Assignment is missing or has no content:', assignment);
    return (
      <div className={`bg-red-100 border border-red-300 rounded-2xl p-6 ${className}`}>
        <p className="text-red-700">Error: Assignment content is missing</p>
      </div>
    );
  }

  const handleLevelChange = async (newLevel: number) => {
    console.log('🔄 Assignment level change:', {
      taskId,
      oldLevel: level,
      newLevel,
      user: user?.id
    });
    
    // Only allow level changes if user is logged in
    if (!user) {
      console.log('❌ Cannot change level - user not logged in');
      return;
    }
    
    // Update local state immediately for responsiveness
    onLevelChange(taskId, newLevel);
    
    // Report to database
    try {
      console.log('📤 Reporting to database:', { topicName, topicIndex, taskId, newLevel });
      await reportAssignmentLevel(topicName, topicIndex, taskId, newLevel);
      console.log('✅ Successfully reported level change');
    } catch (error) {
      console.error('❌ Failed to report assignment level:', error);
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

  const renderTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const translatedText = t(assignment.content);

  return (
    <div className={`${getVariantStyles(variant)} backdrop-blur-sm rounded-2xl p-6 border ${className} ${!user ? 'opacity-75' : ''}`}>
      <label className="text-gray-700 text-lg font-medium cursor-pointer block mb-4">
        {renderTextWithLineBreaks(translatedText)}
      </label>
      <div className="flex items-center">
        <LevelSelector
          level={level}
          onLevelChange={handleLevelChange}
          disabled={!user}
        />
        <InfoModal />
        {!user && (
          <span className="ml-2 text-sm text-gray-500">Sign in to track progress</span>
        )}
        {isLoading && user && (
          <span className="ml-2 text-sm text-gray-500">Saving...</span>
        )}
      </div>
    </div>
  );
};

export default Assignment;
