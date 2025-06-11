import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Play, Pause, Volume2, Zap, Target, CheckCircle2, XCircle, Award, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { presetRhythms } from '@/data/presets';
import { PresetRhythm } from '@/types/rhythm';
import { playSound } from '@/utils/audioUtils';
import { useQuizPlayback } from '@/hooks/useQuizPlayback';
import LeaderboardSubmission from '@/components/LeaderboardSubmission';

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

  const playPreset = () => {
    if (!state.currentPreset) return;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 pixelated">
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
              <span className="font-pixel text-lg text-berlin-orange">{finalScore}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-sm">Lives:</span>
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart key={i} className={`w-6 h-6 ${i < state.lives ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Quiz Type Toggle - Enhanced with retro game styling */}
        <div className="game-panel p-6 mb-6 relative overflow-hidden">
          {/* Static background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-berlin-cyan/20 via-berlin-pink/20 to-berlin-lime/20"></div>
          
          {/* Static scanline effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-white/10 to-transparent bg-[length:100%_4px]"></div>
          </div>
          
          <div className="relative flex flex-col sm:flex-row gap-4 w-full">
            <button 
              onClick={() => handleQuizTypeChange('preset-recognition')} 
              className={`
                font-pixel flex-1 min-w-0 px-6 py-4 text-sm sm:text-base
                border-4 border-black transition-all duration-200 transform
                ${quizType === 'preset-recognition' 
                  ? 'bg-gradient-to-r from-berlin-lime to-berlin-cyan text-black shadow-[4px_4px_0px_0px_#000,8px_8px_0px_0px_rgba(0,0,0,0.3)] translate-x-[-2px] translate-y-[-2px]' 
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-gradient-to-r hover:from-berlin-lime/30 hover:to-berlin-cyan/30'
                }
                active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#000]
              `}
            >
              <span className="truncate flex items-center justify-center gap-2">
                🎵 Listen and Guess
              </span>
            </button>
            
            <button 
              onClick={() => handleQuizTypeChange('beat-selection')} 
              className={`
                font-pixel flex-1 min-w-0 px-6 py-4 text-sm sm:text-base
                border-4 border-black transition-all duration-200 transform
                ${quizType === 'beat-selection' 
                  ? 'bg-gradient-to-r from-berlin-pink to-berlin-orange text-black shadow-[4px_4px_0px_0px_#000,8px_8px_0px_0px_rgba(0,0,0,0.3)] translate-x-[-2px] translate-y-[-2px]' 
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-gradient-to-r hover:from-berlin-pink/30 hover:to-berlin-orange/30'
                }
                active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#000]
              `}
            >
              <span className="truncate flex items-center justify-center gap-2">
                🎮 Read and Play
              </span>
            </button>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-berlin-yellow border-2 border-black transform rotate-45"></div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-berlin-purple border-2 border-black transform rotate-45"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-berlin-red border-2 border-black transform rotate-45"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-berlin-blue border-2 border-black transform rotate-45"></div>
        </div>

        {/* Quiz Content - Preset Recognition */}
        {quizType === 'preset-recognition' && state.currentPreset && (
          <div className="game-panel p-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-4 right-4 opacity-20">
              <Volume2 className="w-16 h-16 text-berlin-cyan animate-pulse" />
            </div>
            <div className="absolute bottom-4 left-4 opacity-20">
              <Target className="w-12 h-12 text-berlin-pink animate-bounce" />
            </div>

            {/* Header Section with Visual Enhancement */}
            <div className="text-center mb-8 relative">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Gamepad2 className="w-8 h-8 text-berlin-orange animate-wiggle" />
                <h2 className="font-pixel text-xl berlin-title">Listen & Identify</h2>
                <Gamepad2 className="w-8 h-8 text-berlin-orange animate-wiggle" />
              </div>
              
              {/* Enhanced Play Button */}
              <div className="relative inline-block mb-6">
                <Button onClick={playPreset} className="pixel-button text-lg px-12 py-6 relative" disabled={state.showFeedback}>
                  {state.isPlaying ? (
                    <>
                      <Pause className="w-8 h-8 mr-3" />
                      <span className="font-pixel">STOP RHYTHM</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-8 h-8 mr-3" />
                      <span className="font-pixel">PLAY RHYTHM</span>
                    </>
                  )}
                </Button>
                {state.isPlaying && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-berlin-red rounded-full animate-pulse border-2 border-white"></div>
                )}
              </div>

              {/* Enhanced Beat Indicator */}
              {state.isPlaying && (
                <div className="flex justify-center gap-3 mb-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="relative">
                      <div className={`w-6 h-6 rounded-full border-3 border-black transition-all duration-150 ${
                        i === state.currentBeat 
                          ? 'bg-berlin-orange shadow-[0_0_20px_hsl(var(--berlin-orange))] scale-125' 
                          : 'bg-gray-200'
                      }`} />
                      {i === state.currentBeat && (
                        <div className="absolute inset-0 rounded-full bg-berlin-orange animate-ping opacity-75"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Options Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {state.options.map((preset, index) => (
                <div key={preset.name} className="relative">
                  <Button 
                    onClick={() => handleAnswer(preset)} 
                    disabled={state.showFeedback} 
                    className={`
                      w-full h-auto p-6 text-left transition-all duration-200 transform
                      font-pixel border-4 border-black
                      ${state.showFeedback 
                        ? preset.name === state.currentPreset.name
                          ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-[0_0_30px_rgba(34,197,94,0.5)]'
                          : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-600'
                        : 'bg-gradient-to-br from-white to-gray-100 hover:from-berlin-cyan/30 hover:to-berlin-pink/30 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center text-2xl ${
                        index === 0 ? 'bg-berlin-red' : index === 1 ? 'bg-berlin-blue' : index === 2 ? 'bg-berlin-lime' : 'bg-berlin-purple'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div>
                        <div className="font-bold text-lg">{preset.name}</div>
                        <div className="text-sm opacity-70">{preset.category}</div>
                      </div>
                    </div>
                  </Button>
                  
                  {/* Visual feedback indicators */}
                  {state.showFeedback && preset.name === state.currentPreset.name && (
                    <div className="absolute -top-2 -right-2">
                      <CheckCircle2 className="w-8 h-8 text-green-500 bg-white rounded-full animate-bounce" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Enhanced Feedback */}
            {state.showFeedback && (
              <div className={`relative p-6 rounded-lg border-4 border-black mb-8 ${
                state.lastAnswerCorrect 
                  ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' 
                  : 'bg-gradient-to-r from-red-400 to-red-600 text-white'
              }`}>
                <div className="flex items-center justify-center gap-4 mb-4">
                  {state.lastAnswerCorrect ? (
                    <CheckCircle2 className="w-12 h-12 animate-bounce" />
                  ) : (
                    <XCircle className="w-12 h-12 animate-shake" />
                  )}
                  <div className="font-pixel text-2xl">
                    {state.lastAnswerCorrect ? 'CORRECT!' : 'WRONG!'}
                  </div>
                </div>
                <div className="text-center font-pixel text-lg">
                  {state.lastAnswerCorrect ? '🎉 Nice work!' : `Correct answer: ${state.currentPreset.name}`}
                </div>
              </div>
            )}

            {/* Enhanced Progress Bar */}
            <div className="p-6 bg-gradient-to-r from-berlin-cyan/20 to-berlin-pink/20 rounded-lg border-4 border-black">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-berlin-orange" />
                  <h3 className="font-pixel text-lg">PROGRESS</h3>
                </div>
                <span className="font-pixel text-xl text-berlin-orange">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="w-full h-4 border-2 border-black" />
            </div>
          </div>
        )}

        {/* Quiz Content - Beat Selection */}
        {quizType === 'beat-selection' && state.currentPreset && (
          <div className="game-panel p-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-4 right-4 opacity-20">
              <Zap className="w-16 h-16 text-berlin-yellow animate-pulse" />
            </div>
            <div className="absolute bottom-4 left-4 opacity-20">
              <Target className="w-12 h-12 text-berlin-green animate-bounce" />
            </div>

            {/* Header Section with Visual Enhancement */}
            <div className="text-center mb-8 relative">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Gamepad2 className="w-8 h-8 text-berlin-pink animate-wiggle" />
                <h2 className="font-pixel text-xl berlin-title">Beat Builder</h2>
                <Gamepad2 className="w-8 h-8 text-berlin-pink animate-wiggle" />
              </div>
              
              {/* Preset Info Card */}
              <div className="inline-block p-6 bg-gradient-to-r from-berlin-orange/30 to-berlin-yellow/30 border-4 border-black rounded-lg mb-6">
                <h3 className="font-pixel text-2xl text-berlin-orange mb-2">{state.currentPreset.name}</h3>
                <p className="text-muted-foreground font-pixel">{state.currentPreset.category}</p>
              </div>
              
              {/* Audio status indicator with enhanced styling */}
              {isQuizPlaying && !state.showFeedback && (
                <div className="flex items-center justify-center gap-3 mb-6 p-4 bg-gradient-to-r from-berlin-red/20 to-berlin-orange/20 border-2 border-berlin-orange rounded-lg">
                  <div className="w-3 h-3 bg-berlin-orange rounded-full animate-pulse"></div>
                  <Volume2 className="w-5 h-5 text-berlin-orange animate-pulse" />
                  <span className="font-pixel text-sm text-berlin-orange">RHYTHM PLAYING...</span>
                </div>
              )}

              {/* Enhanced Beat Indicator for continuous playback */}
              {isQuizPlaying && (
                <div className="flex justify-center gap-3 mb-8">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="relative">
                      <div className={`w-6 h-6 rounded-full border-3 border-black transition-all duration-150 ${
                        i === quizCurrentBeat 
                          ? 'bg-berlin-orange shadow-[0_0_20px_hsl(var(--berlin-orange))] scale-125' 
                          : 'bg-gray-200'
                      }`} />
                      {i === quizCurrentBeat && (
                        <div className="absolute inset-0 rounded-full bg-berlin-orange animate-ping opacity-75"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Beat Selection Grid */}
            <div className="relative mb-8">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="font-pixel text-sm text-berlin-orange bg-berlin-orange/20 px-4 py-2 rounded-lg border-2 border-berlin-orange">
                  SELECT BEATS
                </div>
              </div>
              
              <div className="flex justify-center p-8 bg-gradient-to-br from-berlin-cyan/10 to-berlin-pink/10 border-4 border-black rounded-lg">
                <div className="flex gap-4">
                  {Array.from({ length: 4 }).map((_, beatIndex) => (
                    <div key={beatIndex} className="flex items-center gap-3">
                      {/* Enhanced Main beat button */}
                      <div className="relative">
                        <button 
                          onClick={() => handleBeatSelection(beatIndex, false)} 
                          disabled={state.showFeedback} 
                          className={`
                            w-16 h-16 border-4 border-black font-pixel text-xl transition-all duration-200 transform
                            ${state.selectedMainBeats[beatIndex] 
                              ? 'bg-gradient-to-br from-berlin-red to-red-600 text-white shadow-[0_0_20px_hsl(var(--berlin-red))] scale-110' 
                              : 'bg-white text-gray-700 hover:bg-berlin-red/20 hover:border-berlin-red hover:scale-105'
                            }
                            ${state.showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}
                          `}
                        >
                          {beatIndex + 1}
                        </button>
                        {state.selectedMainBeats[beatIndex] && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-berlin-yellow rounded-full border-2 border-black animate-pulse"></div>
                        )}
                      </div>
                      
                      {/* Enhanced Half beat button (except after last beat) */}
                      {beatIndex < 3 && (
                        <div className="relative">
                          <button 
                            onClick={() => handleBeatSelection(beatIndex, true)} 
                            disabled={state.showFeedback} 
                            className={`
                              w-10 h-10 rounded-full border-3 border-black font-pixel text-sm transition-all duration-200 transform
                              ${state.selectedHalfBeats[beatIndex] 
                                ? 'bg-gradient-to-br from-berlin-orange to-orange-600 text-white shadow-[0_0_15px_hsl(var(--berlin-orange))] scale-110' 
                                : 'bg-white text-gray-700 hover:bg-berlin-orange/20 hover:border-berlin-orange hover:scale-105'
                              }
                              ${state.showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}
                            `}
                          >
                            +
                          </button>
                          {state.selectedHalfBeats[beatIndex] && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-berlin-cyan rounded-full border-2 border-black animate-pulse"></div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Beat Numbers with Enhanced Styling */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((number, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-center font-pixel text-lg w-16 text-berlin-orange bg-berlin-orange/20 py-2 border-2 border-berlin-orange rounded">
                      {number}
                    </div>
                    {index < 3 && (
                      <div className="text-center font-pixel text-sm w-10 text-berlin-cyan bg-berlin-cyan/20 py-2 border-2 border-berlin-cyan rounded-full">
                        +
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Submit Button */}
            {!state.showFeedback && (
              <div className="text-center mb-8">
                <Button 
                  onClick={handleBeatSelectionSubmit} 
                  className="pixel-button text-xl px-16 py-6" 
                  disabled={state.hasSubmitted}
                >
                  <CheckCircle2 className="w-6 h-6 mr-3" />
                  <span className="font-pixel">SUBMIT ANSWER</span>
                </Button>
              </div>
            )}

            {/* Enhanced Feedback Section */}
            {state.showFeedback && (
              <div className={`p-6 rounded-lg border-4 border-black mb-8 relative ${
                state.lastAnswerCorrect 
                  ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' 
                  : 'bg-gradient-to-r from-red-400 to-red-600 text-white'
              }`}>
                <div className="flex items-center justify-center gap-4 mb-6">
                  {state.lastAnswerCorrect ? (
                    <CheckCircle2 className="w-16 h-16 animate-bounce" />
                  ) : (
                    <XCircle className="w-16 h-16 animate-shake" />
                  )}
                  <div className="font-pixel text-3xl">
                    {state.lastAnswerCorrect ? 'PERFECT!' : 'TRY AGAIN!'}
                  </div>
                </div>
                
                {/* Enhanced correct answer display when wrong */}
                {!state.lastAnswerCorrect && (
                  <div className="bg-white/90 p-6 rounded-lg border-3 border-black">
                    <div className="font-pixel text-lg mb-4 text-center text-gray-800">
                      ✨ CORRECT PATTERN ✨
                    </div>
                    
                    {/* Visual representation of correct answer */}
                    <div className="flex justify-center mb-4">
                      <div className="flex gap-4">
                        {Array.from({ length: 4 }).map((_, beatIndex) => (
                          <div key={beatIndex} className="flex items-center gap-3">
                            {/* Correct main beat display */}
                            <div className={`
                                w-16 h-16 border-3 border-black font-pixel text-xl flex items-center justify-center
                                ${state.currentPreset!.mainBeats.includes(beatIndex + 1) 
                                  ? 'bg-gradient-to-br from-berlin-red to-red-600 text-white shadow-[0_0_20px_hsl(var(--berlin-red))]' 
                                  : 'bg-gray-100 border-gray-300 text-gray-400'
                                }
                              `}>
                              {beatIndex + 1}
                            </div>
                            
                            {/* Correct half beat display (except after last beat) */}
                            {beatIndex < 3 && (
                              <div className={`
                                  w-10 h-10 rounded-full border-3 border-black font-pixel text-sm flex items-center justify-center
                                  ${state.currentPreset!.halfBeats.includes(beatIndex + 1) 
                                    ? 'bg-gradient-to-br from-berlin-orange to-orange-600 text-white shadow-[0_0_15px_hsl(var(--berlin-orange))]' 
                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }
                                `}>
                                +
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Enhanced Progress Bar */}
            <div className="p-6 bg-gradient-to-r from-berlin-purple/20 to-berlin-pink/20 rounded-lg border-4 border-black">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-berlin-orange" />
                  <h3 className="font-pixel text-lg">PROGRESS</h3>
                </div>
                <span className="font-pixel text-xl text-berlin-orange">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="w-full h-4 border-2 border-black" />
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
                You successfully identified each preset three times. You're now a rhythm expert!
              </p>
              <div className="font-pixel text-2xl mb-6 text-berlin-orange">
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
              <div className="font-pixel text-2xl mb-6 text-berlin-orange">
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
        <LeaderboardSubmission
          isOpen={state.showLeaderboardSubmission}
          onClose={() => setState(prev => ({ ...prev, showLeaderboardSubmission: false }))}
          score={finalScore}
          maxScore={maxPossibleScore}
        />
      </div>
    </div>
  );
};

export default Quiz;

}
