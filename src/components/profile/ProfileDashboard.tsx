
import React, { useEffect } from 'react';
import { useEngagementData } from '@/hooks/useEngagementData';
import StreakDisplay from './StreakDisplay';
import ActivityHeatmap from './ActivityHeatmap';
import EngagementStats from './EngagementStats';
import MasteryProgress from './MasteryProgress';
import AchievementsList from './AchievementsList';
import MotivationalMessage from './MotivationalMessage';

const ProfileDashboard: React.FC = () => {
  const {
    engagementData,
    streakData,
    achievements,
    isLoading,
    updateDailyEngagement
  } = useEngagementData();

  // Update engagement when component mounts (track page visit)
  useEffect(() => {
    updateDailyEngagement(1, 5, 0); // 1 session, 5 minutes, 0 assignments
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse h-32 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Motivational Message */}
      <MotivationalMessage 
        streakData={streakData}
        engagementData={engagementData}
      />

      {/* Streaks */}
      <StreakDisplay streakData={streakData} />

      {/* Stats Overview */}
      <EngagementStats engagementData={engagementData} />

      {/* Charts and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MasteryProgress />
        <ActivityHeatmap engagementData={engagementData} />
      </div>

      {/* Achievements */}
      <AchievementsList achievements={achievements} />
    </div>
  );
};

export default ProfileDashboard;
