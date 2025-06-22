
import { useState, useEffect } from 'react';
import { useAssignmentReporting } from './useAssignmentReporting';
import { useAuth } from '@/contexts/AuthContext';

export const useAssignmentProgressLoader = (topicName: string, topicIndex: number) => {
  const { user } = useAuth();
  const { getAllLatestAssignmentLevelByTopic } = useAssignmentReporting();
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      console.log('🔍 Loading progress for:', { topicName, topicIndex, user: user?.id });
      
      if (!user) {
        console.log('❌ No user found, skipping progress load');
        setCompletedTasks({});
        setIsLoading(false);
        return;
      }

      try {
        console.log('📊 Fetching assignment progress from database...');
        const progressData = await getAllLatestAssignmentLevelByTopic(topicName, topicIndex);
        console.log('📋 Raw progress data:', progressData);
        
        const progressMap: Record<string, number> = {};
        
        progressData.forEach(item => {
          console.log('➡️ Mapping assignment:', item.assignment_key, 'level:', item.level);
          progressMap[item.assignment_key] = item.level;
        });
        
        console.log('✅ Final progress map:', progressMap);
        setCompletedTasks(progressMap);
      } catch (error) {
        console.error('❌ Error loading assignment progress:', error);
        setCompletedTasks({});
      } finally {
        setIsLoading(false);
        console.log('🏁 Progress loading completed');
      }
    };

    loadProgress();
  }, [user, topicName, topicIndex, getAllLatestAssignmentLevelByTopic]);

  const handleTaskLevelChange = (taskId: string, level: number) => {
    console.log('🔄 Task level change:', taskId, 'new level:', level);
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
    }));
  };

  return {
    completedTasks,
    handleTaskLevelChange,
    isLoading
  };
};
