
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import LockedDayContent from './LockedDayContent';
import Day1Content from './fast_and_slow/Day1Content';
import Day2Content from './fast_and_slow/Day2Content';
import Day3Content from './fast_and_slow/Day3Content';
import Day4Content from './fast_and_slow/Day4Content';
import Day5Content from './fast_and_slow/Day5Content';
import Day6Content from './fast_and_slow/Day6Content';
import Day7Content from './fast_and_slow/Day7Content';
import { DayStatus } from './DayStatus';

interface DayContentProps {
  dayNumber: number;
  status: DayStatus;
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName?: string;
  topicIndex?: number;
}

const DayContent: React.FC<DayContentProps> = ({
  dayNumber,
  status,
  completedTasks,
  onTaskLevelChange,
  topicName = 'dancing-fast-slow',
  topicIndex = 0
}) => {
  const { t } = useTranslation();

  // Show locked content for locked/tomorrow days
  if (status === 'locked' || status === 'tomorrow') {
    return <LockedDayContent status={status} />;
  }

  // Render specific day content
  const commonProps = { 
    completedTasks, 
    onTaskLevelChange,
    topicName,
    topicIndex
  };

  switch (dayNumber) {
    case 1:
      return <Day1Content {...commonProps} />;
    case 2:
      return <Day2Content {...commonProps} />;
    case 3:
      return <Day3Content {...commonProps} />;
    case 4:
      return <Day4Content {...commonProps} />;
    case 5:
      return <Day5Content {...commonProps} />;
    case 6:
      return <Day6Content {...commonProps} />;
    case 7:
      return <Day7Content {...commonProps} />;
    default:
      // Placeholder content for other days
      return (
        <div className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            Day {dayNumber} {t('daily.placeholder')}
          </p>
          
          <Assignment
            assignment={{ content: 'daily.placeholderTask', task: 'daily.placeholderTask' }}
            taskId={`day-${dayNumber}-task`}
            level={completedTasks[`day-${dayNumber}-task`] || 0}
            onLevelChange={onTaskLevelChange}
            variant="sage"
            topicName={topicName}
            topicIndex={topicIndex}
          />
        </div>
      );
  }
};

export default DayContent;
