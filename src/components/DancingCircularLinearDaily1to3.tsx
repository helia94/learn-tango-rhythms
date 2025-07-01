import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import DailyAssignmentsHeader from '@/components/ui/DailyAssignmentsHeader';
import DailyAccordion from '@/components/ui/DailyAccordion';
import { TOPIC_CONFIG } from '@/config/topics';

interface DancingCircularLinearDaily1to3Props {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const DancingCircularLinearDaily1to3: React.FC<DancingCircularLinearDaily1to3Props> = ({
  completedTasks,
  onTaskLevelChange
}) => {
  const { user } = useAuth();
  const topic = TOPIC_CONFIG.DANCING_CIRCULAR_LINEAR;

  const {
    activatedDays,
    nextDayToActivate,
    activateDay,
    unlockAllEnabled
  } = useDailyTopicActivation(topic.key, topic.index, topic.totalDays);

  const daysUnlocked = unlockAllEnabled ? topic.totalDays : activatedDays.length;

  return (
    <div>
      <DailyAssignmentsHeader
        daysUnlocked={daysUnlocked}
        totalDays={topic.totalDays}
        nextDayToActivate={nextDayToActivate}
        unlockAllEnabled={unlockAllEnabled}
      />
      
      <DailyAccordion
        totalDays={topic.totalDays}
        activatedDays={activatedDays}
        nextDayToActivate={nextDayToActivate}
        completedTasks={completedTasks}
        onTaskLevelChange={onTaskLevelChange}
        onDayActivation={user ? activateDay : undefined}
        topicName={topic.key}
        topicIndex={topic.index}
      />
    </div>
  );
};

export default DancingCircularLinearDaily1to3;
