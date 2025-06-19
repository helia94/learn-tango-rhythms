
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAssignmentProgress, AssignmentProgressData } from '@/hooks/useAssignmentProgress';

const AssignmentProgressChart: React.FC = () => {
  const { t } = useTranslation();
  const { progressData, isLoading } = useAssignmentProgress();

  if (isLoading) {
    return (
      <div className="relative bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-warm-brown/15">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-warm-brown/15 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-warm-brown" />
          </div>
          <div>
            <div className="w-8 h-6 bg-warm-brown/20 rounded animate-pulse"></div>
            <div className="text-sm text-gray-800 font-medium">{t('profile.dashboard.assignmentsDone')}</div>
          </div>
        </div>
        <div className="h-16 bg-warm-brown/10 rounded animate-pulse"></div>
      </div>
    );
  }

  const totalAssignments = progressData.length > 0 ? progressData[progressData.length - 1].cumulative_total : 0;

  return (
    <div className="relative bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-warm-brown/15">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-warm-brown/15 rounded-full flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-warm-brown" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800">{totalAssignments}</div>
          <div className="text-sm text-gray-800 font-medium">{t('profile.dashboard.assignmentsDone')}</div>
        </div>
      </div>
      
      {progressData.length > 1 ? (
        <div className="h-16 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <XAxis 
                dataKey="date" 
                hide 
              />
              <YAxis hide />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as AssignmentProgressData;
                    return (
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 border border-warm-brown/20 shadow-lg">
                        <p className="text-xs text-gray-600">{new Date(label).toLocaleDateString()}</p>
                        <p className="text-sm font-semibold text-warm-brown">
                          Total: {data.cumulative_total}
                        </p>
                        {data.daily_completed > 0 && (
                          <p className="text-xs text-terracotta">
                            +{data.daily_completed} that day
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="cumulative_total" 
                stroke="#8B4513" 
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 3, fill: '#8B4513' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-xs text-gray-600 mt-2">{t('profile.dashboard.keepGoingShort')}</div>
      )}
    </div>
  );
};

export default AssignmentProgressChart;
