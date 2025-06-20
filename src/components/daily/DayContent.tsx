
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import LockedDayContent from './LockedDayContent';
// Fast and Slow imports
import Day1Content from './fast_and_slow/Day1Content';
import Day2Content from './fast_and_slow/Day2Content';
import Day3Content from './fast_and_slow/Day3Content';
import Day4Content from './fast_and_slow/Day4Content';
import Day5Content from './fast_and_slow/Day5Content';
import Day6Content from './fast_and_slow/Day6Content';
import Day7Content from './fast_and_slow/Day7Content';
// Small and Big imports
import SmallBigDay1Content from './small_and_big/Day1Content';
import SmallBigDay2Content from './small_and_big/Day2Content';
import SmallBigDay3Content from './small_and_big/Day3Content';
import SmallBigDay4Content from './small_and_big/Day4Content';
import SmallBigDay5Content from './small_and_big/Day5Content';
import SmallBigDay6Content from './small_and_big/Day6Content';
import SmallBigDay7Content from './small_and_big/Day7Content';
// High and Low imports
import HighLowDay1Content from './dancing_high_low/Day1Content';
import HighLowDay2Content from './dancing_high_low/Day2Content';
import HighLowDay3Content from './dancing_high_low/Day3Content';
import HighLowDay4Content from './dancing_high_low/Day4Content';
import HighLowDay5Content from './dancing_high_low/Day5Content';
import HighLowDay6Content from './dancing_high_low/Day6Content';
import HighLowDay7Content from './dancing_high_low/Day7Content';
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

  console.log(`DayContent - Day ${dayNumber} routing:`, {
    topicName,
    topicIndex,
    status,
    willRouteToHighLow: topicName === 'dancing-high-low',
    willRouteToSmallBig: topicName === 'dancing-small-big'
  });

  // Show locked content for locked/tomorrow days
  if (status === 'locked' || status === 'tomorrow') {
    return <LockedDayContent status={status} />;
  }

  // Render specific day content based on topic
  const commonProps = { 
    completedTasks, 
    onTaskLevelChange,
    topicName,
    topicIndex
  };

  // Route to the correct topic's daily content
  if (topicName === 'dancing-high-low') {
    console.log(`DayContent - Routing to high-low Day ${dayNumber}`);
    switch (dayNumber) {
      case 1:
        return <HighLowDay1Content {...commonProps} />;
      case 2:
        return <HighLowDay2Content {...commonProps} />;
      case 3:
        return <HighLowDay3Content {...commonProps} />;
      case 4:
        return <HighLowDay4Content {...commonProps} />;
      case 5:
        return <HighLowDay5Content {...commonProps} />;
      case 6:
        return <HighLowDay6Content {...commonProps} />;
      case 7:
        return <HighLowDay7Content {...commonProps} />;
      default:
        return (
          <div className="space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              Day {dayNumber} content coming soon...
            </p>
            
            <Assignment
              assignment={{ content: 'daily.placeholderTask' as any, task: 'daily.placeholderTask' as any }}
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
  }

  if (topicName === 'dancing-small-big') {
    console.log(`DayContent - Routing to small-big Day ${dayNumber}`);
    switch (dayNumber) {
      case 1:
        return <SmallBigDay1Content {...commonProps} />;
      case 2:
        return <SmallBigDay2Content {...commonProps} />;
      case 3:
        return <SmallBigDay3Content {...commonProps} />;
      case 4:
        return <SmallBigDay4Content {...commonProps} />;
      case 5:
        return <SmallBigDay5Content {...commonProps} />;
      case 6:
        return <SmallBigDay6Content {...commonProps} />;
      case 7:
        return <SmallBigDay7Content {...commonProps} />;
      default:
        return (
          <div className="space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              Day {dayNumber} content coming soon...
            </p>
            
            <Assignment
              assignment={{ content: 'daily.placeholderTask' as any, task: 'daily.placeholderTask' as any }}
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
  }

  // Default to fast and slow content
  console.log(`DayContent - Routing to fast-slow Day ${dayNumber} (default)`);
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
            Day {dayNumber} {t('daily.placeholder' as any)}
          </p>
          
          <Assignment
            assignment={{ content: 'daily.placeholderTask' as any, task: 'daily.placeholderTask' as any }}
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
