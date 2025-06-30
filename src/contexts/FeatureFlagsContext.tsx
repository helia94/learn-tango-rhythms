import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FeatureFlags {
  unlockAll: boolean;
  forceExerciseReload: boolean;
}

interface FeatureFlagsContextValue {
  flags: FeatureFlags;
  updateFlag: (key: keyof FeatureFlags, value: boolean) => void;
  isLoading: boolean;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextValue | undefined>(undefined);

// Default configuration from environment variables
const getDefaultFlags = (): FeatureFlags => {
  return {
    unlockAll: import.meta.env.VITE_UNLOCK_ALL === 'true' || false,
    forceExerciseReload: true, // Set to true for now
  };
};

interface FeatureFlagsProviderProps {
  children: ReactNode;
}

export const FeatureFlagsProvider: React.FC<FeatureFlagsProviderProps> = ({ children }) => {
  const [flags, setFlags] = useState<FeatureFlags>(getDefaultFlags);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize flags from environment variables
    const defaultFlags = getDefaultFlags();
    setFlags(defaultFlags);
    setIsLoading(false);
    
    console.log('FeatureFlags initialized:', defaultFlags);
  }, []);

  const updateFlag = (key: keyof FeatureFlags, value: boolean) => {
    setFlags(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`FeatureFlag ${key} updated to:`, value);
  };

  const value: FeatureFlagsContextValue = {
    flags,
    updateFlag,
    isLoading
  };

  return (
    <FeatureFlagsContext.Provider value={value}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagsContext);
  if (context === undefined) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagsProvider');
  }
  return context;
};
