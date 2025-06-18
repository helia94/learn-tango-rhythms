
import { useFeatureFlags } from '@/contexts/FeatureFlagsContext';

export const useFeatureFlag = (flagKey: string): boolean => {
  const { flags } = useFeatureFlags();
  return flags[flagKey as keyof typeof flags] || false;
};

// Specific hook for the unlockAll flag
export const useUnlockAll = (): boolean => {
  return useFeatureFlag('unlockAll');
};
