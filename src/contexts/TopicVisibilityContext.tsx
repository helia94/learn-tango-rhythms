
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTopicActivation } from '@/hooks/useTopicActivation';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
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
  { topicIndex: 1, topicKey: 'dancing-fast-slow', totalDays: 7 },
  { topicIndex: 2, topicKey: 'dancing-small-big', totalDays: 7 },
  { topicIndex: 3, topicKey: 'dancing-high-low', totalDays: 7 },
  { topicIndex: 4, topicKey: 'dancing-circular-linear', totalDays: 3 },
  { topicIndex: 5, topicKey: 'dancing-with-without-control', totalDays: 4 },
];

interface TopicVisibilityProviderProps {
  children: ReactNode;
}

export const TopicVisibilityProvider: React.FC<TopicVisibilityProviderProps> = ({ children }) => {
  const [visibleTopics, setVisibleTopics] = useState<TopicVisibility[]>([]);
  const [visibleSubtopics, setVisibleSubtopics] = useState<SubtopicVisibility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useAuth();
  const { flags } = useFeatureFlags();
  const { 
    getAllUnlockedTopics, 
    isTopicActive, 
    getTopicDeadline 
  } = useTopicActivation();

  const refreshVisibility = async () => {
    setIsLoading(true);
    
    try {
      // Get all unlocked topics
      const unlockedTopicIndices = await getAllUnlockedTopics();
      
      // Calculate topic visibility
      const topicVisibilities: TopicVisibility[] = [];
      
      for (const topicConfig of AVAILABLE_TOPICS) {
        const isUnlocked = unlockedTopicIndices.includes(topicConfig.topicIndex);
        const isActive = await isTopicActive(topicConfig.topicKey, topicConfig.topicIndex);
        const deadline = await getTopicDeadline(topicConfig.topicKey, topicConfig.topicIndex);
        
        // Topic is visible if:
        // 1. It's unlocked (either naturally or via feature flag)
        // 2. Or if unlockAll feature flag is enabled
        const isVisible = isUnlocked || flags.unlockAll;
        
        topicVisibilities.push({
          topicIndex: topicConfig.topicIndex,
          topicKey: topicConfig.topicKey,
          isVisible,
          isUnlocked,
          isActive,
          deadline
        });
      }
      
      // Calculate subtopic visibility for each topic
      const subtopicVisibilities: SubtopicVisibility[] = [];
      
      for (const topicConfig of AVAILABLE_TOPICS) {
        const topicVisibility = topicVisibilities.find(t => t.topicIndex === topicConfig.topicIndex);
        
        if (topicVisibility?.isVisible) {
          // Use the daily topic activation hook for this specific topic
          const { 
            activatedDays, 
            canActivateDay, 
            whenCanNextDailyBeActivated 
          } = useDailyTopicActivation(topicConfig.topicKey, topicConfig.topicIndex, topicConfig.totalDays);
          
          for (let dayIndex = 1; dayIndex <= topicConfig.totalDays; dayIndex++) {
            const isActivated = activatedDays.includes(dayIndex);
            const canActivate = await canActivateDay(dayIndex);
            const nextActivationDate = await whenCanNextDailyBeActivated();
            
            // Subtopic is visible if:
            // 1. The topic is visible
            // 2. And either it's activated, can be activated, or unlockAll is enabled
            const isVisible = topicVisibility.isVisible && (isActivated || canActivate || flags.unlockAll);
            
            subtopicVisibilities.push({
              topicIndex: topicConfig.topicIndex,
              topicKey: topicConfig.topicKey,
              dayIndex,
              isVisible,
              isActivated,
              canActivate,
              nextActivationDate
            });
          }
        }
      }
      
      setVisibleTopics(topicVisibilities);
      setVisibleSubtopics(subtopicVisibilities);
    } catch (error) {
      console.error('Error calculating topic visibility:', error);
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
    refreshVisibility();
  }, [user, flags.unlockAll]);

  const value: TopicVisibilityContextValue = {
    visibleTopics,
    visibleSubtopics,
    isLoading,
    refreshVisibility,
    getTopicVisibility,
    getSubtopicVisibility
  };

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
