
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LeaderboardEntry {
  id: string;
  player_name: string;
  city: string | null;
  score: number;
  max_possible_score: number;
  created_at: string;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        toast({
          title: "Error",
          description: "Failed to load leaderboard data",
          variant: "destructive",
        });
        return;
      }

      setLeaderboardData(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast({
        title: "Error",
        description: "Failed to load leaderboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-golden-yellow" />;
      case 2:
        return <Medal className="w-6 h-6 text-mushroom" />;
      case 3:
        return <Award className="w-6 h-6 text-burnt-orange" />;
      default:
        return <span className="font-body font-semibold text-lg text-warm-brown">#{rank}</span>;
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-terracotta', 'bg-burnt-orange', 'bg-sage-green', 'bg-deep-teal', 
      'bg-dusty-rose', 'bg-golden-yellow', 'bg-warm-brown', 'bg-paprika'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate('/')} className="font-body">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Rhythm Grid
            </Button>
            <h1 className="boho-title text-2xl font-display">Leaderboard</h1>
          </div>
          <div className="text-center boho-subtitle">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="font-body">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Rhythm Grid
          </Button>
          <h1 className="boho-title text-2xl font-display">Leaderboard</h1>
        </div>

        {/* Leaderboard */}
        <Card className="boho-panel">
          <CardHeader>
            <CardTitle className="boho-title text-xl text-center font-display">Top Players</CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboardData.length === 0 ? (
              <div className="text-center py-8">
                <p className="boho-subtitle text-warm-brown mb-4">No scores yet! Be the first to complete the quiz.</p>
                <Button 
                  onClick={() => navigate('/quiz')} 
                  className="boho-button"
                >
                  Start Quiz
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboardData.map((entry, index) => {
                  const rank = index + 1;
                  const percentage = Math.round((entry.score / entry.max_possible_score) * 100);
                  
                  return (
                    <div 
                      key={entry.id} 
                      className={`flex items-center gap-4 p-4 rounded-xl border ${
                        rank <= 3 ? 'boho-panel' : 'bg-cream/50 border-warm-brown/20'
                      }`}
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(rank)}
                      </div>

                      {/* Avatar */}
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className={`${getAvatarColor(entry.player_name)} text-cream font-body font-semibold`}>
                          {getInitials(entry.player_name)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Player Info */}
                      <div className="flex-1">
                        <div className="font-body font-semibold text-lg text-warm-brown">{entry.player_name}</div>
                        {entry.city && (
                          <div className="text-sm text-mushroom">{entry.city}</div>
                        )}
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className="font-body font-bold text-xl text-burnt-orange">{entry.score}/{entry.max_possible_score}</div>
                        <div className="text-sm text-warm-brown">{percentage}%</div>
                      </div>

                      {/* Date */}
                      <div className="text-sm text-mushroom w-24 text-right">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Call to Action */}
        {leaderboardData.length > 0 && (
          <div className="text-center mt-8">
            <Button 
              onClick={() => navigate('/quiz')} 
              className="boho-button text-lg px-8 py-4"
            >
              Try to Beat the Top Score!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
