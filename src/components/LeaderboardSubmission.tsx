
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface LeaderboardSubmissionProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  maxScore: number;
}

const LeaderboardSubmission = ({ isOpen, onClose, score, maxScore }: LeaderboardSubmissionProps) => {
  const [playerName, setPlayerName] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leaderboard')
        .insert({
          player_name: playerName.trim(),
          city: city.trim() || null,
          score: score,
          max_possible_score: maxScore
        });

      if (error) {
        console.error('Error submitting score:', error);
        toast({
          title: "Error",
          description: "Failed to submit your score. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Your score has been added to the leaderboard!",
      });

      onClose();
      
      // Navigate to leaderboard after a short delay
      setTimeout(() => {
        navigate('/leaderboard');
      }, 1000);

    } catch (error) {
      console.error('Error submitting score:', error);
      toast({
        title: "Error",
        description: "Failed to submit your score. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onClose();
    navigate('/leaderboard');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-pixel text-xl text-center">
            🎉 Quiz Complete! 🎉
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-6">
          <div className="font-pixel text-2xl mb-2">Final Score</div>
          <div className="font-pixel text-4xl text-berlin-orange">
            {score}/{maxScore}
          </div>
          <div className="text-lg text-muted-foreground">
            {Math.round((score / maxScore) * 100)}% Complete
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="playerName" className="font-pixel">
              Your Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              maxLength={50}
              required
            />
          </div>

          <div>
            <Label htmlFor="city" className="font-pixel">
              City (Optional)
            </Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              maxLength={50}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-pixel flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Score'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSkip}
              className="font-pixel"
            >
              Skip
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/leaderboard')}
            className="font-pixel text-sm"
          >
            View Leaderboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderboardSubmission;
