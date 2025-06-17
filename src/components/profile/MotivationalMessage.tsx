
import React from 'react';
import { Card } from '@/components/ui/card';
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
          message: "You're on fire! Your dedication is truly inspiring. Keep this amazing momentum going!",
          icon: Sparkles,
          color: "text-golden-yellow"
        };
      } else if (currentStreak >= 3) {
        return {
          message: "Great job today! You're building a solid practice habit. Stay consistent!",
          icon: Heart,
          color: "text-terracotta"
        };
      } else {
        return {
          message: "Wonderful work today! Every practice session brings you closer to mastery.",
          icon: Target,
          color: "text-sage-green"
        };
      }
    } else {
      if (currentStreak > 0) {
        return {
          message: "Don't break the streak! A quick practice session today will keep your momentum alive.",
          icon: Target,
          color: "text-terracotta"
        };
      } else {
        return {
          message: "Ready to start your tango journey today? Every expert was once a beginner!",
          icon: Sparkles,
          color: "text-deep-teal"
        };
      }
    }
  };

  const { message, icon: Icon, color } = getMotivationalMessage();

  return (
    <Card className="bg-gradient-to-r from-cream/80 to-sandy-beige/80 backdrop-blur-sm border-warm-brown/20 shadow-lg rounded-organic p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 bg-white/50 rounded-full flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
          <h3 className="font-display text-lg text-warm-brown mb-2">Daily Motivation</h3>
          <p className="text-mushroom leading-relaxed">{message}</p>
        </div>
      </div>
    </Card>
  );
};

export default MotivationalMessage;
