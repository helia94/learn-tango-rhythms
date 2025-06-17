
import React from 'react';
import { Clock, Target, TrendingUp, BookOpen } from 'lucide-react';
import { EngagementData } from '@/hooks/useEngagementData';

interface EngagementStatsProps {
  engagementData: EngagementData[];
}

const EngagementStats: React.FC<EngagementStatsProps> = ({ engagementData }) => {
  const totalSessions = engagementData.reduce((sum, day) => sum + day.sessions_count, 0);
  const totalTimeMinutes = engagementData.reduce((sum, day) => sum + day.time_spent_minutes, 0);
  const totalAssignments = engagementData.reduce((sum, day) => sum + day.assignments_completed, 0);
  const activeDays = engagementData.filter(day => day.sessions_count > 0).length;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const stats = [
    {
      icon: Target,
      label: 'Sessions',
      value: totalSessions.toString(),
      color: 'text-terracotta',
      bgColor: 'bg-terracotta/20'
    },
    {
      icon: Clock,
      label: 'Time',
      value: formatTime(totalTimeMinutes),
      color: 'text-golden-yellow',
      bgColor: 'bg-golden-yellow/20'
    },
    {
      icon: BookOpen,
      label: 'Done',
      value: totalAssignments.toString(),
      color: 'text-sage-green',
      bgColor: 'bg-sage-green/20'
    },
    {
      icon: TrendingUp,
      label: 'Days',
      value: `${activeDays}/30`,
      color: 'text-deep-teal',
      bgColor: 'bg-deep-teal/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md border border-white/20">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-mushroom -mt-1">{stat.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EngagementStats;
