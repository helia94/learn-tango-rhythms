import React from 'react';
import { useDailyExerciseLogic, DailyExerciseLogicProps } from '@/hooks/useDailyExerciseLogic';
import { useTranslation } from '@/hooks/useTranslation';
import { trackAssignmentLevel } from '@/utils/googleAnalytics';
import { TOPIC_CONFIG, TopicKey } from '@/config/topics';
import DailyAssignmentsHeader from './DailyAssignmentsHeader';
import DailyAccordion from './DailyAccordion';

interface DailyExerciseWrapperProps {
  topicKey: TopicKey;
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  showHeader?: boolean;
  className?: string;
}

const DailyExerciseWrapper: React.FC<DailyExerciseWrapperProps> = ({
  topicKey,
  completedTasks,
  onTaskLevelChange,
  showHeader = true,
  className = "mb-16"
}) => {
  const { t } = useTranslation();
  const topicConfig = Object.values(TOPIC_CONFIG).find(config => config.key === topicKey);
  
  if (!topicConfig) {
    throw new Error(`Topic configuration not found for key: ${topicKey}`);
  }

  const {
    isLoading,
    getHeaderProps,
    getAccordionProps
  } = useDailyExerciseLogic({ 
    topicKey: topicConfig.key, 
    topicIndex: topicConfig.index, 
    totalDays: topicConfig.totalDays 
  });

  // Enhanced task level change handler with analytics tracking
  const handleTaskLevelChange = (taskId: string, level: number) => {
    // Track assignment level change
    trackAssignmentLevel(taskId, level, topicKey);
    
    // Call the original handler
    onTaskLevelChange(taskId, level);
  };

  if (isLoading) {
    return (
      <div className={className}>
        {showHeader && (
          <DailyAssignmentsHeader
            daysUnlocked={0}
            totalDays={topicConfig.totalDays}
          />
        )}
        <div className="text-center">
          <p className="text-gray-600 mt-2">{t('common.loading')}...</p>
        </div>
      </div>
    );
  }

  const headerProps = getHeaderProps();
  const accordionProps = getAccordionProps();

  return (
    <div className={className}>
      {showHeader && (
        <DailyAssignmentsHeader {...headerProps} />
      )}

      <DailyAccordion
        {...accordionProps}
        completedTasks={completedTasks}
        onTaskLevelChange={handleTaskLevelChange}
      />
    </div>
  );
};

export default DailyExerciseWrapper;
