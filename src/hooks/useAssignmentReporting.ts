
import { useState } from 'react';
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

export const useAssignmentReporting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const reportAssignmentLevel = async (
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
  };

  const getAssignmentReports = async (
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
  };

  const getLatestAssignmentLevel = async (
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
  };

  return {
    reportAssignmentLevel,
    getAssignmentReports,
    getLatestAssignmentLevel,
    isLoading
  };
};
