
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface AssignmentProgressData {
  date: string;
  daily_completed: number;
  cumulative_total: number;
}

export const useAssignmentProgress = () => {
  const { user, profile } = useAuth();
  const [progressData, setProgressData] = useState<AssignmentProgressData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignmentProgress = async () => {
      if (!user || !profile) {
        setProgressData([]);
        setIsLoading(false);
        return;
      }

      try {
        // Use the new SQL function to get assignment progress timeline
        const { data, error } = await supabase.rpc('get_assignment_progress_timeline', {
          _user_id: user.id,
          _start_date: profile.created_at.split('T')[0] // Use membership start date
        });

        if (error) {
          console.error('Error fetching assignment progress:', error);
          setProgressData([]);
        } else {
          setProgressData(data || []);
        }
      } catch (error) {
        console.error('Error fetching assignment progress:', error);
        setProgressData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignmentProgress();
  }, [user, profile]);

  return {
    progressData,
    isLoading
  };
};
