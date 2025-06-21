
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
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

export const TopicVisibilityProvider: React.FC<TopicVisibilityProviderProps> = ({ children }) => {
  const [visibleTopics, setVisibleTopics] = useState<TopicVisibility[]>([]);
  const [visibleSubtopics, setVisibleSubtopics] = useState<SubtopicVisibility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  const { user } = useAuth();
  const { flags } = useFeatureFlags();
  const { 
    getAllUnlockedTopics, 
    isTopicActive, 
    getTopicDeadline 
  } = useTopicActivation();

  // Memoize the unlockAll flag value
  const unlockAllFlag = useMemo(() => flags?.unlockAll === true, [flags?.unlockAll]);

  const refreshVisibility = useCallback(async () => {
    // Prevent multiple simultaneous refreshes
    if (isLoading && hasInitialized) {
      console.log('TopicVisibilityContext: Refresh already in progress, skipping...');
      return;
    }

    // Only log during initial load, not on every call
    if (!hasInitialized) {
      console.log('TopicVisibilityContext: Initial visibility load...', { 
        user: !!user, 
        unlockAll: unlockAllFlag 
      });
    }
    
    setIsLoading(true);
    
    try {
      // Get all unlocked topics
      const unlockedTopicIndices = await getAllUnlockedTopics();
      
      // Calculate topic visibility
      const topicVisibilities: TopicVisibility[] = [];
      
      for (const topicConfig of AVAILABLE_TOPICS) {
        try {
          const isUnlocked = unlockedTopicIndices.includes(topicConfig.topicIndex);
          const isActive = await isTopicActive(topicConfig.topicKey, topicConfig.topicIndex);
          const deadline = await getTopicDeadline(topicConfig.topicKey, topicConfig.topicIndex);
          
          // Topic is visible if unlocked or if unlockAll feature flag is enabled
          const isVisible = isUnlocked || unlockAllFlag;
          
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
            isVisible: topicConfig.topicIndex === 0,
            isUnlocked: topicConfig.topicIndex === 0,
            isActive: false,
            deadline: null
          });
        }
      }
      
      console.log('TopicVisibilityContext: Setting visible topics:', topicVisibilities);
      setVisibleTopics(topicVisibilities);
      setVisibleSubtopics([]);
      
      if (!hasInitialized) {
        console.log('TopicVisibilityContext: Initial load complete');
        setHasInitialized(true);
      }
      
    } catch (error) {
      console.error('TopicVisibilityContext: Error calculating topic visibility:', error);
      
      // Provide fallback data
      const fallbackTopics: TopicVisibility[] = AVAILABLE_TOPICS.map(config => ({
        topicIndex: config.topicIndex,
        topicKey: config.topicKey,
        isVisible: config.topicIndex === 0,
        isUnlocked: config.topicIndex === 0,
        isActive: false,
        deadline: null
      }));
      
      setVisibleTopics(fallbackTopics);
      setVisibleSubtopics([]);
      setHasInitialized(true);
    } finally {
      console.log('TopicVisibilityContext: Refresh visibility complete, isLoading set to false');
      setIsLoading(false);
    }
  }, [user?.id, unlockAllFlag, hasInitialized]); // Remove functions from dependencies

  const getTopicVisibility = useCallback((topicIndex: number): TopicVisibility | null => {
    return visibleTopics.find(t => t.topicIndex === topicIndex) || null;
  }, [visibleTopics]);

  const getSubtopicVisibility = useCallback((topicIndex: number, dayIndex: number): SubtopicVisibility | null => {
    return visibleSubtopics.find(s => s.topicIndex === topicIndex && s.dayIndex === dayIndex) || null;
  }, [visibleSubtopics]);

  // Only fetch visibility data once when the component mounts or when user changes
  useEffect(() => {
    let isMounted = true;
    
    // Only refresh if we haven't initialized yet, or if the user authentication status changes
    if (!hasInitialized || (user !== undefined && !visibleTopics.length)) {
      console.log('TopicVisibilityContext: Triggering refresh from useEffect', { 
        hasInitialized, 
        userDefined: user !== undefined, 
        topicsLength: visibleTopics.length 
      });
      
      const doRefresh = async () => {
        if (isMounted) {
          try {
            // Get all unlocked topics
            const unlockedTopicIndices = await getAllUnlockedTopics();
            
            // Calculate topic visibility
            const topicVisibilities: TopicVisibility[] = [];
            
            for (const topicConfig of AVAILABLE_TOPICS) {
              try {
                const isUnlocked = unlockedTopicIndices.includes(topicConfig.topicIndex);
                const isActive = await isTopicActive(topicConfig.topicKey, topicConfig.topicIndex);
                const deadline = await getTopicDeadline(topicConfig.topicKey, topicConfig.topicIndex);
                
                // Topic is visible if unlocked or if unlockAll feature flag is enabled
                const isVisible = isUnlocked || unlockAllFlag;
                
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
                  isVisible: topicConfig.topicIndex === 0,
                  isUnlocked: topicConfig.topicIndex === 0,
                  isActive: false,
                  deadline: null
                });
              }
            }
            
            if (isMounted) {
              console.log('TopicVisibilityContext: Setting visible topics:', topicVisibilities);
              setVisibleTopics(topicVisibilities);
              setVisibleSubtopics([]);
              setIsLoading(false);
              setHasInitialized(true);
            }
          } catch (error) {
            console.error('TopicVisibilityContext: Error in initialization:', error);
            if (isMounted) {
              // Provide fallback data
              const fallbackTopics: TopicVisibility[] = AVAILABLE_TOPICS.map(config => ({
                topicIndex: config.topicIndex,
                topicKey: config.topicKey,
                isVisible: config.topicIndex === 0,
                isUnlocked: config.topicIndex === 0,
                isActive: false,
                deadline: null
              }));
              
              setVisibleTopics(fallbackTopics);
              setVisibleSubtopics([]);
              setIsLoading(false);
              setHasInitialized(true);
            }
          }
        }
      };
      
      doRefresh();
    }
    
    return () => {
      isMounted = false;
    };
  }, [user?.id, unlockAllFlag]); // Only depend on stable values

  // Memoize the context value
  const value = useMemo<TopicVisibilityContextValue>(() => ({
    visibleTopics,
    visibleSubtopics,
    isLoading,
    refreshVisibility,
    getTopicVisibility,
    getSubtopicVisibility
  }), [visibleTopics, visibleSubtopics, isLoading, refreshVisibility, getTopicVisibility, getSubtopicVisibility]);

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
