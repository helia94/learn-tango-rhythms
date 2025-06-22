
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
      if (!user) {
        setCompletedTasks({});
        setIsLoading(false);
        return;
      }

      try {
        const progressData = await getAllLatestAssignmentLevelByTopic(topicName, topicIndex);
        const progressMap: Record<string, number> = {};
        
        progressData.forEach(item => {
          progressMap[item.assignment_key] = item.level;
        });
        
        setCompletedTasks(progressMap);
      } catch (error) {
        console.error('Error loading assignment progress:', error);
        setCompletedTasks({});
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [user, topicName, topicIndex, getAllLatestAssignmentLevelByTopic]);

  const handleTaskLevelChange = (taskId: string, level: number) => {
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
