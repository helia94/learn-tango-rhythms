
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SpotifyProvider } from "@/contexts/SpotifyContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FeatureFlagsProvider } from "@/contexts/FeatureFlagsContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Lazy load components
const DynamicHome = lazy(() => import("@/pages/DynamicHome"));
const Home = lazy(() => import("@/pages/Home"));
const Auth = lazy(() => import("@/pages/Auth"));
const Profile = lazy(() => import("@/pages/Profile"));
const RoadMap = lazy(() => import("@/pages/RoadMap"));
const DancingFastSlow = lazy(() => import("@/pages/exercises/DancingFastSlow"));
const DancingFastSlowAssignments = lazy(() => import("@/pages/exercises/DancingFastSlowAssignments"));
const DancingSmallBig = lazy(() => import("@/pages/exercises/DancingSmallBig"));
const DancingSmallBigAssignments = lazy(() => import("@/pages/exercises/DancingSmallBigAssignments"));
const Quiz = lazy(() => import("@/pages/Quiz"));
const Leaderboard = lazy(() => import("@/pages/Leaderboard"));
const SpotifyCallback = lazy(() => import("@/pages/SpotifyCallback"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Index = lazy(() => import("@/pages/Index"));

// Create a wrapper component for AllAssignmentsPage with default props
const AllAssignmentsWrapper = () => {
  const AllAssignmentsPage = lazy(() => import("@/components/AllAssignmentsPage"));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllAssignmentsPage 
        titleKey="assignments.title"
        descriptionKey="assignments.description"
        backRoute="/roadmap"
        weeklyAssignments={[]}
        topicKey="general"
        topicSlug="general"
        currentWeek={1}
      />
    </Suspense>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <FeatureFlagsProvider>
        <AuthProvider>
          <SpotifyProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cream"></div>
                </div>}>
                  <Routes>
                    <Route path="/" element={<DynamicHome />} />
                    <Route path="/old-home" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/roadmap" element={<RoadMap />} />
                    <Route path="/rhythmlab" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                    <Route path="/dancing-fast-slow" element={<ProtectedRoute><DancingFastSlow /></ProtectedRoute>} />
                    <Route path="/dancing-fast-slow/assignments" element={<ProtectedRoute><DancingFastSlowAssignments /></ProtectedRoute>} />
                    <Route path="/dancing-small-big" element={<ProtectedRoute><DancingSmallBig /></ProtectedRoute>} />
                    <Route path="/dancing-small-big/assignments" element={<ProtectedRoute><DancingSmallBigAssignments /></ProtectedRoute>} />
                    <Route path="/assignments" element={<ProtectedRoute><AllAssignmentsWrapper /></ProtectedRoute>} />
                    <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
                    <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
                    <Route path="/spotify/callback" element={<SpotifyCallback />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </SpotifyProvider>
        </AuthProvider>
      </FeatureFlagsProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
