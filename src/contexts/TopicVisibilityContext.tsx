
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTopicActivation } from '@/hooks/useTopicActivation';
import { useFeatureFlags } from '@/contexts/FeatureFlagsContext';

interface TopicVisibility {
  topicIndex: number;
  topicKey: string;
  isVisible: boolean;
  isUnlocked: boolean;
  isActive: boolean;
  deadline: Date | null;
}

interface SubtopicVisibility {
  topicIndex: number;
  topicKey: string;
  dayIndex: number;
  isVisible: boolean;
  isActivated: boolean;
  canActivate: boolean;
  nextActivationDate: Date | null;
}

interface TopicVisibilityContextValue {
  visibleTopics: TopicVisibility[];
  visibleSubtopics: SubtopicVisibility[];
  isLoading: boolean;
  refreshVisibility: () => Promise<void>;
  getTopicVisibility: (topicIndex: number) => TopicVisibility | null;
  getSubtopicVisibility: (topicIndex: number, dayIndex: number) => SubtopicVisibility | null;
}

const TopicVisibilityContext = createContext<TopicVisibilityContextValue | undefined>(undefined);

// Define all available topics with their configurations
const AVAILABLE_TOPICS = [
  { topicIndex: 0, topicKey: 'dancing-fast-slow', totalDays: 7 },
  { topicIndex: 1, topicKey: 'dancing-small-big', totalDays: 7 },
  { topicIndex: 2, topicKey: 'dancing-high-low', totalDays: 7 },
  { topicIndex: 3, topicKey: 'dancing-circular-linear', totalDays: 3 },
  { topicIndex: 4, topicKey: 'dancing-with-without-control', totalDays: 4 },
];

interface TopicVisibilityProviderProps {
  children: ReactNode;
}

// Deep compare function to prevent unnecessary re-renders
const deepEqual = (a: any, b: any): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const TopicVisibilityProvider: React.FC<TopicVisibilityProviderProps> = ({ children }) => {
  const [visibleTopics, setVisibleTopics] = useState<TopicVisibility[]>([]);
  const [visibleSubtopics, setVisibleSubtopics] = useState<SubtopicVisibility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasInitialized = useRef(false);
  
  const { user } = useAuth();
  const { flags } = useFeatureFlags();
  const { 
    getAllUnlockedTopics, 
    isTopicActive, 
    getTopicDeadline 
  } = useTopicActivation();

  const refreshVisibility = async () => {
    // Prevent multiple concurrent calls
    if (hasInitialized.current) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Get all unlocked topics
      const unlockedTopicIndices = await getAllUnlockedTopics();
      
      // Calculate topic visibility
      const topicVisibilities: TopicVisibility[] = [];
      
      for (const topicConfig of AVAILABLE_TOPICS) {
        try {
          const isUnlocked = unlockedTopicIndices.includes(topicConfig.topicIndex);
          
          // Check if topic is active
          const isActive = await isTopicActive(topicConfig.topicKey, topicConfig.topicIndex);
          
          const deadline = await getTopicDeadline(topicConfig.topicKey, topicConfig.topicIndex);
          
          // Topic is visible if:
          // 1. It's unlocked (either naturally or via feature flag)
          // 2. Or if unlockAll feature flag is enabled
          const isVisible = isUnlocked || (flags?.unlockAll === true);
          
          const topicVisibility: TopicVisibility = {
            topicIndex: topicConfig.topicIndex,
            topicKey: topicConfig.topicKey,
            isVisible,
            isUnlocked,
            isActive,
            deadline
          };
          
          topicVisibilities.push(topicVisibility);
        } catch (topicError) {
          console.error(`TopicVisibilityContext: Error processing topic ${topicConfig.topicIndex}:`, topicError);
          // Add a fallback visibility entry for this topic
          topicVisibilities.push({
            topicIndex: topicConfig.topicIndex,
            topicKey: topicConfig.topicKey,
            isVisible: topicConfig.topicIndex === 0, // Only show first topic as fallback
            isUnlocked: topicConfig.topicIndex === 0,
            isActive: false,
            deadline: null
          });
        }
      }
      
      // Only update state if the data has actually changed
      setVisibleTopics(prevVisibleTopics => {
        if (!deepEqual(prevVisibleTopics, topicVisibilities)) {
          return topicVisibilities;
        } else {
          return prevVisibleTopics;
        }
      });
      
      // For now, we'll skip subtopic visibility calculation
      setVisibleSubtopics([]);
      
      hasInitialized.current = true;
    } catch (error) {
      console.error('TopicVisibilityContext: Error calculating topic visibility:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      
      // Provide fallback data even when there's an error
      const fallbackTopics: TopicVisibility[] = AVAILABLE_TOPICS.map(config => ({
        topicIndex: config.topicIndex,
        topicKey: config.topicKey,
        isVisible: config.topicIndex === 0, // Only show first topic as fallback
        isUnlocked: config.topicIndex === 0,
        isActive: false,
        deadline: null
      }));
      
      setVisibleTopics(fallbackTopics);
      setVisibleSubtopics([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getTopicVisibility = (topicIndex: number): TopicVisibility | null => {
    return visibleTopics.find(t => t.topicIndex === topicIndex) || null;
  };

  const getSubtopicVisibility = (topicIndex: number, dayIndex: number): SubtopicVisibility | null => {
    return visibleSubtopics.find(s => s.topicIndex === topicIndex && s.dayIndex === dayIndex) || null;
  };

  // Refresh visibility when user authentication status changes or feature flags change
  useEffect(() => {
    // Reset initialization flag when dependencies change
    hasInitialized.current = false;
    refreshVisibility().catch(error => {
      console.error('TopicVisibilityContext: Error in useEffect refreshVisibility:', error);
    });
  }, [user, flags?.unlockAll]);

  const value: TopicVisibilityContextValue = {
    visibleTopics,
    visibleSubtopics,
    isLoading,
    refreshVisibility,
    getTopicVisibility,
    getSubtopicVisibility
  };

  // Always provide the context, even if there's an error
  return (
    <TopicVisibilityContext.Provider value={value}>
      {children}
    </TopicVisibilityContext.Provider>
  );
};

export const useTopicVisibility = () => {
  const context = useContext(TopicVisibilityContext);
  if (context === undefined) {
    throw new Error('useTopicVisibility must be used within a TopicVisibilityProvider');
  }
  return context;
};
