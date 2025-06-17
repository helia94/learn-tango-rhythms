
import React, { useEffect } from 'react';
import { useEngagementData } from '@/hooks/useEngagementData';
import { useAssignmentReporting } from '@/hooks/useAssignmentReporting';
import { useTopicActivation } from '@/hooks/useTopicActivation';
import { Flame, Calendar, TrendingUp, Target } from 'lucide-react';

const GameProfileDashboard: React.FC = () => {
  const {
    engagementData,
    streakData,
    isLoading,
    updateDailyEngagement
  } = useEngagementData();

  const { getAllLatestAssignmentLevelByTopic } = useAssignmentReporting();
  const { getActiveTopic } = useTopicActivation();
  const [topicsMastery, setTopicsMastery] = React.useState<Array<{
    topicName: string;
    masteryPercentage: number;
    totalAssignments: number;
  }>>([]);

  // Update engagement when component mounts
  useEffect(() => {
    updateDailyEngagement(1, 5, 0);
  }, []);

  // Calculate mastery for all activated topics
  useEffect(() => {
    const fetchAllTopicsMastery = async () => {
      try {
        const activeTopic = await getActiveTopic();
        if (activeTopic) {
          const assignments = await getAllLatestAssignmentLevelByTopic(activeTopic.topic_key, activeTopic.topic_index);
          
          const totalAssignments = 12;
          const totalPossibleLevels = totalAssignments * 4;
          const totalCurrentLevels = assignments.reduce((sum, a) => sum + a.level, 0);
          const completedAssignments = assignments.filter(a => a.level > 0).length;
          
          const percentage = totalPossibleLevels > 0 
            ? Math.round((totalCurrentLevels / totalPossibleLevels) * 100) 
            : 0;
          
          setTopicsMastery([{
            topicName: 'Fast & Slow Dancing',
            masteryPercentage: percentage,
            totalAssignments: completedAssignments
          }]);
        } else {
          setTopicsMastery([]);
        }
      } catch (error) {
        console.error('Error fetching topics mastery:', error);
      }
    };
    fetchAllTopicsMastery();
  }, [getAllLatestAssignmentLevelByTopic, getActiveTopic]);

  const getMasteryColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-emerald-500';
    if (percentage >= 60) return 'bg-golden-yellow';
    if (percentage >= 30) return 'bg-terracotta';
    return 'bg-warm-brown';
  };

  const getMasteryTextColor = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-600';
    if (percentage >= 60) return 'text-golden-yellow';
    if (percentage >= 30) return 'text-terracotta';
    return 'text-warm-brown';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 bg-terracotta/20 rounded-full animate-organic-pulse" />
      </div>
    );
  }

  const dailyStreak = streakData.find(s => s.streak_type === 'daily');
  const weeklyStreak = streakData.find(s => s.streak_type === 'weekly');
  const totalAssignments = topicsMastery.reduce((sum, topic) => sum + topic.totalAssignments, 0);

  return (
    <div className="space-y-4 px-2">
      {/* Topic Mastery */}
      <div className="relative bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-warm-brown/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-terracotta/20 rounded-full flex items-center justify-center">
            <Target className="w-5 h-5 text-terracotta" />
          </div>
          <h3 className="text-lg font-bold text-warm-brown">Topic Mastery</h3>
        </div>
        
        <div className="space-y-3">
          {topicsMastery.map((topic, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-warm-brown">{topic.topicName}</span>
                <span className={`text-2xl font-bold ${getMasteryTextColor(topic.masteryPercentage)}`}>
                  {topic.masteryPercentage}%
                </span>
              </div>
              
              <div className="w-full bg-sandy-beige/30 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full ${getMasteryColor(topic.masteryPercentage)} transition-all duration-1000 ease-out rounded-full`}
                  style={{ width: `${topic.masteryPercentage}%` }}
                />
              </div>
              
              <div className="text-xs text-mushroom text-right">
                {topic.totalAssignments} assignments completed
              </div>
            </div>
          ))}
          
          {topicsMastery.length === 0 && (
            <div className="text-center py-6 text-mushroom">
              <Target className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No topics activated yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Streaks */}
      <div className="grid grid-cols-2 gap-3">
        {/* Daily Streak */}
        <div className="relative bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-terracotta/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-terracotta/15 rounded-full flex items-center justify-center">
              <Flame className="w-5 h-5 text-terracotta" />
            </div>
            <div>
              <div className="text-2xl font-bold text-terracotta">
                {dailyStreak?.current_streak || 0}
              </div>
              <div className="text-xs text-warm-brown font-medium -mt-1">Daily</div>
              <div className="text-xs text-mushroom">
                Best: {dailyStreak?.longest_streak || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Streak */}
        <div className="relative bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-deep-teal/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-deep-teal/15 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-deep-teal" />
            </div>
            <div>
              <div className="text-2xl font-bold text-deep-teal">
                {weeklyStreak?.current_streak || 0}
              </div>
              <div className="text-xs text-warm-brown font-medium -mt-1">Weekly</div>
              <div className="text-xs text-mushroom">
                Best: {weeklyStreak?.longest_streak || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Assignments */}
      <div className="relative bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-warm-brown/15">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-warm-brown/15 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-warm-brown" />
          </div>
          <div>
            <div className="text-2xl font-bold text-warm-brown">{totalAssignments}</div>
            <div className="text-sm text-warm-brown font-medium">Assignments Done</div>
            <div className="text-xs text-mushroom">Keep it up!</div>
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-sandy-beige/20">
        <h3 className="text-sm font-bold text-warm-brown mb-3 text-center">Monthly Activity</h3>
        <div className="flex justify-center">
          <div className="grid grid-cols-7 gap-1.5 max-w-fit">
            {Array.from({ length: 28 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (27 - i));
              const dateStr = date.toISOString().split('T')[0];
              const dayData = engagementData.find(d => d.date === dateStr);
              
              let activityLevel = 0;
              if (dayData && dayData.sessions_count > 0) {
                if (dayData.sessions_count >= 3) activityLevel = 4;
                else if (dayData.sessions_count >= 2) activityLevel = 3;
                else if (dayData.sessions_count >= 1) activityLevel = 2;
                else activityLevel = 1;
              }
              
              const getActivityColor = (level: number) => {
                switch (level) {
                  case 0: return 'bg-sandy-beige/20';
                  case 1: return 'bg-sandy-beige/50';
                  case 2: return 'bg-caramel/60';
                  case 3: return 'bg-warm-brown/70';
                  case 4: return 'bg-warm-brown';
                  default: return 'bg-sandy-beige/20';
                }
              };
              
              return (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full ${getActivityColor(activityLevel)} transition-all duration-300`}
                  title={`${date.toLocaleDateString()}: ${dayData?.sessions_count || 0} sessions`}
                />
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-xs text-mushroom">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-sandy-beige/20" />
            <div className="w-3 h-3 rounded-full bg-sandy-beige/50" />
            <div className="w-3 h-3 rounded-full bg-caramel/60" />
            <div className="w-3 h-3 rounded-full bg-warm-brown/70" />
            <div className="w-3 h-3 rounded-full bg-warm-brown" />
          </div>
          <span className="text-xs text-mushroom">More</span>
        </div>
      </div>

      {/* Motivational Footer */}
      <div className="relative text-center py-3">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-terracotta/20">
          <span className="text-lg">🎯</span>
          <span className="text-warm-brown font-medium text-sm">Keep going! Every step counts.</span>
        </div>
      </div>
    </div>
  );
};

export default GameProfileDashboard;
