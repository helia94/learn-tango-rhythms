
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import RoadMap from "./pages/RoadMap";
import NotFound from "./pages/NotFound";
import RhythmLabLayout from "./components/layouts/RhythmLabLayout";

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
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Home page */}
              <Route path="/" element={<Home />} />
              
              {/* Road Map page */}
              <Route path="/roadmap" element={<RoadMap />} />
              
              {/* Rhythm Lab sub-routes */}
              <Route path="/rhythmlab" element={<RhythmLabLayout />}>
                <Route index element={<Index />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="leaderboard" element={<Leaderboard />} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
