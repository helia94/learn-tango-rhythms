
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { FeatureFlagsProvider } from '@/contexts/FeatureFlagsContext';
import { TopicVisibilityProvider } from '@/contexts/TopicVisibilityContext';
import { DailyExerciseProvider } from '@/contexts/DailyExerciseContext';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Leaderboard from '@/pages/Leaderboard';
import Daily from '@/pages/Daily';
import Exercises from '@/pages/Exercises';
import Topic from '@/pages/Topic';
import Quiz from '@/pages/Quiz';
import { AudioPlayerProvider } from '@/contexts/AudioPlayerContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <AuthProvider>
          <LanguageProvider>
            <FeatureFlagsProvider>
              <TopicVisibilityProvider>
                <AudioPlayerProvider>
                  <DailyExerciseProvider>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/leaderboard" element={<Leaderboard />} />
                      <Route path="/daily" element={<Daily />} />
                      <Route path="/exercises" element={<Exercises />} />
                      <Route path="/topic/:topicKey/:topicIndex" element={<Topic />} />
                      <Route path="/quiz" element={<Quiz />} />
                    </Routes>
                  </DailyExerciseProvider>
                </AudioPlayerProvider>
              </TopicVisibilityProvider>
            </FeatureFlagsProvider>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
