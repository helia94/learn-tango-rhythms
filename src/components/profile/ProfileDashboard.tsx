
import React, { useEffect } from 'react';
import { useEngagementData } from '@/hooks/useEngagementData';
import GameProfileDashboard from './GameProfileDashboard';

const ProfileDashboard: React.FC = () => {
  const { updateDailyEngagement } = useEngagementData();

  // Update engagement when component mounts (track page visit)
  useEffect(() => {
    updateDailyEngagement(1, 5, 0); // 1 session, 5 minutes, 0 assignments
  }, []);

  return <GameProfileDashboard />;
};

export default ProfileDashboard;
