
import { useFeatureFlags } from '@/contexts/FeatureFlagsContext';
import { useTopicVisibility } from '@/contexts/TopicVisibilityContext';

export const useFeatureFlag = (flagKey: string): boolean => {
  const { flags } = useFeatureFlags();
  return flags[flagKey as keyof typeof flags] || false;
};

// Specific hook for the unlockAll flag - now integrates with admin unlock
export const useUnlockAll = (): boolean => {
  const { flags } = useFeatureFlags();
  const { isAdminUnlockActive } = useTopicVisibility();
  
  // Return true if either global flag is enabled OR admin unlock is active
  return flags.unlockAll || isAdminUnlockActive;
};
