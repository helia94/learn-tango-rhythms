
export interface FeatureFlagConfig {
  key: string;
  name: string;
  description: string;
  defaultValue: boolean;
  envVariable: string;
}

export const FEATURE_FLAG_CONFIGS: Record<string, FeatureFlagConfig> = {
  unlockAll: {
    key: 'unlockAll',
    name: 'Unlock All Content',
    description: 'Bypasses daily content restrictions and unlocks all days immediately',
    defaultValue: false,
    envVariable: 'VITE_UNLOCK_ALL'
  }
};

// Helper function to get environment-based default value
export const getEnvFlagValue = (envVariable: string, defaultValue: boolean = false): boolean => {
  const envValue = import.meta.env[envVariable];
  
  if (envValue === undefined || envValue === null) {
    return defaultValue;
  }
  
  // Handle string boolean values
  if (typeof envValue === 'string') {
    return envValue.toLowerCase() === 'true';
  }
  
  return Boolean(envValue);
};

// Development mode detection
export const isDevelopmentMode = (): boolean => {
  return import.meta.env.DEV || false;
};

// Helper to check if we're in a special environment
export const isSpecialEnvironment = (): boolean => {
  return isDevelopmentMode() || import.meta.env.VITE_ENVIRONMENT === 'staging';
};
