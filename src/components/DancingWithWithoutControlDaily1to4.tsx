
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import DailyAccordion from '@/components/ui/DailyAccordion';
import { DayStatus } from '@/components/daily/DayStatus';

interface DancingWithWithoutControlDaily1to4Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const DancingWithWithoutControlDaily1to4: React.FC<DancingWithWithoutControlDaily1to4Props> = ({
  completedTasks,
  onTaskLevelChange
}) => {
  const { t } = useTranslation();
  const topicKey = 'dancing-with-without-control';
  const topicIndex = 4;
  
  const { 
    getActiveDayForTopic,
    isTopicActive 
  } = useDailyTopicActivation();

  const activeDay = getActiveDayForTopic(topicKey, topicIndex);
  const topicIsActive = isTopicActive(topicKey, topicIndex);

  const days = [
    {
      day: 1,
      title: t('daily.day1' as any) || 'Day 1',
      status: DayStatus.getStatus(1, activeDay, topicIsActive),
      topicName: topicKey,
      topicIndex: topicIndex
    },
    {
      day: 2,
      title: t('daily.day2' as any) || 'Day 2', 
      status: DayStatus.getStatus(2, activeDay, topicIsActive),
      topicName: topicKey,
      topicIndex: topicIndex
    },
    {
      day: 3,
      title: t('daily.day3' as any) || 'Day 3',
      status: DayStatus.getStatus(3, activeDay, topicIsActive),
      topicName: topicKey,
      topicIndex: topicIndex
    },
    {
      day: 4,
      title: t('daily.day4' as any) || 'Day 4',
      status: DayStatus.getStatus(4, activeDay, topicIsActive),
      topicName: topicKey,
      topicIndex: topicIndex
    }
  ];

  return (
    <DailyAccordion
      title={t('daily.title' as any) || 'Daily Assignments'}
      days={days}
      completedTasks={completedTasks}
      onTaskLevelChange={onTaskLevelChange}
      totalDays={4}
    />
  );
};

export default DancingWithWithoutControlDaily1to4;
