
import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import { useAuth } from '@/contexts/AuthContext';
import { useUnlockAll } from '@/hooks/useFeatureFlag';
import { trackDailyActivation } from '@/utils/googleAnalytics';
import DayItem from '@/components/daily/DayItem';

interface DailyAccordionProps {
  totalDays: number;
  activatedDays: number[];
  nextDayToActivate: number | null;
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  onDayActivation?: (dayNumber: number) => void;
  topicName: string;
  topicIndex: number;
}

const DailyAccordion: React.FC<DailyAccordionProps> = ({
  totalDays,
  activatedDays,
  nextDayToActivate,
  completedTasks,
  onTaskLevelChange,
  onDayActivation,
  topicName,
  topicIndex
}) => {
  const { user } = useAuth();
  const unlockAllEnabled = useUnlockAll();

  const dayNumbers = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Enhanced day activation handler with analytics tracking
  const handleDayActivation = async (dayNumber: number) => {
    if (onDayActivation) {
      try {
        await onDayActivation(dayNumber);
        // Track daily activation
        trackDailyActivation(topicName, dayNumber);
      } catch (error) {
        console.error('Failed to activate day:', error);
      }
    }
  };

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {dayNumbers.map(dayNumber => {
        const isActivated = activatedDays.includes(dayNumber);
        const isNextToActivate = nextDayToActivate === dayNumber;
        
        // When unlockAll is enabled, treat all days as unlocked
        let status;
        if (unlockAllEnabled) {
          status = 'unlocked';
        } else {
          status = isActivated ? 'unlocked' : isNextToActivate ? 'tomorrow' : 'locked';
        }
        
        const isCompleted = completedTasks[`day-${dayNumber}-task`] > 0;
        
        return (
          <DayItem
            key={dayNumber}
            dayNumber={dayNumber}
            status={status}
            isCompleted={isCompleted}
            completedTasks={completedTasks}
            onTaskLevelChange={onTaskLevelChange}
            onDayActivation={user && (isNextToActivate || unlockAllEnabled) && onDayActivation ? () => handleDayActivation(dayNumber) : undefined}
            topicName={topicName}
            topicIndex={topicIndex}
          />
        );
      })}
    </Accordion>
  );
};

export default DailyAccordion;
