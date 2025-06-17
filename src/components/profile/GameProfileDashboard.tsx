import React, { useEffect } from 'react';
import { useEngagementData } from '@/hooks/useEngagementData';
import { useAssignmentReporting } from '@/hooks/useAssignmentReporting';
import { Flame, Target, Trophy, Sparkles, TrendingUp } from 'lucide-react';

const GameProfileDashboard: React.FC = () => {
  const {
    engagementData,
    streakData,
    achievements,
    isLoading,
    updateDailyEngagement
  } = useEngagementData();

  const { getAllLatestAssignmentLevelByTopic } = useAssignmentReporting();
  const [masteryPercentage, setMasteryPercentage] = React.useState(0);

  // Update engagement when component mounts
  useEffect(() => {
    updateDailyEngagement(1, 5, 0);
  }, []);

  // Calculate mastery
  useEffect(() => {
    const fetchMastery = async () => {
      try {
        const assignments = await getAllLatestAssignmentLevelByTopic('dancing-fast-slow', 0);
        
        // Fixed calculation: Week one has 12 assignments total
        const totalAssignments = 12;
        const totalPossibleLevels = totalAssignments * 4; // 48 points total
        const totalCurrentLevels = assignments.reduce((sum, a) => sum + a.level, 0);
        
        const percentage = totalPossibleLevels > 0 
          ? Math.round((totalCurrentLevels / totalPossibleLevels) * 100) 
          : 0;
        
        console.log(`Mastery calculation: ${totalCurrentLevels} / ${totalPossibleLevels} = ${percentage}%`);
        setMasteryPercentage(percentage);
      } catch (error) {
        console.error('Error fetching mastery:', error);
      }
    };
    fetchMastery();
  }, [getAllLatestAssignmentLevelByTopic]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 bg-terracotta/20 rounded-full animate-organic-pulse" />
      </div>
    );
  }

  const dailyStreak = streakData.find(s => s.streak_type === 'daily');
  const totalSessions = engagementData.reduce((sum, day) => sum + day.sessions_count, 0);
  const todayActivity = engagementData.find(d => 
    d.date === new Date().toISOString().split('T')[0]
  );

  // Top 5 most relevant things to show
  const topItems = [
    {
      type: 'streak',
      value: dailyStreak?.current_streak || 0,
      icon: Flame,
      color: 'terracotta',
      label: 'Day Streak',
      isMain: true
    },
    {
      type: 'mastery',
      value: masteryPercentage,
      icon: Target,
      color: 'sage-green',
      label: 'Mastery',
      isMain: true
    },
    {
      type: 'sessions',
      value: totalSessions,
      icon: TrendingUp,
      color: 'golden-yellow',
      label: 'Sessions',
      isMain: false
    },
    {
      type: 'achievements',
      value: achievements.length,
      icon: Trophy,
      color: 'deep-teal',
      label: 'Badges',
      isMain: false
    }
  ];

  const getMotivationalEmoji = () => {
    const streak = dailyStreak?.current_streak || 0;
    if (streak >= 7) return '🔥';
    if (streak >= 3) return '⭐';
    if (todayActivity?.sessions_count > 0) return '🎯';
    return '🚀';
  };

  return (
    <div className="space-y-8">
      {/* Main Hero Visual */}
      <div className="relative">
        <div className="bg-gradient-to-br from-terracotta/20 via-golden-yellow/10 to-sage-green/20 rounded-3xl p-8 backdrop-blur-sm border border-warm-brown/10">
          <div className="flex items-center justify-center mb-6">
            <div className="text-6xl animate-organic-pulse">
              {getMotivationalEmoji()}
            </div>
          </div>
          
          {/* Main Stats Circle */}
          <div className="flex justify-center items-center gap-8">
            {topItems.filter(item => item.isMain).map((item) => {
              const Icon = item.icon;
              const circumference = 2 * Math.PI * 35;
              const strokeDasharray = item.type === 'mastery' 
                ? `${(item.value / 100) * circumference} ${circumference}`
                : `${Math.min(item.value / 30, 1) * circumference} ${circumference}`;
              
              return (
                <div key={item.type} className="relative">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={strokeDasharray}
                      className={`text-${item.color} transition-all duration-1000`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Icon className={`w-6 h-6 text-${item.color} mb-1`} />
                    <span className={`text-xl font-bold text-${item.color}`}>
                      {item.value}{item.type === 'mastery' ? '%' : ''}
                    </span>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xs text-mushroom font-medium">{item.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 gap-4">
        {topItems.filter(item => !item.isMain).map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.type} className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-warm-brown/10">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-${item.color}/20 rounded-full flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${item.color}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold text-${item.color}`}>{item.value}</div>
                  <div className="text-xs text-mushroom">{item.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Achievement Badge */}
      {achievements.length > 0 && (
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-golden-yellow/20 to-terracotta/20 rounded-full px-6 py-3 border border-golden-yellow/30">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-golden-yellow" />
              <span className="text-warm-brown font-medium">
                Latest: {achievements[0].achievement_name}
              </span>
              <Sparkles className="w-4 h-4 text-terracotta" />
            </div>
          </div>
        </div>
      )}

      {/* Quick Activity Dots */}
      <div className="flex justify-center">
        <div className="flex gap-1">
          {Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            const dateStr = date.toISOString().split('T')[0];
            const dayData = engagementData.find(d => d.date === dateStr);
            const hasActivity = dayData && dayData.sessions_count > 0;
            
            return (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  hasActivity 
                    ? 'bg-sage-green scale-110 shadow-lg' 
                    : 'bg-gray-200'
                }`}
                title={date.toLocaleDateString()}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameProfileDashboard;
