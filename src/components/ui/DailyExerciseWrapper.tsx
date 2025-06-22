
import React from 'react';
import { useDailyExerciseLogic, DailyExerciseLogicProps } from '@/hooks/useDailyExerciseLogic';
import { useTranslation } from '@/hooks/useTranslation';
import DailyAssignmentsHeader from './DailyAssignmentsHeader';
import DailyAccordion from './DailyAccordion';

interface DailyExerciseWrapperProps extends DailyExerciseLogicProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  showHeader?: boolean;
  className?: string;
}

const DailyExerciseWrapper: React.FC<DailyExerciseWrapperProps> = ({
  topicKey,
  topicIndex,
  totalDays,
  completedTasks,
  onTaskLevelChange,
  showHeader = true,
  className = "mb-16"
}) => {
  const { t } = useTranslation();
  const {
    isLoading,
    getHeaderProps,
    getAccordionProps
  } = useDailyExerciseLogic({ topicKey, topicIndex, totalDays });

  if (isLoading) {
    return (
      <div className={className}>
        {showHeader && (
          <DailyAssignmentsHeader
            daysUnlocked={0}
            totalDays={totalDays}
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
        onTaskLevelChange={onTaskLevelChange}
      />
    </div>
  );
};

export default DailyExerciseWrapper;
