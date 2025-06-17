
import React from 'react';
import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useAssignmentReporting } from '@/hooks/useAssignmentReporting';

const MasteryProgress: React.FC = () => {
  const { getAllLatestAssignmentLevelByTopic } = useAssignmentReporting();
  const [masteryData, setMasteryData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchMasteryData = async () => {
      try {
        const assignments = await getAllLatestAssignmentLevelByTopic('dancing-fast-slow', 0);
        
        // Calculate mastery percentage
        const totalPossibleLevels = assignments.length * 4; // Assuming max level is 4
        const totalCurrentLevels = assignments.reduce((sum, a) => sum + a.level, 0);
        const masteryPercentage = totalPossibleLevels > 0 
          ? Math.round((totalCurrentLevels / totalPossibleLevels) * 100) 
          : 0;

        // Create chart data
        const chartData = [
          {
            topic: 'Fast & Slow Dancing',
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
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-6">
      <h3 className="font-display text-lg text-warm-brown mb-4">Topic Mastery</h3>
      <div className="h-64">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={masteryData}>
              <XAxis 
                dataKey="topic" 
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="mastery" 
                fill="var(--color-mastery)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      {masteryData.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold text-terracotta">
            {masteryData[0].mastery}%
          </p>
          <p className="text-sm text-mushroom">Overall Mastery</p>
        </div>
      )}
    </Card>
  );
};

export default MasteryProgress;
