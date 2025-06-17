
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProfileSection from '@/components/ProfileSection';
import ProfileDashboard from '@/components/profile/ProfileDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

const Profile = () => {
  const { t } = useTranslation();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige relative overflow-hidden">
        {/* Geometric shapes for abstract design */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-32 right-32 w-16 h-16 bg-paprika transform rotate-45"></div>
          <div className="absolute bottom-48 left-16 w-20 h-20 bg-sage-green transform rotate-12"></div>
          <div className="absolute top-1/2 right-16 w-12 h-12 bg-golden-yellow transform -rotate-12"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-terracotta transform rotate-45"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
          {/* Back to Home Button */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-warm-brown hover:text-terracotta transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>

          {/* Page Title */}
          <div className="text-center mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/20 to-terracotta/20 rounded-3xl transform rotate-1"></div>
              <div className="relative bg-cream/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-warm-brown/20">
                <h1 className="boho-title text-4xl md:text-6xl mb-4 font-display text-warm-brown">
                  YOUR PROFILE
                </h1>
                <p className="boho-subtitle text-lg text-mushroom">
                  Track your tango journey and celebrate your progress
                </p>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="mb-8">
            <ProfileSection />
          </div>

          {/* Habit Building Dashboard */}
          <div className="mb-8">
            <ProfileDashboard />
          </div>

          {/* Quick Actions */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-sage-green to-deep-teal rounded-xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
              <Link 
                to="/rhythmlab" 
                className="relative block bg-gradient-to-r from-sage-green to-deep-teal text-cream font-medium text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-warm-brown/20 text-center"
              >
                <span className="font-display tracking-wide">ENTER RHYTHM LAB</span>
              </Link>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-terracotta to-paprika rounded-xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
              <Link 
                to="/roadmap" 
                className="relative block bg-gradient-to-r from-burnt-orange to-terracotta text-cream font-medium text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-warm-brown/20 text-center"
              >
                <span className="font-display tracking-wide">VIEW ROAD MAP</span>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center items-center gap-8 opacity-60">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-warm-brown to-transparent"></div>
            <div className="w-3 h-3 bg-golden-yellow rounded-full animate-organic-pulse"></div>
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-warm-brown to-transparent"></div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
