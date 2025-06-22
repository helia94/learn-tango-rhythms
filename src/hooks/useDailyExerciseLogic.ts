
import { useDailyTopicActivation } from './useDailyTopicActivation';
import { useAuth } from '@/contexts/AuthContext';
import { useUnlockAll } from './useFeatureFlag';

export interface DailyExerciseLogicProps {
  topicKey: string;
  topicIndex: number;
  totalDays: number;
}

export interface DailyExerciseHeaderProps {
  daysUnlocked: number;
  totalDays: number;
  nextDayToActivate?: number | null;
  unlockAllEnabled?: boolean;
}

export interface DailyExerciseAccordionProps {
  totalDays: number;
  activatedDays: number[];
  nextDayToActivate: number | null;
  onDayActivation?: (dayNumber: number) => void;
  topicName: string;
  topicIndex: number;
}

export const useDailyExerciseLogic = ({ topicKey, topicIndex, totalDays }: DailyExerciseLogicProps) => {
  const { user } = useAuth();
  const unlockAllEnabled = useUnlockAll();
  
  // Use existing useDailyTopicActivation hook
  const {
    activatedDays,
    nextDayToActivate,
    activateDay,
    isLoading,
    whichDailiesWereActivated,
    whichDailyIsNextOnActivationOrder,
    canActivateDay,
    ...rest
  } = useDailyTopicActivation(topicKey, topicIndex, totalDays);

  // Centralized daysUnlocked calculation
  const calculateDaysUnlocked = (): number => {
    if (unlockAllEnabled) {
      return totalDays;
    }
    
    const activatedDaysArray = whichDailiesWereActivated();
    return activatedDaysArray.length > 0 ? Math.max(...activatedDaysArray) : 0;
  };

  // Centralized day activation handler
  const handleDayActivation = async (dayNumber: number): Promise<void> => {
    if (!user) {
      console.log('User must be logged in to activate day');
      return;
    }

    try {
      // Check if day can be activated (unless unlockAll is enabled)
      if (!unlockAllEnabled) {
        const canActivate = await canActivateDay(dayNumber);
        if (!canActivate) {
          console.log(`Cannot activate day ${dayNumber} yet - conditions not met`);
          return;
        }
      }

      // Activate the day
      await activateDay(dayNumber);
      console.log(`Day ${dayNumber} activated successfully for topic ${topicKey}`);
    } catch (error) {
      console.error(`Failed to activate day ${dayNumber}:`, error);
      throw error;
    }
  };

  // Generate header props
  const getHeaderProps = (): DailyExerciseHeaderProps => {
    return {
      daysUnlocked: calculateDaysUnlocked(),
      totalDays,
      nextDayToActivate: whichDailyIsNextOnActivationOrder(),
      unlockAllEnabled
    };
  };

  // Generate accordion props
  const getAccordionProps = (): Omit<DailyExerciseAccordionProps, 'completedTasks' | 'onTaskLevelChange'> => {
    return {
      totalDays,
      activatedDays: whichDailiesWereActivated(),
      nextDayToActivate: whichDailyIsNextOnActivationOrder(),
      onDayActivation: user ? handleDayActivation : undefined,
      topicName: topicKey,
      topicIndex
    };
  };

  return {
    // Original hook data
    activatedDays,
    nextDayToActivate,
    activateDay,
    isLoading,
    unlockAllEnabled,
    whichDailiesWereActivated,
    whichDailyIsNextOnActivationOrder,
    canActivateDay,
    ...rest,
    
    // New centralized logic
    daysUnlocked: calculateDaysUnlocked(),
    handleDayActivation,
    getHeaderProps,
    getAccordionProps
  };
};
