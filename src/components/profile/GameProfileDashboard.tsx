
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
        // For now, we'll focus on the main topic since that's what's implemented
        const activeTopic = await getActiveTopic();
        if (activeTopic) {
          const assignments = await getAllLatestAssignmentLevelByTopic(activeTopic.topic_key, activeTopic.topic_index);
          
          const totalAssignments = 12; // Week one has 12 assignments
          const totalPossibleLevels = totalAssignments * 4; // 48 points total
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

  // Dynamic color system based on mastery percentage
  const getMasteryColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-emerald-500'; // High mastery - green
    if (percentage >= 60) return 'bg-yellow-500'; // Good mastery - yellow
    if (percentage >= 30) return 'bg-orange-500'; // Medium mastery - orange
    return 'bg-amber-800'; // Low mastery - brown
  };

  const getMasteryTextColor = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-600';
    if (percentage >= 60) return 'text-yellow-600';
    if (percentage >= 30) return 'text-orange-600';
    return 'text-amber-800';
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
    <div className="space-y-6 px-4 py-6">
      {/* Mastery Progress - Stacked Bar Chart Style */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-terracotta" />
          <h3 className="text-xl font-bold text-warm-brown">Topic Mastery</h3>
        </div>
        
        <div className="space-y-4">
          {topicsMastery.map((topic, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-warm-brown">{topic.topicName}</span>
                <span className={`text-2xl font-bold ${getMasteryTextColor(topic.masteryPercentage)}`}>
                  {topic.masteryPercentage}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
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
            <div className="text-center py-8 text-mushroom">
              <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No topics activated yet</p>
              <p className="text-xs">Start learning to see your progress!</p>
            </div>
          )}
        </div>
      </div>

      {/* Streaks Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Daily Streak */}
        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-4 border border-red-200/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <Flame className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {dailyStreak?.current_streak || 0}
              </div>
              <div className="text-xs text-red-700 font-medium">Daily Streak</div>
              <div className="text-xs text-red-600/80">
                Best: {dailyStreak?.longest_streak || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Streak */}
        <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {weeklyStreak?.current_streak || 0}
              </div>
              <div className="text-xs text-blue-700 font-medium">Weekly Streak</div>
              <div className="text-xs text-blue-600/80">
                Best: {weeklyStreak?.longest_streak || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Assignments Completed */}
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-4 border border-purple-200/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{totalAssignments}</div>
            <div className="text-sm text-purple-700 font-medium">Assignments Completed</div>
            <div className="text-xs text-purple-600/80">Any progress counts!</div>
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
        <h3 className="text-lg font-bold text-warm-brown mb-4">Monthly Activity</h3>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (29 - i));
            const dateStr = date.toISOString().split('T')[0];
            const dayData = engagementData.find(d => d.date === dateStr);
            const hasActivity = dayData && dayData.sessions_count > 0;
            
            return (
              <div
                key={i}
                className={`aspect-square rounded-sm transition-all duration-300 ${
                  hasActivity 
                    ? 'bg-emerald-500 scale-110' 
                    : 'bg-gray-200'
                }`}
                title={`${date.toLocaleDateString()}: ${dayData?.sessions_count || 0} sessions`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between text-xs text-mushroom">
          <span>Less active</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-gray-200" />
            <div className="w-3 h-3 rounded-sm bg-emerald-300" />
            <div className="w-3 h-3 rounded-sm bg-emerald-500" />
          </div>
          <span>More active</span>
        </div>
      </div>

      {/* Motivational Footer */}
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-terracotta/20 to-golden-yellow/20 rounded-full px-6 py-3 border border-terracotta/30">
          <span className="text-2xl">🎯</span>
          <span className="text-warm-brown font-medium">Keep going! Every step counts.</span>
        </div>
      </div>
    </div>
  );
};

export default GameProfileDashboard;
