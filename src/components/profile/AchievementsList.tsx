
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, Flame } from 'lucide-react';
import { AchievementData } from '@/hooks/useEngagementData';

interface AchievementsListProps {
  achievements: AchievementData[];
}

const AchievementsList: React.FC<AchievementsListProps> = ({ achievements }) => {
  // Sample achievement types with icons
  const getAchievementIcon = (key: string) => {
    if (key.includes('streak')) return Flame;
    if (key.includes('mastery')) return Star;
    if (key.includes('assignment')) return Target;
    return Trophy;
  };

  const getAchievementColor = (key: string) => {
    if (key.includes('streak')) return 'bg-terracotta text-white';
    if (key.includes('mastery')) return 'bg-golden-yellow text-warm-brown';
    if (key.includes('assignment')) return 'bg-sage-green text-white';
    return 'bg-deep-teal text-white';
  };

  // Show sample achievements if none exist
  const sampleAchievements = achievements.length === 0 ? [
    {
      achievement_key: 'first_session',
      achievement_name: 'First Steps',
      achievement_description: 'Complete your first practice session',
      earned_at: new Date().toISOString()
    }
  ] : [];

  const displayAchievements = achievements.length > 0 ? achievements : sampleAchievements;

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-6">
      <h3 className="font-display text-lg text-warm-brown mb-4">Achievements</h3>
      
      {displayAchievements.length === 0 ? (
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-mushroom">No achievements yet. Keep practicing!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayAchievements.slice(0, 5).map((achievement) => {
            const Icon = getAchievementIcon(achievement.achievement_key);
            const colorClass = getAchievementColor(achievement.achievement_key);
            
            return (
              <div key={achievement.achievement_key || 'sample'} className="flex items-center gap-3 p-3 bg-cream/50 rounded-lg">
                <div className={`w-10 h-10 ${colorClass} rounded-full flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-warm-brown">{achievement.achievement_name}</h4>
                  {achievement.achievement_description && (
                    <p className="text-sm text-mushroom">{achievement.achievement_description}</p>
                  )}
                </div>
                <Badge variant="outline" className="text-xs">
                  {new Date(achievement.earned_at).toLocaleDateString()}
                </Badge>
              </div>
            );
          })}
          
          {displayAchievements.length > 5 && (
            <div className="text-center">
              <Badge variant="secondary">
                +{displayAchievements.length - 5} more achievements
              </Badge>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default AchievementsList;
