
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import DailyAssignmentsHeader from '@/components/ui/DailyAssignmentsHeader';
import DailyAccordion from '@/components/ui/DailyAccordion';

interface DancingCircularLinearDaily1to3Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const DancingCircularLinearDaily1to3: React.FC<DancingCircularLinearDaily1to3Props> = ({
  completedTasks,
  onTaskLevelChange
}) => {
  const { user } = useAuth();
  const totalDays = 3;
  const topicName = 'dancing-circular-linear';
  const topicIndex = 3;

  const {
    activatedDays,
    nextDayToActivate,
    activateDay,
    unlockAllEnabled
  } = useDailyTopicActivation(topicName, topicIndex, totalDays);

  const daysUnlocked = unlockAllEnabled ? totalDays : activatedDays.length;

  return (
    <div>
      <DailyAssignmentsHeader
        daysUnlocked={daysUnlocked}
        totalDays={totalDays}
        nextDayToActivate={nextDayToActivate}
        unlockAllEnabled={unlockAllEnabled}
      />
      
      <DailyAccordion
        totalDays={totalDays}
        activatedDays={activatedDays}
        nextDayToActivate={nextDayToActivate}
        completedTasks={completedTasks}
        onTaskLevelChange={onTaskLevelChange}
        onDayActivation={user ? activateDay : undefined}
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default DancingCircularLinearDaily1to3;
