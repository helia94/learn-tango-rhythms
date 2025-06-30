import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { FeatureFlagsProvider } from "@/contexts/FeatureFlagsContext";
import { TopicVisibilityProvider } from "@/contexts/TopicVisibilityContext";
import { SpotifyProvider } from "@/contexts/SpotifyContext";
import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import RoadMap from "./pages/RoadMap";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Report from "./pages/Report";
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

// Component to handle Google Analytics initialization
const GoogleAnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  useGoogleAnalytics();
  return <>{children}</>;
};

const App = () => {
  // SECURITY: Implement security headers and HTTPS enforcement
  useEffect(() => {
    // Force HTTPS redirect
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      window.location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`);
      return;
    }

    // Set security headers via meta tags (limited effectiveness but helps)
    const setMetaHeader = (httpEquiv: string, content: string) => {
      const existing = document.querySelector(`meta[http-equiv="${httpEquiv}"]`);
      if (existing) {
        existing.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.httpEquiv = httpEquiv;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // SECURITY: Content Security Policy - Updated to allow Google Analytics
    setMetaHeader('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' https://sdk.scdn.co https://www.googletagmanager.com; " +
      "style-src 'self' 'unsafe-inline'; " +
      "connect-src 'self' https://*.supabase.co https://accounts.spotify.com https://api.spotify.com https://www.google-analytics.com https://analytics.google.com; " +
      "img-src 'self' data: https: https://www.google-analytics.com; " +
      "media-src 'self' https:; " +
      "frame-src 'self' https://open.spotify.com https://sdk.scdn.co;"
    );

    // SECURITY: Additional headers (remove X-Frame-Options as it conflicts with CSP)
    setMetaHeader('X-Content-Type-Options', 'nosniff');
    setMetaHeader('X-XSS-Protection', '1; mode=block');
    setMetaHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  }, []);

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
                      <GoogleAnalyticsWrapper>
                        <Routes>
                          {/* Home page */}
                          <Route path="/" element={<Home />} />
                          
                          {/* Authentication page */}
                          <Route path="/auth" element={<Auth />} />
                          
                          {/* Profile page */}
                          <Route path="/profile" element={<Profile />} />
                          
                          {/* Road Map page */}
                          <Route path="/roadmap" element={<RoadMap />} />
                          
                          {/* Report Problem page */}
                          <Route path="/report" element={<Report />} />
                          
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
                      </GoogleAnalyticsWrapper>
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
