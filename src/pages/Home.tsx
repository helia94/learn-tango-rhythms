
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ProfileSection from "@/components/ProfileSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, Users, Trophy, Map, LogIn } from "lucide-react";

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-sandy-beige to-warm-brown">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-terracotta border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sandy-beige to-warm-brown p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl md:text-6xl font-display text-warm-brown mb-4">
            Rhythm Journey
          </h1>
          <p className="text-xl text-mushroom max-w-2xl mx-auto">
            Discover the art of movement through rhythm, tempo, and musical expression
          </p>
        </div>

        {/* Authentication Section */}
        {user ? (
          <div className="mb-12">
            <ProfileSection />
          </div>
        ) : (
          <div className="mb-12 text-center">
            <Card className="inline-block bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-6">
              <h2 className="text-2xl font-display text-warm-brown mb-3">
                Join Our Community
              </h2>
              <p className="text-mushroom mb-4">
                Sign in to track your progress and connect with other dancers
              </p>
              <Link to="/auth">
                <Button className="bg-terracotta hover:bg-burnt-orange text-white rounded-organic">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In / Sign Up
                </Button>
              </Link>
            </Card>
          </div>
        )}

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link to="/exercises/dancing-fast-slow">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-6 h-full hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-terracotta/30 transition-colors">
                  <Music className="w-8 h-8 text-terracotta" />
                </div>
                <h3 className="text-xl font-display text-warm-brown mb-2">
                  Fast & Slow
                </h3>
                <p className="text-mushroom text-sm">
                  Master the art of tempo control and musical dynamics
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/roadmap">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-6 h-full hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-sage-green/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-sage-green/30 transition-colors">
                  <Map className="w-8 h-8 text-sage-green" />
                </div>
                <h3 className="text-xl font-display text-warm-brown mb-2">
                  Road Map
                </h3>
                <p className="text-mushroom text-sm">
                  Track your learning journey and unlock new challenges
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/rhythmlab">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-6 h-full hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-dusty-rose/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-dusty-rose/30 transition-colors">
                  <Users className="w-8 h-8 text-dusty-rose" />
                </div>
                <h3 className="text-xl font-display text-warm-brown mb-2">
                  Rhythm Lab
                </h3>
                <p className="text-mushroom text-sm">
                  Experiment with beats and create your own rhythms
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/rhythmlab/leaderboard">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-6 h-full hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-golden-yellow/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-golden-yellow/30 transition-colors">
                  <Trophy className="w-8 h-8 text-golden-yellow" />
                </div>
                <h3 className="text-xl font-display text-warm-brown mb-2">
                  Leaderboard
                </h3>
                <p className="text-mushroom text-sm">
                  See how you rank among rhythm masters worldwide
                </p>
              </div>
            </Card>
          </Link>
        </div>

        {/* Welcome Message */}
        <div className="text-center">
          <Card className="inline-block bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-8 max-w-2xl">
            <h2 className="text-2xl font-display text-warm-brown mb-4">
              Welcome to Your Rhythm Journey
            </h2>
            <p className="text-mushroom leading-relaxed">
              Whether you're a beginner learning to feel the beat or an experienced dancer 
              refining your technique, our interactive exercises will help you develop 
              a deeper connection with music and movement. Start with any section that 
              interests you and progress at your own pace.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
