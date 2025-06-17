
import React from 'react';
import { Card } from '@/components/ui/card';
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
      label: 'Total Sessions',
      value: totalSessions.toString(),
      color: 'text-terracotta',
      bgColor: 'bg-terracotta/10'
    },
    {
      icon: Clock,
      label: 'Practice Time',
      value: formatTime(totalTimeMinutes),
      color: 'text-golden-yellow',
      bgColor: 'bg-golden-yellow/10'
    },
    {
      icon: BookOpen,
      label: 'Assignments Done',
      value: totalAssignments.toString(),
      color: 'text-sage-green',
      bgColor: 'bg-sage-green/10'
    },
    {
      icon: TrendingUp,
      label: 'Active Days',
      value: `${activeDays}/30`,
      color: 'text-deep-teal',
      bgColor: 'bg-deep-teal/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-mushroom">{stat.label}</p>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default EngagementStats;
