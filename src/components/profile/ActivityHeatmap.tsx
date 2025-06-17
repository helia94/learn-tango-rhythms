
import React from 'react';
import { EngagementData } from '@/hooks/useEngagementData';

interface ActivityHeatmapProps {
  engagementData: EngagementData[];
}

const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ engagementData }) => {
  // Generate last 4 weeks (28 days) for a compact heatmap
  const generateDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 27; i >= 0; i--) {
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
      case 0: return 'bg-sandy-beige/30';
      case 1: return 'bg-sandy-beige/60';
      case 2: return 'bg-caramel/60';
      case 3: return 'bg-warm-brown';
      default: return 'bg-sandy-beige/30';
    }
  };

  const weeks = [];
  for (let i = 0; i < 4; i++) {
    weeks.push(days.slice(i * 7, (i + 1) * 7));
  }

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/20">
      <h3 className="text-sm font-bold text-warm-brown mb-3 text-center">4-Week Activity</h3>
      <div className="space-y-1">
        {dayLabels.map((label, dayIndex) => (
          <div key={label} className="flex items-center gap-1">
            <div className="w-4 text-xs text-mushroom font-medium">{label}</div>
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => {
                const day = week[dayIndex];
                if (!day) return <div key={weekIndex} className="w-2.5 h-2.5" />;
                
                const level = getActivityLevel(day);
                return (
                  <div
                    key={weekIndex}
                    className={`w-2.5 h-2.5 rounded-sm ${getActivityColor(level)} transition-all duration-200`}
                    title={`${day.toLocaleDateString()}: ${level} sessions`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 text-xs text-mushroom">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map(level => (
            <div
              key={level}
              className={`w-2 h-2 rounded-sm ${getActivityColor(level)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
