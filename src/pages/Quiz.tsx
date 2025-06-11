import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { presetRhythms } from '@/data/presets';
import { PresetRhythm } from '@/types/rhythm';
import { playSound } from '@/utils/audioUtils';

interface QuizState {
  currentPreset: PresetRhythm | null;
  options: PresetRhythm[];
  lives: number;
  correctCounts: Record<string, number>;
  gameComplete: boolean;
  showFeedback: boolean;
  lastAnswerCorrect: boolean;
  isPlaying: boolean;
  currentBeat: number;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [quizType, setQuizType] = useState<'preset-recognition' | 'future-quiz'>('preset-recognition');
  const [playbackInterval, setPlaybackInterval] = useState<NodeJS.Timeout | null>(null);
  
  const [state, setState] = useState<QuizState>({
    currentPreset: null,
    options: [],
    lives: 3,
    correctCounts: presetRhythms.reduce((acc, preset) => ({ ...acc, [preset.name]: 0 }), {}),
    gameComplete: false,
    showFeedback: false,
    lastAnswerCorrect: false,
    isPlaying: false,
    currentBeat: 0,
  });

  const generateQuestion = () => {
    // Find presets that need more correct answers
    const incompletePresets = presetRhythms.filter(preset => state.correctCounts[preset.name] < 2);
    
    if (incompletePresets.length === 0) {
      setState(prev => ({ ...prev, gameComplete: true }));
      return;
    }

    // Pick a random incomplete preset
    const currentPreset = incompletePresets[Math.floor(Math.random() * incompletePresets.length)];
    
    // Create options (current preset + 3 random others)
    const otherPresets = presetRhythms.filter(p => p.name !== currentPreset.name);
    const randomOthers = otherPresets.sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [currentPreset, ...randomOthers].sort(() => 0.5 - Math.random());

    setState(prev => ({
      ...prev,
      currentPreset,
      options,
      showFeedback: false,
      isPlaying: false,
      currentBeat: 0,
    }));

    // Stop any existing playback
    if (playbackInterval) {
      clearInterval(playbackInterval);
      setPlaybackInterval(null);
    }
  };

  const playPreset = () => {
    if (!state.currentPreset) return;

    if (state.isPlaying) {
      // Stop playing
      if (playbackInterval) {
        clearInterval(playbackInterval);
        setPlaybackInterval(null);
      }
      setState(prev => ({ ...prev, isPlaying: false, currentBeat: 0 }));
      return;
    }

    // Start playing - loop continuously
    setState(prev => ({ ...prev, isPlaying: true, currentBeat: 0 }));
    
    let beatIndex = 0;
    const interval = setInterval(() => {
      const preset = state.currentPreset!;
      
      // Play main beat if active
      if (preset.mainBeats.includes((beatIndex % 4) + 1)) {
        playSound('bass', false);
      }
      
      // Play half beat if active (offset by half the interval)
      setTimeout(() => {
        if (preset.halfBeats.includes((beatIndex % 4) + 1)) {
          playSound('bass', true);
        }
      }, 150);

      setState(prev => ({ ...prev, currentBeat: beatIndex % 4 }));
      beatIndex++;

      // Continue looping - no stop condition, just keep going
    }, 600); // 100 BPM

    setPlaybackInterval(interval);
  };

  const handleAnswer = (selectedPreset: PresetRhythm) => {
    if (state.showFeedback || !state.currentPreset) return;

    // Stop the rhythm when an answer is selected
    if (playbackInterval) {
      clearInterval(playbackInterval);
      setPlaybackInterval(null);
    }
    setState(prev => ({ ...prev, isPlaying: false, currentBeat: 0 }));

    const isCorrect = selectedPreset.name === state.currentPreset.name;
    
    setState(prev => ({
      ...prev,
      showFeedback: true,
      lastAnswerCorrect: isCorrect,
      correctCounts: isCorrect 
        ? { ...prev.correctCounts, [selectedPreset.name]: prev.correctCounts[selectedPreset.name] + 1 }
        : prev.correctCounts,
      lives: isCorrect ? prev.lives : prev.lives - 1,
    }));

    // Auto-continue after 2 seconds
    setTimeout(() => {
      if (state.lives <= 1 && !isCorrect) {
        // Game over - reset
        setState({
          currentPreset: null,
          options: [],
          lives: 3,
          correctCounts: presetRhythms.reduce((acc, preset) => ({ ...acc, [preset.name]: 0 }), {}),
          gameComplete: false,
          showFeedback: false,
          lastAnswerCorrect: false,
          isPlaying: false,
          currentBeat: 0,
        });
      } else {
        generateQuestion();
      }
    }, 2000);
  };

  const resetGame = () => {
    // Stop any existing playback
    if (playbackInterval) {
      clearInterval(playbackInterval);
      setPlaybackInterval(null);
    }
    
    setState({
      currentPreset: null,
      options: [],
      lives: 3,
      correctCounts: presetRhythms.reduce((acc, preset) => ({ ...acc, [preset.name]: 0 }), {}),
      gameComplete: false,
      showFeedback: false,
      lastAnswerCorrect: false,
      isPlaying: false,
      currentBeat: 0,
    });
  };

  useEffect(() => {
    if (quizType === 'preset-recognition' && !state.currentPreset && !state.gameComplete) {
      generateQuestion();
    }
  }, [quizType]);

  useEffect(() => {
    return () => {
      if (playbackInterval) {
        clearInterval(playbackInterval);
      }
    };
  }, [playbackInterval]);

  const allPresetsCompleted = Object.values(state.correctCounts).every(count => count >= 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 pixelated">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="font-pixel"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Rhythm Grid
          </Button>
          
          <h1 className="font-pixel text-2xl text-foreground">Preset Quiz</h1>
          
          {/* Lives */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="font-pixel text-sm">Lives:</span>
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart 
                key={i} 
                className={`w-6 h-6 ${i < state.lives ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>

        {/* Quiz Type Toggle */}
        <div className="game-panel p-6 mb-6">
          <div className="flex gap-4">
            <Button
              onClick={() => setQuizType('preset-recognition')}
              variant={quizType === 'preset-recognition' ? 'default' : 'outline'}
              className="font-pixel"
            >
              Preset Recognition
            </Button>
            <Button
              onClick={() => setQuizType('future-quiz')}
              variant={quizType === 'future-quiz' ? 'default' : 'outline'}
              className="font-pixel"
              disabled
            >
              Coming Soon...
            </Button>
          </div>
        </div>

        {/* Quiz Content */}
        {quizType === 'preset-recognition' && state.currentPreset && (
          <div className="game-panel p-8">
            <div className="text-center mb-8">
              <h2 className="font-pixel text-xl mb-4">Listen to the rhythm and identify the preset</h2>
              
              {/* Play Button */}
              <Button 
                onClick={playPreset}
                className="font-pixel text-lg px-8 py-4 mb-6"
                disabled={state.showFeedback}
              >
                {state.isPlaying ? (
                  <>
                    <Pause className="w-6 h-6 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 mr-2" />
                    Play Rhythm
                  </>
                )}
              </Button>

              {/* Beat Indicator */}
              {state.isPlaying && (
                <div className="flex justify-center gap-2 mb-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full border-2 ${
                        i === state.currentBeat ? 'bg-berlin-orange border-berlin-orange' : 'border-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {state.options.map((preset) => (
                <Button
                  key={preset.name}
                  onClick={() => handleAnswer(preset)}
                  disabled={state.showFeedback}
                  variant="outline"
                  className="font-pixel p-4 h-auto"
                >
                  <div className="text-center">
                    <div className="font-bold">{preset.name}</div>
                    <div className="text-xs text-muted-foreground">{preset.category}</div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {state.showFeedback && (
              <div className={`text-center mt-6 p-4 rounded-lg ${
                state.lastAnswerCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className="font-pixel text-lg">
                  {state.lastAnswerCorrect ? '✓ Correct!' : '✗ Wrong!'}
                </div>
                <div className="text-sm mt-1">
                  The correct answer was: {state.currentPreset.name}
                </div>
              </div>
            )}

            {/* Progress */}
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-pixel mb-4">Progress (need 2 correct for each):</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {presetRhythms.map(preset => (
                  <div key={preset.name} className="flex justify-between">
                    <span>{preset.name}:</span>
                    <span className={state.correctCounts[preset.name] >= 2 ? 'text-green-600 font-bold' : ''}>
                      {state.correctCounts[preset.name]}/2
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Victory Modal */}
        <Dialog open={state.gameComplete && allPresetsCompleted}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-pixel text-2xl text-center">🎉 Congratulations! 🎉</DialogTitle>
            </DialogHeader>
            <div className="text-center p-6">
              <p className="font-pixel text-lg mb-4">
                You've mastered all the presets!
              </p>
              <p className="mb-6">
                You successfully identified each preset twice. You're now a rhythm expert!
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetGame} className="font-pixel">
                  Play Again
                </Button>
                <Button onClick={() => navigate('/')} variant="outline" className="font-pixel">
                  Back to Grid
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Game Over Modal */}
        <Dialog open={state.lives === 0}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-pixel text-xl text-center">Game Over</DialogTitle>
            </DialogHeader>
            <div className="text-center p-6">
              <p className="mb-6">You've run out of lives! Don't worry, practice makes perfect.</p>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetGame} className="font-pixel">
                  Try Again
                </Button>
                <Button onClick={() => navigate('/')} variant="outline" className="font-pixel">
                  Back to Grid
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Quiz;
