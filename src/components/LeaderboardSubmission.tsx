
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

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
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      toast({
        title: t('common.error'),
        description: t('errors.enterName'),
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
          title: t('common.error'),
          description: t('errors.submitFailed'),
          variant: "destructive",
        });
        return;
      }

      toast({
        title: t('common.success'),
        description: t('messages.scoreSubmitted'),
      });

      onClose();
      
      // Navigate to leaderboard after a short delay
      setTimeout(() => {
        navigate('/leaderboard');
      }, 1000);

    } catch (error) {
      console.error('Error submitting score:', error);
      toast({
        title: t('common.error'),
        description: t('errors.submitFailed'),
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
            {t('quiz.complete')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-6">
          <div className="font-pixel text-2xl mb-2">{t('quiz.finalScore')}</div>
          <div className="font-pixel text-4xl text-berlin-orange">
            {score}/{maxScore}
          </div>
          <div className="text-lg text-muted-foreground">
            {Math.round((score / maxScore) * 100)}{t('quiz.complete_percentage')}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="playerName" className="font-pixel">
              {t('quiz.yourName')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder={t('quiz.enterName')}
              maxLength={50}
              required
            />
          </div>

          <div>
            <Label htmlFor="city" className="font-pixel">
              {t('quiz.city')}
            </Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t('quiz.enterCity')}
              maxLength={50}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-pixel flex-1"
            >
              {isSubmitting ? t('quiz.submitting') : t('quiz.submitScore')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSkip}
              className="font-pixel"
            >
              {t('common.skip')}
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/leaderboard')}
            className="font-pixel text-sm"
          >
            {t('leaderboard.viewLeaderboard')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderboardSubmission;
