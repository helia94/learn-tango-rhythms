
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { Music, Map, Zap, LogIn } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige relative overflow-hidden">
      {/* Geometric shapes for abstract design */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 right-32 w-16 h-16 bg-paprika transform rotate-45"></div>
        <div className="absolute bottom-48 left-16 w-20 h-20 bg-sage-green transform rotate-12"></div>
        <div className="absolute top-1/2 right-16 w-12 h-12 bg-golden-yellow transform -rotate-12"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-terracotta transform rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Language Selector in top right */}
        <div className="flex justify-end mb-8">
          <LanguageSelector />
        </div>
        
        <div className="text-center">
          {/* Main Title with geometric background */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/20 to-terracotta/20 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-cream/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-warm-brown/20">
              <h1 className="boho-title text-6xl md:text-8xl mb-4 font-display">
                5 MIN TANGO
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <Music className="w-12 h-12 text-burnt-orange animate-gentle-bounce" />
                <div className="w-2 h-2 bg-terracotta rounded-full animate-organic-pulse"></div>
                <Zap className="w-10 h-10 text-golden-yellow animate-gentle-bounce delay-300" />
                <div className="w-2 h-2 bg-sage-green rounded-full animate-organic-pulse delay-500"></div>
                <Map className="w-12 h-12 text-deep-teal animate-gentle-bounce delay-600" />
              </div>
            </div>
          </div>
          
          {/* Description Panel */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-bl from-sage-green/20 to-deep-teal/20 rounded-2xl transform -rotate-1"></div>
            <div className="relative boho-panel p-8">
              <p className="boho-subtitle text-lg mb-8 leading-relaxed">
                PRACTICE TANGO MUSICALITY EVERY DAY FOR 5 MINUTES - TRACK AND SHOW YOUR PROGRESS - BUILD CONTRAST ELEMENTS INTO YOUR DANCE - LEARN ABOUT TANGO RHYTHMS
              </p>
            </div>
          </div>
          
          {/* Action Buttons with geometric backgrounds */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            {/* Road Map Button */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-terracotta to-paprika rounded-xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>
              <Link 
                to="/roadmap" 
                className="relative block bg-gradient-to-r from-burnt-orange to-terracotta text-cream font-medium text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-warm-brown/20"
              >
                <div className="flex items-center justify-center gap-3">
                  <Map className="w-6 h-6" />
                  <span className="font-display tracking-wide">ROAD MAP</span>
                </div>
              </Link>
            </div>
            
            {/* Rhythm Lab Button */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-sage-green to-deep-teal rounded-xl transform -rotate-2 group-hover:-rotate-3 transition-transform duration-300"></div>
              <Link 
                to="/rhythmlab" 
                className="relative block bg-gradient-to-r from-sage-green to-deep-teal text-cream font-medium text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-warm-brown/20"
              >
                <div className="flex items-center justify-center gap-3">
                  <Music className="w-6 h-6" />
                  <span className="font-display tracking-wide">ENTER RHYTHM LAB</span>
                </div>
              </Link>
            </div>

            {/* Login Button - only shown when not authenticated */}
            {!user && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-golden-yellow to-dusty-rose rounded-xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                <Link 
                  to="/auth" 
                  className="relative block bg-gradient-to-r from-golden-yellow to-dusty-rose text-warm-brown font-medium text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-warm-brown/20"
                >
                  <div className="flex items-center justify-center gap-3">
                    <LogIn className="w-6 h-6" />
                    <span className="font-display tracking-wide">LOGIN</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center items-center gap-8 opacity-60">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-warm-brown to-transparent"></div>
            <div className="w-3 h-3 bg-golden-yellow rounded-full animate-organic-pulse"></div>
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-warm-brown to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
