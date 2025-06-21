
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface AssignmentReport {
  id: string;
  user_id: string;
  topic_name: string;
  topic_index: number;
  assignment_key: string;
  level: number;
  created_at: string;
}

export interface AssignmentLevelSummary {
  assignment_key: string;
  level: number;
  last_updated: string;
}

export const useAssignmentReporting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const reportAssignmentLevel = useCallback(async (
    topicName: string,
    topicIndex: number,
    assignmentKey: string,
    level: number
  ) => {
    if (!user) {
      throw new Error('User must be logged in to report assignment level');
    }

    if (level < 0 || level > 4) {
      throw new Error('Level must be between 0 and 4');
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('assignment_reports')
        .insert({
          user_id: user.id,
          topic_name: topicName,
          topic_index: topicIndex,
          assignment_key: assignmentKey,
          level: level
        });

      if (error) {
        throw error;
      }

      console.log(`Assignment level reported: ${assignmentKey} = ${level}`);
    } catch (error) {
      console.error('Error reporting assignment level:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const getAssignmentReports = useCallback(async (
    topicName?: string,
    topicIndex?: number,
    assignmentKey?: string
  ): Promise<AssignmentReport[]> => {
    if (!user) {
      return [];
    }

    try {
      let query = supabase
        .from('assignment_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (topicName) {
        query = query.eq('topic_name', topicName);
      }

      if (topicIndex !== undefined) {
        query = query.eq('topic_index', topicIndex);
      }

      if (assignmentKey) {
        query = query.eq('assignment_key', assignmentKey);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching assignment reports:', error);
      return [];
    }
  }, [user]);

  const getLatestAssignmentLevel = useCallback(async (
    topicName: string,
    topicIndex: number,
    assignmentKey: string
  ): Promise<number> => {
    if (!user) {
      return 0;
    }

    try {
      const { data, error } = await supabase
        .from('assignment_reports')
        .select('level')
        .eq('user_id', user.id)
        .eq('topic_name', topicName)
        .eq('topic_index', topicIndex)
        .eq('assignment_key', assignmentKey)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        throw error;
      }

      return data && data.length > 0 ? data[0].level : 0;
    } catch (error) {
      console.error('Error fetching latest assignment level:', error);
      return 0;
    }
  }, [user]);

  const getAllLatestAssignmentLevelByTopic = useCallback(async (
    topicName: string,
    topicIndex: number
  ): Promise<AssignmentLevelSummary[]> => {
    if (!user) {
      return [];
    }

    try {
      // Get all assignment reports for the topic, ordered by creation date (latest first)
      const { data, error } = await supabase
        .from('assignment_reports')
        .select('assignment_key, level, created_at')
        .eq('user_id', user.id)
        .eq('topic_name', topicName)
        .eq('topic_index', topicIndex)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        return [];
      }

      // Group by assignment_key and get the latest level for each
      const latestLevels = new Map<string, AssignmentLevelSummary>();
      
      data.forEach(report => {
        if (!latestLevels.has(report.assignment_key)) {
          latestLevels.set(report.assignment_key, {
            assignment_key: report.assignment_key,
            level: report.level,
            last_updated: report.created_at
          });
        }
      });

      // Convert map to array and sort by assignment_key for consistent ordering
      return Array.from(latestLevels.values()).sort((a, b) => 
        a.assignment_key.localeCompare(b.assignment_key)
      );
    } catch (error) {
      console.error('Error fetching all latest assignment levels by topic:', error);
      return [];
    }
  }, [user]);

  return {
    reportAssignmentLevel,
    getAssignmentReports,
    getLatestAssignmentLevel,
    getAllLatestAssignmentLevelByTopic,
    isLoading
  };
};
