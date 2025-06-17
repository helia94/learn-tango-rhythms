
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
      <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-terracotta/20 overflow-hidden">
        {/* Organic geometric shape */}
        <div className="absolute -top-2 -right-2 w-12 h-12 bg-terracotta/15 rounded-full transform rotate-12" />
        <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-burnt-orange/10 rounded-full" />
        
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-terracotta/20 rounded-full flex items-center justify-center">
            <Flame className="w-5 h-5 text-terracotta" />
          </div>
          <div>
            <div className="text-2xl font-bold text-terracotta">
              {dailyStreak?.current_streak || 0}
            </div>
            <div className="text-xs text-warm-brown font-medium -mt-1">Daily Streak</div>
            <div className="text-xs text-warm-brown/70">
              Best: {dailyStreak?.longest_streak || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Streak */}
      <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-deep-teal/20 overflow-hidden">
        {/* Organic geometric shape */}
        <div className="absolute -top-1 -right-3 w-10 h-10 bg-deep-teal/15 rounded-full transform -rotate-12" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-sage-green/10 rounded-full" />
        
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-deep-teal/20 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-deep-teal" />
          </div>
          <div>
            <div className="text-2xl font-bold text-deep-teal">
              {weeklyStreak?.current_streak || 0}
            </div>
            <div className="text-xs text-warm-brown font-medium -mt-1">Weekly Streak</div>
            <div className="text-xs text-warm-brown/70">
              Best: {weeklyStreak?.longest_streak || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakDisplay;
