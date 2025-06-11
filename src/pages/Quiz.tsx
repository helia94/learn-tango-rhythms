import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, Volume2, Trophy, Clock, Target } from 'lucide-react';
import { PresetRhythm } from '@/types/rhythm';
import { presetRhythms } from '@/data/presets';
import { playSound } from '@/utils/audioUtils';
import { useQuizPlayback } from '@/hooks/useQuizPlayback';
import LeaderboardSubmission from '@/components/LeaderboardSubmission';

interface QuizState {
  currentPreset: PresetRhythm | null;
  options: PresetRhythm[];
  correctAnswer: string;
  userAnswer: string;
  score: number;
  currentQuestion: number;
  totalQuestions: number;
  gameStarted: boolean;
  gameFinished: boolean;
  quizType: 'identify' | 'recreate';
  showResults: boolean;
  timeLeft: number;
}

const getRandomPresets = (presets: PresetRhythm[], count: number): PresetRhythm[] => {
  const shuffled = [...presets].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Quiz = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentPreset: null,
    options: [],
    correctAnswer: '',
    userAnswer: '',
    score: 0,
    currentQuestion: 0,
    totalQuestions: 0,
    gameStarted: false,
    gameFinished: false,
    quizType: 'identify',
    showResults: false,
    timeLeft: 30,
  });

  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Create pattern arrays for the quiz playback hook
  const selectedMainBeats = quizState.currentPreset ? 
    new Array(4).fill(false).map((_, i) => quizState.currentPreset!.mainBeats.includes(i + 1)) : 
    new Array(4).fill(false);
  const selectedHalfBeats = quizState.currentPreset ? 
    new Array(4).fill(false).map((_, i) => quizState.currentPreset!.halfBeats.includes(i + 1)) : 
    new Array(4).fill(false);

  const { isPlaying, currentBeat, togglePlayback } = useQuizPlayback({
    selectedMainBeats,
    selectedHalfBeats
  });

  const startQuiz = useCallback(() => {
    const totalQuestions = selectedDifficulty === 'easy' ? 5 : selectedDifficulty === 'medium' ? 10 : 15;
    const initialPresets = getRandomPresets(presetRhythms, totalQuestions);

    setQuizState(prevState => ({
      ...prevState,
      totalQuestions: totalQuestions,
      currentQuestion: 1,
      score: 0,
      gameStarted: true,
      gameFinished: false,
      showResults: false,
      currentPreset: initialPresets[0],
      options: getRandomPresets(presetRhythms.filter(p => p.name !== initialPresets[0].name), 3).concat(initialPresets[0]),
      correctAnswer: initialPresets[0].name,
      userAnswer: '',
      timeLeft: 30,
    }));
  }, [selectedDifficulty]);

  useEffect(() => {
    if (quizState.gameStarted && !quizState.gameFinished) {
      let timerId: NodeJS.Timeout;
      if (quizState.timeLeft > 0) {
        timerId = setTimeout(() => {
          setQuizState(prevState => ({ ...prevState, timeLeft: prevState.timeLeft - 1 }));
        }, 1000);
      } else {
        submitAnswer();
      }
      return () => clearTimeout(timerId);
    }
  }, [quizState.gameStarted, quizState.gameFinished, quizState.timeLeft]);

  const handlePlaySound = useCallback(() => {
    if (quizState.currentPreset) {
      // Use the sound type directly from the track
      playSound('bass', false);
    }
  }, [quizState.currentPreset]);

  const submitAnswer = () => {
    const isCorrect = quizState.userAnswer === quizState.correctAnswer;
    setQuizState(prevState => ({
      ...prevState,
      score: isCorrect ? prevState.score + 1 : prevState.score,
      showResults: true,
      timeLeft: 0,
    }));
  };

  const nextQuestion = () => {
    if (quizState.currentQuestion < quizState.totalQuestions) {
      const nextQuestionNumber = quizState.currentQuestion + 1;
      const nextPreset = getRandomPresets(presetRhythms, 1)[0];
      setQuizState(prevState => ({
        ...prevState,
        currentQuestion: nextQuestionNumber,
        currentPreset: nextPreset,
        options: getRandomPresets(presetRhythms.filter(p => p.name !== nextPreset.name), 3).concat(nextPreset),
        correctAnswer: nextPreset.name,
        userAnswer: '',
        showResults: false,
        timeLeft: 30,
      }));
    } else {
      setQuizState(prevState => ({
        ...prevState,
        gameFinished: true,
        gameStarted: false,
        showResults: false,
      }));
      setShowLeaderboard(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Rhythm Quiz Challenge
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your rhythm recognition skills! Listen to patterns and identify them or recreate what you hear.
          </p>
        </div>

        {!quizState.gameStarted && !quizState.gameFinished && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-pink-50 to-orange-50">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800">Choose Your Challenge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quiz Type Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 text-center">Game Mode</h3>
                <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                  <Button
                    variant={quizState.quizType === 'identify' ? 'default' : 'outline'}
                    onClick={() => setQuizState(prev => ({ ...prev, quizType: 'identify' }))}
                    className={`flex-1 h-auto py-4 px-6 ${
                      quizState.quizType === 'identify' 
                        ? 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white shadow-lg' 
                        : 'border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold">Identify Rhythms</div>
                      <div className="text-sm opacity-90">Listen and choose the correct pattern</div>
                    </div>
                  </Button>
                  <Button
                    variant={quizState.quizType === 'recreate' ? 'default' : 'outline'}
                    onClick={() => setQuizState(prev => ({ ...prev, quizType: 'recreate' }))}
                    className={`flex-1 h-auto py-4 px-6 ${
                      quizState.quizType === 'recreate' 
                        ? 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white shadow-lg' 
                        : 'border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold">Recreate Rhythms</div>
                      <div className="text-sm opacity-90">Listen and recreate the pattern</div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Difficulty Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 text-center">Difficulty</h3>
                <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                  {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`flex-1 py-3 px-4 capitalize ${
                        selectedDifficulty === difficulty
                          ? 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white shadow-lg'
                          : 'border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={startQuiz}
                className="w-full max-w-md mx-auto block bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 hover:from-pink-700 hover:via-rose-600 hover:to-orange-600 text-white py-4 text-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        )}

        {quizState.gameStarted && !quizState.gameFinished && (
          <div className="space-y-6">
            {/* Progress and Stats */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-white via-pink-50 to-orange-50">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-pink-600 mb-2">
                      <Target className="w-5 h-5" />
                      <span className="font-semibold">Question</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {quizState.currentQuestion} / {quizState.totalQuestions}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-orange-600 mb-2">
                      <Trophy className="w-5 h-5" />
                      <span className="font-semibold">Score</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{quizState.score}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-rose-600 mb-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">Time</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{quizState.timeLeft}s</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-pink-600 mb-2">
                      <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                        {quizState.quizType.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Progress 
                  value={(quizState.currentQuestion / quizState.totalQuestions) * 100} 
                  className="h-3 bg-gradient-to-r from-pink-100 to-orange-100"
                />
              </CardContent>
            </Card>

            {/* Question */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white via-pink-50 to-orange-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                  {quizState.quizType === 'identify' ? 'Which rhythm is playing?' : 'Recreate this rhythm:'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Playback Controls */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={togglePlayback}
                    className={`px-8 py-4 text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200 ${
                      isPlaying 
                        ? 'bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600' 
                        : 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600'
                    } text-white`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-6 h-6 mr-2" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6 mr-2" />
                        Play
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={handlePlaySound}
                    variant="outline"
                    className="px-6 py-4 border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50 text-pink-700 shadow-lg"
                  >
                    <Volume2 className="w-6 h-6 mr-2" />
                    Play Sound
                  </Button>
                </div>

                {/* Answer Options */}
                {quizState.quizType === 'identify' && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-center text-gray-700">Choose the correct rhythm:</h4>
                    <div className="grid gap-3">
                      {quizState.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={quizState.userAnswer === option.name ? 'default' : 'outline'}
                          onClick={() => setQuizState(prev => ({ ...prev, userAnswer: option.name }))}
                          className={`p-4 h-auto text-left font-bold ${
                            quizState.userAnswer === option.name
                              ? 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white shadow-lg'
                              : 'border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50 text-gray-800'
                          } transition-all duration-200 transform hover:scale-102`}
                        >
                          <div className="space-y-1">
                            <div className="text-lg font-bold">{option.name}</div>
                            <div className="text-sm opacity-80">Category: {option.category}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    onClick={submitAnswer}
                    disabled={!quizState.userAnswer}
                    className="px-12 py-4 text-lg font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 hover:from-pink-700 hover:via-rose-600 hover:to-orange-600 text-white shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                  >
                    Submit Answer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Modal */}
        {quizState.showResults && (
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-pink-50 to-orange-50">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className={`text-6xl ${quizState.userAnswer === quizState.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
                  {quizState.userAnswer === quizState.correctAnswer ? '🎉' : '❌'}
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {quizState.userAnswer === quizState.correctAnswer ? 'Correct!' : 'Incorrect!'}
                </h3>
                <p className="text-lg text-gray-600">
                  The correct answer was: <span className="font-bold text-pink-600">{quizState.correctAnswer}</span>
                </p>
                <Button
                  onClick={nextQuestion}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold shadow-lg"
                >
                  Next Question
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Final Results */}
        <LeaderboardSubmission 
          isOpen={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
          score={quizState.score} 
          maxScore={quizState.totalQuestions}
        />
      </div>
    </div>
  );
};

export default Quiz;

}
