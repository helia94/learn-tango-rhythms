
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface EngagementData {
  id: string;
  user_id: string;
  date: string;
  sessions_count: number;
  time_spent_minutes: number;
  assignments_completed: number;
  created_at: string;
  updated_at: string;
}

export interface StreakData {
  id: string;
  user_id: string;
  streak_type: 'daily' | 'weekly';
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  created_at: string;
  updated_at: string;
}

export interface AchievementData {
  id: string;
  user_id: string;
  achievement_key: string;
  achievement_name: string;
  achievement_description: string | null;
  earned_at: string;
}

export const useEngagementData = () => {
  const { user } = useAuth();
  const [engagementData, setEngagementData] = useState<EngagementData[]>([]);
  const [streakData, setStreakData] = useState<StreakData[]>([]);
  const [achievements, setAchievements] = useState<AchievementData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEngagementData = async () => {
    if (!user) return;

    try {
      // Fetch last 30 days of engagement data
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: engagement, error: engagementError } = await supabase
        .from('user_engagement')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
        .order('date', { ascending: false });

      if (engagementError) throw engagementError;
      setEngagementData(engagement || []);

      // Fetch streak data
      const { data: streaks, error: streakError } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id);

      if (streakError) throw streakError;
      setStreakData((streaks || []).map(streak => ({
        ...streak,
        streak_type: streak.streak_type as 'daily' | 'weekly'
      })));

      // Fetch achievements
      const { data: userAchievements, error: achievementError } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      if (achievementError) throw achievementError;
      setAchievements(userAchievements || []);

    } catch (error) {
      console.error('Error fetching engagement data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateDailyEngagement = async (
    sessionIncrement = 1,
    timeIncrement = 0,
    assignmentsIncrement = 0
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase.rpc('update_daily_engagement', {
        _user_id: user.id,
        _session_increment: sessionIncrement,
        _time_increment: timeIncrement,
        _assignments_increment: assignmentsIncrement
      });

      if (error) throw error;

      // Update streaks
      const { error: streakError } = await supabase.rpc('update_user_streaks', {
        _user_id: user.id
      });

      if (streakError) throw streakError;

      // Refresh data
      await fetchEngagementData();
    } catch (error) {
      console.error('Error updating engagement:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchEngagementData();
    }
  }, [user]);

  return {
    engagementData,
    streakData,
    achievements,
    isLoading,
    updateDailyEngagement,
    refreshData: fetchEngagementData
  };
};
