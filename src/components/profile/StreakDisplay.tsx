
import React from 'react';
import { Card } from '@/components/ui/card';
import { Flame, Calendar, Trophy } from 'lucide-react';
import { StreakData } from '@/hooks/useEngagementData';

interface StreakDisplayProps {
  streakData: StreakData[];
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ streakData }) => {
  const dailyStreak = streakData.find(s => s.streak_type === 'daily');
  const weeklyStreak = streakData.find(s => s.streak_type === 'weekly');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Daily Streak */}
      <Card className="bg-gradient-to-br from-terracotta/10 to-burnt-orange/10 border-terracotta/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-terracotta/20 rounded-full flex items-center justify-center">
            <Flame className="w-5 h-5 text-terracotta" />
          </div>
          <div>
            <h3 className="font-display text-lg text-warm-brown">Daily Streak</h3>
            <p className="text-sm text-mushroom">Consecutive days of practice</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-mushroom">Current</span>
            <span className="text-2xl font-bold text-terracotta">
              {dailyStreak?.current_streak || 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-mushroom">Best</span>
            <span className="text-lg font-semibold text-warm-brown">
              {dailyStreak?.longest_streak || 0}
            </span>
          </div>
        </div>
      </Card>

      {/* Weekly Streak */}
      <Card className="bg-gradient-to-br from-sage-green/10 to-deep-teal/10 border-sage-green/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-sage-green/20 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-sage-green" />
          </div>
          <div>
            <h3 className="font-display text-lg text-warm-brown">Weekly Streak</h3>
            <p className="text-sm text-mushroom">Consecutive weeks of practice</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-mushroom">Current</span>
            <span className="text-2xl font-bold text-sage-green">
              {weeklyStreak?.current_streak || 0}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-mushroom">Best</span>
            <span className="text-lg font-semibold text-warm-brown">
              {weeklyStreak?.longest_streak || 0}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StreakDisplay;
