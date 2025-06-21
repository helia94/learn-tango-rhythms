
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import FastSlowDay1Content from '@/components/daily/fast_and_slow/Day1Content';
import FastSlowDay2Content from '@/components/daily/fast_and_slow/Day2Content';
import FastSlowDay3Content from '@/components/daily/fast_and_slow/Day3Content';
import FastSlowDay4Content from '@/components/daily/fast_and_slow/Day4Content';
import FastSlowDay5Content from '@/components/daily/fast_and_slow/Day5Content';
import FastSlowDay6Content from '@/components/daily/fast_and_slow/Day6Content';
import FastSlowDay7Content from '@/components/daily/fast_and_slow/Day7Content';
import SmallBigDay1Content from '@/components/daily/small_and_big/Day1Content';
import SmallBigDay2Content from '@/components/daily/small_and_big/Day2Content';
import SmallBigDay3Content from '@/components/daily/small_and_big/Day3Content';
import SmallBigDay4Content from '@/components/daily/small_and_big/Day4Content';
import SmallBigDay5Content from '@/components/daily/small_and_big/Day5Content';
import SmallBigDay6Content from '@/components/daily/small_and_big/Day6Content';
import SmallBigDay7Content from '@/components/daily/small_and_big/Day7Content';
import HighLowDay1Content from '@/components/daily/dancing_high_low/Day1Content';
import HighLowDay2Content from '@/components/daily/dancing_high_low/Day2Content';
import HighLowDay3Content from '@/components/daily/dancing_high_low/Day3Content';
import HighLowDay4Content from '@/components/daily/dancing_high_low/Day4Content';
import HighLowDay5Content from '@/components/daily/dancing_high_low/Day5Content';
import CircularLinearDay1Content from '@/components/daily/dancing_circular_linear/Day1Content';
import CircularLinearDay2Content from '@/components/daily/dancing_circular_linear/Day2Content';
import CircularLinearDay3Content from '@/components/daily/dancing_circular_linear/Day3Content';

interface DayContentProps {
  dayNumber: number;
  topicName: string;
  topicIndex: number;
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const DayContent: React.FC<DayContentProps> = ({ dayNumber, topicName, topicIndex, completedTasks, onTaskLevelChange }) => {
  const { t } = useTranslation();

  const getContent = () => {
    switch (topicName) {
      case 'dancing-fast-slow':
        switch (dayNumber) {
          case 1: return <FastSlowDay1Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 2: return <FastSlowDay2Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 3: return <FastSlowDay3Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 4: return <FastSlowDay4Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 5: return <FastSlowDay5Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 6: return <FastSlowDay6Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 7: return <FastSlowDay7Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          default: return <div>{t('daily.dayNotFound')}</div>;
        }
      
      case 'dancing-small-big':
        switch (dayNumber) {
          case 1: return <SmallBigDay1Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 2: return <SmallBigDay2Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 3: return <SmallBigDay3Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 4: return <SmallBigDay4Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 5: return <SmallBigDay5Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 6: return <SmallBigDay6Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 7: return <SmallBigDay7Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          default: return <div>{t('daily.dayNotFound')}</div>;
        }

      case 'dancing-high-low':
        switch (dayNumber) {
          case 1: return <HighLowDay1Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 2: return <HighLowDay2Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 3: return <HighLowDay3Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 4: return <HighLowDay4Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 5: return <HighLowDay5Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          default: return <div>{t('daily.dayNotFound')}</div>;
        }

      case 'dancing-circular-linear':
        switch (dayNumber) {
          case 1: return <CircularLinearDay1Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 2: return <CircularLinearDay2Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          case 3: return <CircularLinearDay3Content completedTasks={completedTasks} onTaskLevelChange={onTaskLevelChange} topicName={topicName} topicIndex={topicIndex} />;
          default: return <div>{t('daily.dayNotFound')}</div>;
        }

      default:
        return <div>{t('daily.topicNotFound')}</div>;
    }
  };

  return (
    <div>
      {getContent()}
    </div>
  );
};

export default DayContent;
