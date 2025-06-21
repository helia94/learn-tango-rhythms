
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

// Fast and Slow imports
import Day1ContentFastSlow from './fast_and_slow/Day1Content';
import Day2ContentFastSlow from './fast_and_slow/Day2Content';
import Day3ContentFastSlow from './fast_and_slow/Day3Content';
import Day4ContentFastSlow from './fast_and_slow/Day4Content';
import Day5ContentFastSlow from './fast_and_slow/Day5Content';
import Day6ContentFastSlow from './fast_and_slow/Day6Content';
import Day7ContentFastSlow from './fast_and_slow/Day7Content';

// Small and Big imports
import Day1ContentSmallBig from './small_and_big/Day1Content';
import Day2ContentSmallBig from './small_and_big/Day2Content';
import Day3ContentSmallBig from './small_and_big/Day3Content';
import Day4ContentSmallBig from './small_and_big/Day4Content';
import Day5ContentSmallBig from './small_and_big/Day5Content';
import Day6ContentSmallBig from './small_and_big/Day6Content';
import Day7ContentSmallBig from './small_and_big/Day7Content';

// High Low imports
import Day1ContentHighLow from './dancing_high_low/Day1Content';
import Day2ContentHighLow from './dancing_high_low/Day2Content';
import Day3ContentHighLow from './dancing_high_low/Day3Content';
import Day4ContentHighLow from './dancing_high_low/Day4Content';
import Day5ContentHighLow from './dancing_high_low/Day5Content';

// Circular Linear imports
import Day1ContentCircularLinear from './dancing_circular_linear/Day1Content';
import Day2ContentCircularLinear from './dancing_circular_linear/Day2Content';
import Day3ContentCircularLinear from './dancing_circular_linear/Day3Content';

// With Without Control imports
import Day1ContentWithWithoutControl from './dancing_with_without_control/Day1Content';
import Day2ContentWithWithoutControl from './dancing_with_without_control/Day2Content';
import Day3ContentWithWithoutControl from './dancing_with_without_control/Day3Content';
import Day4ContentWithWithoutControl from './dancing_with_without_control/Day4Content';

interface DayContentProps {
  topicName: string;
  dayNumber: number;
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicIndex: number;
}

const DayContent: React.FC<DayContentProps> = ({
  topicName,
  dayNumber,
  completedTasks,
  onTaskLevelChange,
  topicIndex
}) => {
  const { t } = useTranslation();

  const getContent = () => {
    switch (topicName) {
      case 'dancing-fast-slow':
        switch (dayNumber) {
          case 1: return <Day1ContentFastSlow completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 2: return <Day2ContentFastSlow completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 3: return <Day3ContentFastSlow completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 4: return <Day4ContentFastSlow completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 5: return <Day5ContentFastSlow completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 6: return <Day6ContentFastSlow completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 7: return <Day7ContentFastSlow completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          default: return <div>{t('daily.dayNotFound')}</div>;
        }
      
      case 'dancing-small-big':
        switch (dayNumber) {
          case 1: return <Day1ContentSmallBig completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 2: return <Day2ContentSmallBig completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 3: return <Day3ContentSmallBig completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 4: return <Day4ContentSmallBig completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 5: return <Day5ContentSmallBig completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 6: return <Day6ContentSmallBig completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 7: return <Day7ContentSmallBig completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          default: return <div>{t('daily.dayNotFound')}</div>;
        }

      case 'dancing-high-low':
        switch (dayNumber) {
          case 1: return <Day1ContentHighLow completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 2: return <Day2ContentHighLow completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 3: return <Day3ContentHighLow completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 4: return <Day4ContentHighLow completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 5: return <Day5ContentHighLow completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          default: return <div>{t('daily.dayNotFound')}</div>;
        }

      case 'dancing-circular-linear':
        switch (dayNumber) {
          case 1: return <Day1ContentCircularLinear completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 2: return <Day2ContentCircularLinear completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 3: return <Day3ContentCircularLinear completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          default: return <div>{t('daily.dayNotFound')}</div>;
        }

      case 'dancing-with-without-control':
        switch (dayNumber) {
          case 1: return <Day1ContentWithWithoutControl completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 2: return <Day2ContentWithWithoutControl completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 3: return <Day3ContentWithWithoutControl completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 4: return <Day4ContentWithWithoutControl completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          default: return <div>{t('daily.dayNotFound')}</div>;
        }

      default:
        return <div>{t('daily.topicNotFound')}</div>;
    }
  };

  return getContent();
};

export default DayContent;
