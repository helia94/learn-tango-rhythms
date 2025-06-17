
import React from 'react';
import { Card } from '@/components/ui/card';
import { EngagementData } from '@/hooks/useEngagementData';

interface ActivityHeatmapProps {
  engagementData: EngagementData[];
}

const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ engagementData }) => {
  // Generate last 7 weeks (49 days) for a nice heatmap
  const generateDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 48; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    
    return days;
  };

  const days = generateDays();

  const getActivityLevel = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const dayData = engagementData.find(d => d.date === dateStr);
    
    if (!dayData || dayData.sessions_count === 0) return 0;
    if (dayData.sessions_count === 1) return 1;
    if (dayData.sessions_count <= 3) return 2;
    return 3;
  };

  const getActivityColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-100';
      case 1: return 'bg-sage-green/30';
      case 2: return 'bg-sage-green/60';
      case 3: return 'bg-sage-green';
      default: return 'bg-gray-100';
    }
  };

  const weeks = [];
  for (let i = 0; i < 7; i++) {
    weeks.push(days.slice(i * 7, (i + 1) * 7));
  }

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-6">
      <h3 className="font-display text-lg text-warm-brown mb-4">Activity Heatmap</h3>
      <div className="space-y-1">
        {dayLabels.map((label, dayIndex) => (
          <div key={label} className="flex items-center gap-1">
            <div className="w-8 text-xs text-mushroom">{label}</div>
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => {
                const day = week[dayIndex];
                if (!day) return <div key={weekIndex} className="w-3 h-3" />;
                
                const level = getActivityLevel(day);
                return (
                  <div
                    key={weekIndex}
                    className={`w-3 h-3 rounded-sm ${getActivityColor(level)} border border-gray-200`}
                    title={`${day.toLocaleDateString()}: ${level} activities`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 text-xs text-mushroom">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map(level => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm ${getActivityColor(level)} border border-gray-200`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </Card>
  );
};

export default ActivityHeatmap;
