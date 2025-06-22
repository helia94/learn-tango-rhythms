
import React, { createContext, useContext, ReactNode } from 'react';

export interface DailyExerciseConfig {
  topicKey: string;
  topicIndex: number;
  totalDays: number;
}

export interface DailyExerciseContextValue {
  config: DailyExerciseConfig | null;
  setConfig: (config: DailyExerciseConfig) => void;
}

const DailyExerciseContext = createContext<DailyExerciseContextValue | undefined>(undefined);

interface DailyExerciseProviderProps {
  children: ReactNode;
}

export const DailyExerciseProvider: React.FC<DailyExerciseProviderProps> = ({ children }) => {
  const [config, setConfig] = React.useState<DailyExerciseConfig | null>(null);

  const value: DailyExerciseContextValue = {
    config,
    setConfig
  };

  return (
    <DailyExerciseContext.Provider value={value}>
      {children}
    </DailyExerciseContext.Provider>
  );
};

export const useDailyExerciseContext = () => {
  const context = useContext(DailyExerciseContext);
  if (context === undefined) {
    throw new Error('useDailyExerciseContext must be used within a DailyExerciseProvider');
  }
  return context;
};
