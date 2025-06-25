
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { FeatureFlagsProvider } from "@/contexts/FeatureFlagsContext";
import { TopicVisibilityProvider } from "@/contexts/TopicVisibilityContext";
import { SpotifyProvider } from "@/contexts/SpotifyContext";
import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import RoadMap from "./pages/RoadMap";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import RhythmLabLayout from "./components/layouts/RhythmLabLayout";
import DancingFastSlow from "./pages/exercises/DancingFastSlow";
import DancingFastSlowAssignments from "./pages/exercises/DancingFastSlowAssignments";
import DancingSmallBig from "./pages/exercises/DancingSmallBig";
import DancingSmallBigAssignments from "./pages/exercises/DancingSmallBigAssignments";
import DancingHighLow from "./pages/exercises/DancingHighLow";
import DancingHighLowAssignments from "./pages/exercises/DancingHighLowAssignments";
import DancingCircularLinear from "./pages/exercises/DancingCircularLinear";
import DancingCircularLinearAssignments from "./pages/exercises/DancingCircularLinearAssignments";
import DancingWithWithoutControl from "./pages/exercises/DancingWithWithoutControl";
import DancingWithWithoutControlAssignments from "./pages/exercises/DancingWithWithoutControlAssignments";
import SpotifyCallback from "./pages/SpotifyCallback";
import SecurityAuditPage from "./pages/SecurityAudit";
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Contact from '@/pages/Contact';

const App = () => {
  // Create QueryClient inside component to avoid context issues
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <SpotifyProvider>
            <AudioPlayerProvider>
              <FeatureFlagsProvider>
                <TopicVisibilityProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <Routes>
                        {/* Home page */}
                        <Route path="/" element={<Home />} />
                        
                        {/* Authentication page */}
                        <Route path="/auth" element={<Auth />} />
                        
                        {/* Profile page */}
                        <Route path="/profile" element={<Profile />} />
                        
                        {/* Road Map page */}
                        <Route path="/roadmap" element={<RoadMap />} />
                        
                        {/* Security Audit page */}
                        <Route path="/security-audit" element={<SecurityAuditPage />} />
                        
                        {/* Spotify callback */}
                        <Route path="/spotify/callback" element={<SpotifyCallback />} />
                        
                        {/* Exercise pages */}
                        <Route path="/exercises/dancing-fast-slow" element={<DancingFastSlow />} />
                        <Route path="/exercises/dancing-fast-slow/assignments" element={<DancingFastSlowAssignments />} />
                        <Route path="/exercises/dancing-small-big" element={<DancingSmallBig />} />
                        <Route path="/exercises/dancing-small-big/assignments" element={<DancingSmallBigAssignments />} />
                        <Route path="/exercises/dancing-high-low" element={<DancingHighLow />} />
                        <Route path="/exercises/dancing-high-low/assignments" element={<DancingHighLowAssignments />} />
                        <Route path="/exercises/dancing-circular-linear" element={<DancingCircularLinear />} />
                        <Route path="/exercises/dancing-circular-linear/assignments" element={<DancingCircularLinearAssignments />} />
                        <Route path="/exercises/dancing-with-without-control" element={<DancingWithWithoutControl />} />
                        <Route path="/exercises/dancing-with-without-control/assignments" element={<DancingWithWithoutControlAssignments />} />
                        
                        {/* Rhythm Lab sub-routes */}
                        <Route path="/rhythmlab" element={<RhythmLabLayout />}>
                          <Route index element={<Index />} />
                          <Route path="quiz" element={<Quiz />} />
                          <Route path="leaderboard" element={<Leaderboard />} />
                        </Route>
                        
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/contact" element={<Contact />} />
                        
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </TooltipProvider>
                </TopicVisibilityProvider>
              </FeatureFlagsProvider>
            </AudioPlayerProvider>
          </SpotifyProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
