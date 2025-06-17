
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useAssignmentReporting } from '@/hooks/useAssignmentReporting';
import { Target } from 'lucide-react';

const MasteryProgress: React.FC = () => {
  const { getAllLatestAssignmentLevelByTopic } = useAssignmentReporting();
  const [masteryData, setMasteryData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchMasteryData = async () => {
      try {
        const assignments = await getAllLatestAssignmentLevelByTopic('dancing-fast-slow', 0);
        
        const totalPossibleLevels = assignments.length * 4;
        const totalCurrentLevels = assignments.reduce((sum, a) => sum + a.level, 0);
        const masteryPercentage = totalPossibleLevels > 0 
          ? Math.round((totalCurrentLevels / totalPossibleLevels) * 100) 
          : 0;

        const chartData = [
          {
            topic: 'Fast & Slow',
            mastery: masteryPercentage,
            maxMastery: 100
          }
        ];

        setMasteryData(chartData);
      } catch (error) {
        console.error('Error fetching mastery data:', error);
      }
    };

    fetchMasteryData();
  }, [getAllLatestAssignmentLevelByTopic]);

  const chartConfig = {
    mastery: {
      label: "Mastery %",
      color: "#8B6F47"
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/20">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-terracotta" />
        <h3 className="text-sm font-bold text-warm-brown">Topic Mastery</h3>
      </div>
      <div className="h-32">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={masteryData}>
              <XAxis 
                dataKey="topic" 
                tick={{ fontSize: 10 }}
                interval={0}
                height={20}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
                width={25}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="mastery" 
                fill="var(--color-mastery)"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      {masteryData.length > 0 && (
        <div className="mt-2 text-center">
          <p className="text-xl font-bold text-terracotta">
            {masteryData[0].mastery}%
          </p>
          <p className="text-xs text-mushroom -mt-1">Overall</p>
        </div>
      )}
    </div>
  );
};

export default MasteryProgress;
