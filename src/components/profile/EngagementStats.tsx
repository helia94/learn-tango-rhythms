
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
      shapeColor: 'bg-terracotta/15'
    },
    {
      icon: Clock,
      label: 'Time',
      value: formatTime(totalTimeMinutes),
      color: 'text-burnt-orange',
      shapeColor: 'bg-burnt-orange/15'
    },
    {
      icon: BookOpen,
      label: 'Done',
      value: totalAssignments.toString(),
      color: 'text-warm-brown',
      shapeColor: 'bg-warm-brown/15'
    },
    {
      icon: TrendingUp,
      label: 'Days',
      value: `${activeDays}/30`,
      color: 'text-deep-teal',
      shapeColor: 'bg-deep-teal/15'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="relative bg-white/30 backdrop-blur-sm rounded-xl p-3 border border-warm-brown/10 overflow-hidden">
            {/* Organic geometric shapes */}
            <div className={`absolute -top-1 -right-1 w-6 h-6 ${stat.shapeColor} rounded-full transform rotate-45`} />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-sandy-beige/20 rounded-full" />
            
            <div className="relative flex items-center gap-2">
              <div className={`w-8 h-8 ${stat.shapeColor} rounded-full flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-warm-brown/80 -mt-1">{stat.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EngagementStats;
