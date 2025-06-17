
import React from 'react';
import { Flame, Calendar } from 'lucide-react';
import { StreakData } from '@/hooks/useEngagementData';

interface StreakDisplayProps {
  streakData: StreakData[];
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ streakData }) => {
  const dailyStreak = streakData.find(s => s.streak_type === 'daily');
  const weeklyStreak = streakData.find(s => s.streak_type === 'weekly');

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Daily Streak */}
      <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-3 border border-red-200/30">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center">
            <Flame className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <div className="text-lg font-bold text-red-600">
              {dailyStreak?.current_streak || 0}
            </div>
            <div className="text-xs text-red-700 font-medium -mt-1">Daily Streak</div>
          </div>
        </div>
        <div className="text-xs text-red-600/80">
          Best: {dailyStreak?.longest_streak || 0}
        </div>
      </div>

      {/* Weekly Streak */}
      <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-2xl p-3 border border-blue-200/30">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {weeklyStreak?.current_streak || 0}
            </div>
            <div className="text-xs text-blue-700 font-medium -mt-1">Weekly Streak</div>
          </div>
        </div>
        <div className="text-xs text-blue-600/80">
          Best: {weeklyStreak?.longest_streak || 0}
        </div>
      </div>
    </div>
  );
};

export default StreakDisplay;
