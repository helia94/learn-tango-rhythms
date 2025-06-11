import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { presetRhythms } from '@/data/presets';
import { PresetRhythm } from '@/types/rhythm';
import { playSound } from '@/utils/audioUtils';
import { useQuizPlayback } from '@/hooks/useQuizPlayback';
import LeaderboardSubmission from '@/components/LeaderboardSubmission';
import { initializeAudioContext } from '@/utils/audioUtils';

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
  // Beat selection quiz state
  selectedMainBeats: boolean[];
  selectedHalfBeats: boolean[];
  hasSubmitted: boolean;
  // Scoring state
  totalCorrectAnswers: number;
  showLeaderboardSubmission: boolean;
}
const Quiz = () => {
  const navigate = useNavigate();
  const [quizType, setQuizType] = useState<'preset-recognition' | 'beat-selection'>('preset-recognition');
  const [playbackInterval, setPlaybackInterval] = useState<NodeJS.Timeout | null>(null);
  const [state, setState] = useState<QuizState>({
    currentPreset: null,
    options: [],
    lives: 3,
    correctCounts: presetRhythms.reduce((acc, preset) => ({
      ...acc,
      [preset.name]: 0
    }), {}),
    gameComplete: false,
    showFeedback: false,
    lastAnswerCorrect: false,
    isPlaying: false,
    currentBeat: 0,
    selectedMainBeats: new Array(4).fill(false),
    selectedHalfBeats: new Array(4).fill(false),
    hasSubmitted: false,
    totalCorrectAnswers: 0,
    showLeaderboardSubmission: false
  });

  // Use the quiz playback hook for beat selection
  const {
    isPlaying: isQuizPlaying,
    currentBeat: quizCurrentBeat,
    startPlayback,
    stopPlayback
  } = useQuizPlayback({
    selectedMainBeats: state.selectedMainBeats,
    selectedHalfBeats: state.selectedHalfBeats
  });
  const generateQuestion = () => {
    // Find presets that need more correct answers (less than 3 correct answers)
    const incompletePresets = presetRhythms.filter(preset => state.correctCounts[preset.name] < 3);
    if (incompletePresets.length === 0) {
      setState(prev => ({
        ...prev,
        gameComplete: true,
        showLeaderboardSubmission: true
      }));
      return;
    }

    // Pick a random incomplete preset
    const currentPreset = incompletePresets[Math.floor(Math.random() * incompletePresets.length)];
    if (quizType === 'preset-recognition') {
      // Create options (current preset + 3 random others from all presets)
      let otherPresets = presetRhythms.filter(p => p.name !== currentPreset.name);

      // If current preset is MERCATO 2, exclude MERCATO OPPOSITE from options
      if (currentPreset.name === 'MERCATO 2') {
        otherPresets = otherPresets.filter(p => p.name !== 'MERCATO OPPOSITE');
      }
      // If current preset is MERCATO OPPOSITE, exclude MERCATO 2 from options
      else if (currentPreset.name === 'MERCATO OPPOSITE') {
        otherPresets = otherPresets.filter(p => p.name !== 'MERCATO 2');
      }
      const randomOthers = otherPresets.sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [currentPreset, ...randomOthers].sort(() => 0.5 - Math.random());
      setState(prev => ({
        ...prev,
        currentPreset,
        options,
        showFeedback: false,
        isPlaying: false,
        currentBeat: 0
      }));
    } else {
      // Beat selection quiz - no options needed, just reset the grid
      setState(prev => ({
        ...prev,
        currentPreset,
        showFeedback: false,
        selectedMainBeats: new Array(4).fill(false),
        selectedHalfBeats: new Array(4).fill(false),
        hasSubmitted: false
      }));
    }

    // Stop any existing playback
    if (playbackInterval) {
      clearInterval(playbackInterval);
      setPlaybackInterval(null);
    }
    stopPlayback();
  };
  const playPreset = async () => {
    if (!state.currentPreset) return;
    
    // Initialize audio context on first user interaction (required for iOS)
    try {
      await initializeAudioContext();
      console.log('Audio context initialized for quiz');
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
    }
    
    if (state.isPlaying) {
      // Stop playing
      if (playbackInterval) {
        clearInterval(playbackInterval);
        setPlaybackInterval(null);
      }
      setState(prev => ({
        ...prev,
        isPlaying: false,
        currentBeat: 0
      }));
      return;
    }

    // Start playing - loop continuously
    setState(prev => ({
      ...prev,
      isPlaying: true,
      currentBeat: 0
    }));
    let beatIndex = 0;
    const interval = setInterval(() => {
      const preset = state.currentPreset!;

      // Play main beat if active
      if (preset.mainBeats.includes(beatIndex % 4 + 1)) {
        playSound('bass', false);
      }

      // Play half beat if active (offset by half the interval)
      setTimeout(() => {
        if (preset.halfBeats.includes(beatIndex % 4 + 1)) {
          playSound('bass', true);
        }
      }, 150);
      setState(prev => ({
        ...prev,
        currentBeat: beatIndex % 4
      }));
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
    setState(prev => ({
      ...prev,
      isPlaying: false,
      currentBeat: 0
    }));
    const isCorrect = selectedPreset.name === state.currentPreset.name;
    setState(prev => ({
      ...prev,
      showFeedback: true,
      lastAnswerCorrect: isCorrect,
      correctCounts: isCorrect ? {
        ...prev.correctCounts,
        [selectedPreset.name]: prev.correctCounts[selectedPreset.name] + 1
      } : prev.correctCounts,
      lives: isCorrect ? prev.lives : prev.lives - 1,
      totalCorrectAnswers: isCorrect ? prev.totalCorrectAnswers + 1 : prev.totalCorrectAnswers
    }));

    // Auto-continue after 2 seconds
    setTimeout(() => {
      if (state.lives <= 1 && !isCorrect) {
        // Game over - show leaderboard submission
        setState(prev => ({
          ...prev,
          showLeaderboardSubmission: true
        }));
      } else {
        generateQuestion();
      }
    }, 2000);
  };
  const handleBeatSelection = (beatIndex: number, isHalfBeat: boolean) => {
    if (state.showFeedback || state.hasSubmitted) return;
    if (isHalfBeat) {
      setState(prev => ({
        ...prev,
        selectedHalfBeats: prev.selectedHalfBeats.map((beat, index) => index === beatIndex ? !beat : beat)
      }));
    } else {
      setState(prev => ({
        ...prev,
        selectedMainBeats: prev.selectedMainBeats.map((beat, index) => index === beatIndex ? !beat : beat)
      }));
    }
  };
  const handleBeatSelectionSubmit = () => {
    if (!state.currentPreset || state.hasSubmitted) return;

    // Stop continuous playback when submitting
    stopPlayback();

    // Convert selected beats to the same format as preset (1-4 instead of 0-3)
    const selectedMainBeatsNumbers = state.selectedMainBeats.map((selected, index) => selected ? index + 1 : null).filter(beat => beat !== null) as number[];
    const selectedHalfBeatsNumbers = state.selectedHalfBeats.map((selected, index) => selected ? index + 1 : null).filter(beat => beat !== null) as number[];

    // Check if the selection matches the preset
    const mainBeatsMatch = selectedMainBeatsNumbers.length === state.currentPreset.mainBeats.length && selectedMainBeatsNumbers.every(beat => state.currentPreset!.mainBeats.includes(beat)) && state.currentPreset.mainBeats.every(beat => selectedMainBeatsNumbers.includes(beat));
    const halfBeatsMatch = selectedHalfBeatsNumbers.length === state.currentPreset.halfBeats.length && selectedHalfBeatsNumbers.every(beat => state.currentPreset!.halfBeats.includes(beat)) && state.currentPreset.halfBeats.every(beat => selectedHalfBeatsNumbers.includes(beat));
    const isCorrect = mainBeatsMatch && halfBeatsMatch;
    setState(prev => ({
      ...prev,
      showFeedback: true,
      lastAnswerCorrect: isCorrect,
      hasSubmitted: true,
      correctCounts: isCorrect ? {
        ...prev.correctCounts,
        [state.currentPreset!.name]: prev.correctCounts[state.currentPreset!.name] + 1
      } : prev.correctCounts,
      lives: isCorrect ? prev.lives : prev.lives - 1,
      totalCorrectAnswers: isCorrect ? prev.totalCorrectAnswers + 1 : prev.totalCorrectAnswers
    }));

    // Use different timeouts based on whether answer is correct
    const timeoutDuration = isCorrect ? 500 : 3000; // 0.5 seconds for correct, 3 seconds for wrong

    setTimeout(() => {
      if (state.lives <= 1 && !isCorrect) {
        // Game over - show leaderboard submission
        setState(prev => ({
          ...prev,
          showLeaderboardSubmission: true
        }));
      } else {
        generateQuestion();
      }
    }, timeoutDuration);
  };
  const resetGame = () => {
    // Stop any existing playback
    if (playbackInterval) {
      clearInterval(playbackInterval);
      setPlaybackInterval(null);
    }
    stopPlayback();
    setState({
      currentPreset: null,
      options: [],
      lives: 3,
      correctCounts: presetRhythms.reduce((acc, preset) => ({
        ...acc,
        [preset.name]: 0
      }), {}),
      gameComplete: false,
      showFeedback: false,
      lastAnswerCorrect: false,
      isPlaying: false,
      currentBeat: 0,
      selectedMainBeats: new Array(4).fill(false),
      selectedHalfBeats: new Array(4).fill(false),
      hasSubmitted: false,
      totalCorrectAnswers: 0,
      showLeaderboardSubmission: false
    });
  };
  const handleQuizTypeChange = (newQuizType: 'preset-recognition' | 'beat-selection') => {
    setQuizType(newQuizType);
    resetGame();
  };
  useEffect(() => {
    if (!state.currentPreset && !state.gameComplete) {
      generateQuestion();
    }
  }, [quizType]);

  // Auto-start continuous playback for beat selection quiz
  useEffect(() => {
    if (quizType === 'beat-selection' && state.currentPreset && !state.showFeedback && !isQuizPlaying) {
      // Small delay to ensure state is properly set
      const timer = setTimeout(() => {
        startPlayback();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [state.currentPreset, state.showFeedback, quizType, isQuizPlaying, startPlayback]);
  useEffect(() => {
    return () => {
      if (playbackInterval) {
        clearInterval(playbackInterval);
      }
      stopPlayback();
    };
  }, [playbackInterval, stopPlayback]);
  const allPresetsCompleted = Object.values(state.correctCounts).every(count => count >= 3);

  // Calculate overall progress percentage
  const totalCorrectAnswers = Object.values(state.correctCounts).reduce((sum, count) => sum + count, 0);
  const totalRequiredAnswers = presetRhythms.length * 3;
  const progressPercentage = Math.round(totalCorrectAnswers / totalRequiredAnswers * 100);

  // Calculate final score for leaderboard (max 60 points total)
  const maxPossibleScore = 60;
  const finalScore = state.totalCorrectAnswers * 2; // 2 points per correct answer (30 max answers * 2 = 60 max score)

  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 pixelated">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="font-pixel">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Rhythm Grid
          </Button>
          
          <h1 className="font-pixel text-2xl text-foreground">Preset Quiz</h1>
          
          {/* Lives and Score */}
          <div className="flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-sm">Score:</span>
              <span className="font-pixel text-lg text-berlin-brick-orange">{finalScore}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-sm">Lives:</span>
              {Array.from({
              length: 3
            }).map((_, i) => <Heart key={i} className={`w-6 h-6 ${i < state.lives ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} />)}
            </div>
          </div>
        </div>

        {/* Quiz Type Toggle */}
        <div className="game-panel p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button onClick={() => handleQuizTypeChange('preset-recognition')} variant={quizType === 'preset-recognition' ? 'default' : 'outline'} className="font-pixel flex-1 min-w-0">
              <span className="truncate">Listen and Guess</span>
            </Button>
            <Button onClick={() => handleQuizTypeChange('beat-selection')} variant={quizType === 'beat-selection' ? 'default' : 'outline'} className="font-pixel flex-1 min-w-0">
              <span className="truncate">Read and Play</span>
            </Button>
          </div>
        </div>

        {/* Quiz Content - Preset Recognition */}
        {quizType === 'preset-recognition' && state.currentPreset && <div className="game-panel p-8">
            <div className="text-center mb-8">
              <h2 className="font-pixel text-xl mb-4">Listen and Identify the Rhythm</h2>
              
              {/* Play Button */}
              <Button onClick={playPreset} className="font-pixel text-lg px-8 py-4 mb-6" disabled={state.showFeedback}>
                {state.isPlaying ? <>
                    <Pause className="w-6 h-6 mr-2" />
                    Stop
                  </> : <>
                    <Play className="w-6 h-6 mr-2" />
                    Play
                  </>}
              </Button>

              {/* Beat Indicator */}
              {state.isPlaying && <div className="flex justify-center gap-2 mb-6">
                  {Array.from({
              length: 4
            }).map((_, i) => <div key={i} className={`w-4 h-4 rounded-full border-2 ${i === state.currentBeat ? 'bg-berlin-brick-orange border-berlin-brick-orange' : 'border-gray-300'}`} />)}
                </div>}
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {state.options.map(preset => <Button key={preset.name} onClick={() => handleAnswer(preset)} disabled={state.showFeedback} variant="outline" className="font-pixel p-4 h-auto">
                  <div className="text-center">
                    <div className="font-bold">{preset.name}</div>
                    <div className="text-xs text-muted-foreground">{preset.category}</div>
                  </div>
                </Button>)}
            </div>

            {/* Feedback */}
            {state.showFeedback && <div className={`text-center mt-6 p-4 rounded-lg ${state.lastAnswerCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="font-pixel text-lg">
                  {state.lastAnswerCorrect ? '✓ Correct!' : '✗ Wrong!'}
                </div>
                <div className="text-sm mt-1">
                  The correct answer was: {state.currentPreset.name}
                </div>
              </div>}

            {/* Progress Bar */}
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-pixel">Progress</h3>
                <span className="font-pixel text-sm">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
            </div>
          </div>}

        {/* Quiz Content - Beat Selection */}
        {quizType === 'beat-selection' && state.currentPreset && <div className="game-panel p-8">
            <div className="text-center mb-8">
              <h2 className="font-pixel text-xl mb-4">Select the beats for:</h2>
              <h3 className="font-pixel text-2xl text-berlin-brick-orange mb-2">{state.currentPreset.name}</h3>
              <p className="text-muted-foreground mb-6">{state.currentPreset.category}</p>
              
              {/* Audio status indicator - no manual control needed */}
              {isQuizPlaying && !state.showFeedback && <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-berlin-brick-orange rounded-full animate-pulse"></div>
                  <span className="font-pixel text-sm text-muted-foreground">Audio playing...</span>
                </div>}

              {/* Beat Indicator for continuous playback */}
              {isQuizPlaying && <div className="flex justify-center gap-2 mb-6">
                  {Array.from({
              length: 4
            }).map((_, i) => <div key={i} className={`w-4 h-4 rounded-full border-2 ${i === quizCurrentBeat ? 'bg-berlin-brick-orange border-berlin-brick-orange' : 'border-gray-300'}`} />)}
                </div>}
            </div>

            {/* Beat Selection Grid - Similar to main page layout */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-1 md:gap-3">
                {Array.from({
              length: 4
            }).map((_, beatIndex) => <div key={beatIndex} className="flex items-center gap-1 md:gap-2">
                    {/* Main beat */}
                    <button onClick={() => handleBeatSelection(beatIndex, false)} disabled={state.showFeedback} className={`
                        w-12 h-12 md:w-16 md:h-16 border-2 font-pixel text-lg transition-colors
                        ${state.selectedMainBeats[beatIndex] ? 'bg-berlin-red border-berlin-red text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-berlin-red'}
                        ${state.showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}
                      `}>
                      {beatIndex + 1}
                    </button>
                    
                    {/* Half beat (except after last beat) */}
                    {beatIndex < 3 && <button onClick={() => handleBeatSelection(beatIndex, true)} disabled={state.showFeedback} className={`
                          w-6 h-6 md:w-8 md:h-8 rounded-full border-2 font-pixel text-xs transition-colors
                          ${state.selectedHalfBeats[beatIndex] ? 'bg-berlin-orange border-berlin-orange text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-berlin-orange'}
                          ${state.showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}
                        `}>
                        +
                      </button>}
                  </div>)}
              </div>
            </div>

            {/* Beat Numbers */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-1 md:gap-3">
                {[1, 2, 3, 4].map((number, index) => <div key={index} className="flex items-center gap-1 md:gap-2">
                    <div className="text-center font-pixel text-sm w-12 md:w-16 text-foreground">
                      {number}
                    </div>
                    {index < 3 && <div className="text-center font-pixel text-sm w-6 md:w-8 text-muted-foreground">
                        +
                      </div>}
                  </div>)}
              </div>
            </div>

            {/* Submit Button */}
            {!state.showFeedback && <div className="text-center mb-8">
                <Button onClick={handleBeatSelectionSubmit} className="font-pixel text-lg px-8 py-4" disabled={state.hasSubmitted}>
                  Submit Answer
                </Button>
              </div>}

            {/* Feedback */}
            {state.showFeedback && <div className={`p-6 rounded-lg mb-8 ${state.lastAnswerCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="font-pixel text-lg mb-6 text-center">
                  {state.lastAnswerCorrect ? '✓ Correct!' : '✗ Wrong!'}
                </div>
                
                {/* Show correct answer visually when wrong */}
                {!state.lastAnswerCorrect && <div className="bg-white p-4 rounded-lg">
                    <div className="font-pixel text-sm mb-4 text-center text-gray-800">
                      Correct Answer:
                    </div>
                    
                    {/* Visual representation of correct answer */}
                    <div className="flex justify-center mb-4">
                      <div className="flex gap-1 md:gap-3">
                        {Array.from({
                  length: 4
                }).map((_, beatIndex) => <div key={beatIndex} className="flex items-center gap-1 md:gap-2">
                            {/* Main beat - show if it should be active */}
                            <div className={`
                                w-12 h-12 md:w-16 md:h-16 border-2 font-pixel text-lg flex items-center justify-center
                                ${state.currentPreset!.mainBeats.includes(beatIndex + 1) ? 'bg-berlin-red border-berlin-red text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}
                              `}>
                              {beatIndex + 1}
                            </div>
                            
                            {/* Half beat - show if it should be active (except after last beat) */}
                            {beatIndex < 3 && <div className={`
                                  w-6 h-6 md:w-8 md:h-8 rounded-full border-2 font-pixel text-xs flex items-center justify-center
                                  ${state.currentPreset!.halfBeats.includes(beatIndex + 1) ? 'bg-berlin-orange border-berlin-orange text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}
                                `}>
                                +
                              </div>}
                          </div>)}
                      </div>
                    </div>
                    
                    {/* Beat numbers for the correct answer */}
                    <div className="flex justify-center">
                      <div className="flex gap-1 md:gap-3">
                        {[1, 2, 3, 4].map((number, index) => <div key={index} className="flex items-center gap-1 md:gap-2">
                            <div className="text-center font-pixel text-sm w-12 md:w-16 text-gray-600">
                              {number}
                            </div>
                            {index < 3 && <div className="text-center font-pixel text-sm w-6 md:w-8 text-gray-400">
                                +
                              </div>}
                          </div>)}
                      </div>
                    </div>
                  </div>}
              </div>}

            {/* Progress Bar */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-pixel">Progress</h3>
                <span className="font-pixel text-sm">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
            </div>
          </div>}

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
                You successfully identified each preset three times. You're now a rhythm expert!
              </p>
              <div className="font-pixel text-2xl mb-6 text-berlin-brick-orange">
                Final Score: {finalScore}/{maxPossibleScore}
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetGame} className="font-pixel">
                  Play Again
                </Button>
                <Button onClick={() => navigate('/leaderboard')} variant="outline" className="font-pixel">
                  View Leaderboard
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
              <p className="mb-4">You've run out of lives! Don't worry, practice makes perfect.</p>
              <div className="font-pixel text-2xl mb-6 text-berlin-brick-orange">
                Final Score: {finalScore}/{maxPossibleScore}
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetGame} className="font-pixel">
                  Try Again
                </Button>
                <Button onClick={() => navigate('/leaderboard')} variant="outline" className="font-pixel">
                  View Leaderboard
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Leaderboard Submission Modal */}
        <LeaderboardSubmission isOpen={state.showLeaderboardSubmission} onClose={() => setState(prev => ({
        ...prev,
        showLeaderboardSubmission: false
      }))} score={finalScore} maxScore={maxPossibleScore} />
      </div>
    </div>;
};
export default Quiz;
