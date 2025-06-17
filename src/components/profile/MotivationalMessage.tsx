
import React from 'react';
import { Sparkles, Heart, Target } from 'lucide-react';
import { StreakData, EngagementData } from '@/hooks/useEngagementData';

interface MotivationalMessageProps {
  streakData: StreakData[];
  engagementData: EngagementData[];
}

const MotivationalMessage: React.FC<MotivationalMessageProps> = ({ 
  streakData, 
  engagementData 
}) => {
  const dailyStreak = streakData.find(s => s.streak_type === 'daily');
  const todayActivity = engagementData.find(d => 
    d.date === new Date().toISOString().split('T')[0]
  );

  const getMotivationalMessage = () => {
    const currentStreak = dailyStreak?.current_streak || 0;
    const hasActivityToday = todayActivity && todayActivity.sessions_count > 0;

    if (hasActivityToday) {
      if (currentStreak >= 7) {
        return {
          message: "You're on fire! Your dedication is truly inspiring.",
          icon: Sparkles,
          color: "text-golden-yellow"
        };
      } else if (currentStreak >= 3) {
        return {
          message: "Great job today! Building solid habits.",
          icon: Heart,
          color: "text-terracotta"
        };
      } else {
        return {
          message: "Wonderful work! Every step counts.",
          icon: Target,
          color: "text-sage-green"
        };
      }
    } else {
      if (currentStreak > 0) {
        return {
          message: "Don't break the streak! Quick practice today?",
          icon: Target,
          color: "text-terracotta"
        };
      } else {
        return {
          message: "Ready to start your tango journey today?",
          icon: Sparkles,
          color: "text-deep-teal"
        };
      }
    }
  };

  const { message, icon: Icon, color } = getMotivationalMessage();

  return (
    <div className="bg-gradient-to-r from-cream/60 to-sandy-beige/60 backdrop-blur-sm border border-warm-brown/20 shadow-md rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-warm-brown mb-1">Daily Motivation</h3>
          <p className="text-xs text-mushroom leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default MotivationalMessage;
