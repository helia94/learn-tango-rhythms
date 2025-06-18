import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProfileSection from '@/components/ProfileSection';
import GameProfileDashboard from '@/components/profile/GameProfileDashboard';
import SpotifyConnection from '@/components/SpotifyConnection';
import ProtectedRoute from '@/components/ProtectedRoute';

const Profile = () => {
  const { t } = useTranslation();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige relative overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-32 h-32 bg-paprika rounded-full animate-gentle-bounce"></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-golden-yellow rounded-full transform rotate-45 animate-organic-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-terracotta rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
          {/* Minimal Back Button */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </Link>
          </div>

          {/* Game-style Title */}
          <div className="text-center mb-12">
            <h1 className="boho-title text-5xl md:text-7xl mb-2 font-display text-white drop-shadow-lg">
              YOUR JOURNEY
            </h1>
            <div className="flex justify-center items-center gap-2">
              <div className="w-2 h-2 bg-golden-yellow rounded-full animate-organic-pulse"></div>
              <p className="text-white/80 text-sm font-medium tracking-wider uppercase">
                Keep dancing, keep growing
              </p>
              <div className="w-2 h-2 bg-terracotta rounded-full animate-organic-pulse"></div>
            </div>
          </div>

          {/* Game Dashboard */}
          <div className="mb-8">
            <GameProfileDashboard />
          </div>

          {/* Spotify Integration */}
          <div className="mb-8">
            <SpotifyConnection />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <div className="relative group">
              <Link 
                to="/rhythmlab" 
                className="relative block bg-gradient-to-r from-sage-green to-deep-teal text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-white/20 text-center group-hover:scale-105"
              >
                <span className="font-display tracking-wide">🎵 RHYTHM LAB</span>
              </Link>
            </div>
            
            <div className="relative group">
              <Link 
                to="/roadmap" 
                className="relative block bg-gradient-to-r from-terracotta to-paprika text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-white/20 text-center group-hover:scale-105"
              >
                <span className="font-display tracking-wide">🗺️ ROADMAP</span>
              </Link>
            </div>
          </div>

          {/* Account Info at Bottom */}
          <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
            <ProfileSection />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
