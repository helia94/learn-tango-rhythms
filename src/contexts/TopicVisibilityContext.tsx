
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTopicActivation } from '@/hooks/useTopicActivation';
import { useDailyTopicActivation } from '@/hooks/useDailyTopicActivation';
import { supabase } from '@/integrations/supabase/client';

interface TopicVisibility {
  key: string;
  isVisible: boolean;
  isUnlocked: boolean;
  isActive: boolean;
  activationDate: Date | null;
  deadline: Date | null;
  canActivate: boolean;
}

interface DailyVisibility {
  topicKey: string;
  dayNumber: number;
  isVisible: boolean;
  isUnlocked: boolean;
  canUnlock: boolean;
}

interface TopicVisibilityContextType {
  // Topic visibility
  getTopicVisibility: (topicKey: string, topicIndex: number) => TopicVisibility;
  getAllVisibleTopics: () => string[];
  
  // Daily visibility
  getDailyVisibility: (topicKey: string, topicIndex: number, dayNumber: number) => DailyVisibility;
  getVisibleDailiesForTopic: (topicKey: string, topicIndex: number) => number[];
  
  // Actions
  activateTopic: (topicKey: string, topicIndex: number) => Promise<void>;
  unlockNextTopic: (currentTopicIndex: number) => Promise<void>;
  
  // State
  loading: boolean;
  refreshVisibility: () => Promise<void>;
}

const TopicVisibilityContext = createContext<TopicVisibilityContextType | undefined>(undefined);

export const useTopicVisibility = () => {
  const context = useContext(TopicVisibilityContext);
  if (context === undefined) {
    throw new Error('useTopicVisibility must be used within a TopicVisibilityProvider');
  }
  return context;
};

// Define all topics in order
const ALL_TOPICS = [
  { key: 'dancing-fast-slow', index: 0, totalDays: 7 },
  { key: 'dancing-small-big', index: 1, totalDays: 7 },
  { key: 'dancing-high-low', index: 2, totalDays: 5 },
  { key: 'dancing-circular-linear', index: 3, totalDays: 3 },
  { key: 'dancing-with-without-control', index: 4, totalDays: 4 },
  // Add more topics as they're implemented
];

interface TopicVisibilityProviderProps {
  children: ReactNode;
}

export const TopicVisibilityProvider: React.FC<TopicVisibilityProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const { isTopicActive, getTopicDeadline, activateTopic: activateTopicHook } = useTopicActivation();
  const [loading, setLoading] = useState(true);
  const [unlockedTopics, setUnlockedTopics] = useState<Set<number>>(new Set([0])); // First topic always unlocked
  const [activeTopics, setActiveTopics] = useState<Map<number, Date>>(new Map());
  const [topicDeadlines, setTopicDeadlines] = useState<Map<number, Date>>(new Map());

  // Fetch user's unlocked topics
  const fetchUnlockedTopics = async () => {
    if (!user) {
      setUnlockedTopics(new Set([0])); // Only first topic visible for non-logged users
      return;
    }

    try {
      // Get all topic activations for this user
      const { data: activations, error } = await supabase
        .from('topic_activations')
        .select('topic_index, activated_at')
        .eq('user_id', user.id)
        .order('topic_index');

      if (error) {
        console.error('Error fetching topic activations:', error);
        return;
      }

      const unlocked = new Set([0]); // First topic always unlocked
      const active = new Map<number, Date>();
      const deadlines = new Map<number, Date>();

      // Process activations to determine unlocked topics
      for (const activation of activations || []) {
        const activationDate = new Date(activation.activated_at);
        const deadline = new Date(activationDate);
        deadline.setDate(deadline.getDate() + 7);

        // Topic becomes unlocked when activated
        unlocked.add(activation.topic_index);

        // Check if topic is still active
        const now = new Date();
        if (now <= deadline) {
          active.set(activation.topic_index, activationDate);
          deadlines.set(activation.topic_index, deadline);
        } else {
          // Topic expired, unlock next topic
          const nextTopicIndex = activation.topic_index + 1;
          if (nextTopicIndex < ALL_TOPICS.length) {
            unlocked.add(nextTopicIndex);
          }
        }
      }

      setUnlockedTopics(unlocked);
      setActiveTopics(active);
      setTopicDeadlines(deadlines);
    } catch (error) {
      console.error('Error fetching unlocked topics:', error);
    }
  };

  // Initialize and refresh data
  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await fetchUnlockedTopics();
      setLoading(false);
    };

    initialize();
  }, [user]);

  const getTopicVisibility = (topicKey: string, topicIndex: number): TopicVisibility => {
    if (!user) {
      // Non-logged users see first 4 topics
      return {
        key: topicKey,
        isVisible: topicIndex < 4,
        isUnlocked: topicIndex === 0, // Only first topic unlocked
        isActive: false,
        activationDate: null,
        deadline: null,
        canActivate: topicIndex === 0
      };
    }

    const isUnlocked = unlockedTopics.has(topicIndex);
    const isActive = activeTopics.has(topicIndex);
    const activationDate = activeTopics.get(topicIndex) || null;
    const deadline = topicDeadlines.get(topicIndex) || null;

    return {
      key: topicKey,
      isVisible: isUnlocked,
      isUnlocked,
      isActive,
      activationDate,
      deadline,
      canActivate: isUnlocked && !isActive
    };
  };

  const getAllVisibleTopics = (): string[] => {
    if (!user) {
      // Non-logged users see first 4 topics
      return ALL_TOPICS.slice(0, 4).map(topic => topic.key);
    }

    return ALL_TOPICS
      .filter(topic => unlockedTopics.has(topic.index))
      .map(topic => topic.key);
  };

  const getDailyVisibility = (topicKey: string, topicIndex: number, dayNumber: number): DailyVisibility => {
    if (!user) {
      // Non-logged users don't see daily topics
      return {
        topicKey,
        dayNumber,
        isVisible: false,
        isUnlocked: false,
        canUnlock: false
      };
    }

    const topicVisibility = getTopicVisibility(topicKey, topicIndex);
    
    if (!topicVisibility.isUnlocked) {
      return {
        topicKey,
        dayNumber,
        isVisible: false,
        isUnlocked: false,
        canUnlock: false
      };
    }

    // Use the existing daily topic activation hook logic
    // This is a simplified version - the actual logic is in useDailyTopicActivation
    const isActive = topicVisibility.isActive;
    
    return {
      topicKey,
      dayNumber,
      isVisible: true,
      isUnlocked: true, // Simplified - real logic in useDailyTopicActivation
      canUnlock: isActive // Can only unlock new dailies if topic is active
    };
  };

  const getVisibleDailiesForTopic = (topicKey: string, topicIndex: number): number[] => {
    if (!user) {
      return []; // Non-logged users don't see dailies
    }

    const topicVisibility = getTopicVisibility(topicKey, topicIndex);
    if (!topicVisibility.isUnlocked) {
      return [];
    }

    const topicConfig = ALL_TOPICS.find(t => t.key === topicKey);
    if (!topicConfig) {
      return [];
    }

    // Return all days for now - real filtering happens in useDailyTopicActivation
    return Array.from({ length: topicConfig.totalDays }, (_, i) => i + 1);
  };

  const activateTopic = async (topicKey: string, topicIndex: number) => {
    if (!user) {
      throw new Error('User must be logged in to activate topics');
    }

    await activateTopicHook(topicKey, topicIndex);
    await refreshVisibility();
  };

  const unlockNextTopic = async (currentTopicIndex: number) => {
    if (!user) {
      return;
    }

    const nextTopicIndex = currentTopicIndex + 1;
    if (nextTopicIndex >= ALL_TOPICS.length) {
      return; // No more topics to unlock
    }

    // Add next topic to unlocked set
    const newUnlocked = new Set(unlockedTopics);
    newUnlocked.add(nextTopicIndex);
    setUnlockedTopics(newUnlocked);
  };

  const refreshVisibility = async () => {
    await fetchUnlockedTopics();
  };

  const value = {
    getTopicVisibility,
    getAllVisibleTopics,
    getDailyVisibility,
    getVisibleDailiesForTopic,
    activateTopic,
    unlockNextTopic,
    loading,
    refreshVisibility
  };

  return (
    <TopicVisibilityContext.Provider value={value}>
      {children}
    </TopicVisibilityContext.Provider>
  );
};
