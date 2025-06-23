
import { useState, useEffect } from 'react';
import { useDailyTopicActivation } from './useDailyTopicActivation';
import { useAuth } from '@/contexts/AuthContext';
import { useUnlockAll } from './useFeatureFlag';
import { supabase } from '@/integrations/supabase/client';

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
  const { user, profile } = useAuth();
  const unlockAllEnabled = useUnlockAll();
  const [resolvedActivatedDays, setResolvedActivatedDays] = useState<number[]>([]);
  const [resolvedNextDay, setResolvedNextDay] = useState<number | null>(null);
  const [isAdminUnlockAllActive, setIsAdminUnlockAllActive] = useState(false);
  
  // Use existing useDailyTopicActivation hook
  const {
    activatedDays,
    activateDay,
    isLoading,
    whichDailiesWereActivated,
    whichDailyIsNextOnActivationOrder,
    canActivateDay,
    ...rest
  } = useDailyTopicActivation(topicKey, topicIndex, totalDays);

  // Check if current user has admin unlock all activated
  const checkAdminUnlockAll = async (): Promise<boolean> => {
    if (!profile?.username) return false;

    try {
      // First check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('username')
        .eq('username', profile.username)
        .single();

      if (adminError || !adminData) {
        return false; // Not an admin
      }

      // Then check if unlock all is activated for this admin
      const { data: unlockData, error: unlockError } = await supabase
        .from('unlock_all_activated')
        .select('id')
        .eq('username', profile.username)
        .eq('index_activated', 1)
        .single();

      return !unlockError && !!unlockData;
    } catch (error) {
      console.error('Error checking admin unlock all:', error);
      return false;
    }
  };

  // Update resolved values when dependencies change
  useEffect(() => {
    const updateResolvedValues = async () => {
      const adminUnlockAll = await checkAdminUnlockAll();
      setIsAdminUnlockAllActive(adminUnlockAll);
      
      const activatedDaysResult = await whichDailiesWereActivated();
      setResolvedActivatedDays(activatedDaysResult);
      
      const nextDayResult = await whichDailyIsNextOnActivationOrder();
      setResolvedNextDay(nextDayResult);
    };
    
    updateResolvedValues();
  }, [user, profile?.username, activatedDays, unlockAllEnabled, topicKey, topicIndex]);

  // Centralized daysUnlocked calculation
  const calculateDaysUnlocked = (): number => {
    if (unlockAllEnabled || isAdminUnlockAllActive) {
      return totalDays;
    }
    
    return resolvedActivatedDays.length > 0 ? Math.max(...resolvedActivatedDays) : 0;
  };

  // Centralized day activation handler
  const handleDayActivation = async (dayNumber: number): Promise<void> => {
    if (!user) {
      console.log('User must be logged in to activate day');
      return;
    }

    try {
      // Check if day can be activated (unless unlockAll or admin unlock all is enabled)
      if (!unlockAllEnabled && !isAdminUnlockAllActive) {
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
      nextDayToActivate: resolvedNextDay,
      unlockAllEnabled: unlockAllEnabled || isAdminUnlockAllActive
    };
  };

  // Generate accordion props
  const getAccordionProps = (): Omit<DailyExerciseAccordionProps, 'completedTasks' | 'onTaskLevelChange'> => {
    return {
      totalDays,
      activatedDays: resolvedActivatedDays,
      nextDayToActivate: resolvedNextDay,
      onDayActivation: user ? handleDayActivation : undefined,
      topicName: topicKey,
      topicIndex
    };
  };

  return {
    // Original hook data
    activatedDays: resolvedActivatedDays,
    nextDayToActivate: resolvedNextDay,
    activateDay,
    isLoading,
    unlockAllEnabled: unlockAllEnabled || isAdminUnlockAllActive,
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
