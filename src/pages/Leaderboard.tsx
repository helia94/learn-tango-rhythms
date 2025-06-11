
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
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="font-pixel text-lg text-muted-foreground">#{rank}</span>;
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 pixelated">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate('/')} className="font-pixel">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Rhythm Grid
            </Button>
            <h1 className="font-pixel text-2xl text-foreground">Leaderboard</h1>
          </div>
          <div className="text-center font-pixel">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 pixelated">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="font-pixel">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Rhythm Grid
          </Button>
          <h1 className="font-pixel text-2xl text-foreground">Leaderboard</h1>
        </div>

        {/* Leaderboard */}
        <Card className="game-panel">
          <CardHeader>
            <CardTitle className="font-pixel text-xl text-center">Top Players</CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboardData.length === 0 ? (
              <div className="text-center py-8">
                <p className="font-pixel text-muted-foreground">No scores yet! Be the first to complete the quiz.</p>
                <Button 
                  onClick={() => navigate('/quiz')} 
                  className="font-pixel mt-4"
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
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        rank <= 3 ? 'bg-muted/50' : 'bg-background'
                      }`}
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(rank)}
                      </div>

                      {/* Avatar */}
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className={`${getAvatarColor(entry.player_name)} text-white font-pixel`}>
                          {getInitials(entry.player_name)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Player Info */}
                      <div className="flex-1">
                        <div className="font-pixel text-lg">{entry.player_name}</div>
                        {entry.city && (
                          <div className="text-sm text-muted-foreground">{entry.city}</div>
                        )}
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className="font-pixel text-xl">{entry.score}/{entry.max_possible_score}</div>
                        <div className="text-sm text-muted-foreground">{percentage}%</div>
                      </div>

                      {/* Date */}
                      <div className="text-sm text-muted-foreground w-24 text-right">
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
              className="font-pixel text-lg px-8 py-4"
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
