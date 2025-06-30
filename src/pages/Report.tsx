
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { AlertTriangle, Mail, Phone, ArrowLeft, MessageCircle } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

const Report = () => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  // Set loaded state after a short delay for entrance animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sandy-beige/30 via-cream to-mushroom/20 text-warm-brown overflow-hidden relative">
      {/* Same background shapes as Home page */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute bg-gradient-to-br from-terracotta/30 to-burnt-orange/20 rounded-full opacity-60" 
          style={{ 
            width: '45%', 
            height: '40%', 
            top: '-5%', 
            left: '-10%',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          }}
        />
        
        <div 
          className="absolute bg-gradient-to-bl from-warm-brown/25 to-caramel/15 rounded-full opacity-70" 
          style={{ 
            width: '35%', 
            height: '30%', 
            top: '5%', 
            right: '5%',
            borderRadius: '70% 30% 50% 50% / 60% 40% 60% 40%',
          }}
        />
        
        <div 
          className="absolute bg-gradient-to-l from-sandy-beige/40 to-mushroom/25 rounded-full opacity-50" 
          style={{ 
            width: '25%', 
            height: '40%', 
            top: '35%', 
            right: '-5%',
            borderRadius: '50% 50% 70% 30% / 50% 50% 30% 70%',
          }}
        />
        
        <div 
          className="absolute bg-gradient-to-tr from-burnt-orange/20 to-terracotta/15 rounded-full opacity-60" 
          style={{ 
            width: '40%', 
            height: '45%', 
            bottom: '-15%', 
            left: '-10%',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          }}
        />
        
        <div 
          className="absolute bg-gradient-to-tl from-sage-green/20 to-deep-teal/10 rounded-full opacity-60" 
          style={{ 
            width: '20%', 
            height: '25%', 
            bottom: '20%', 
            right: '15%',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          }}
        />
      </div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-12 pt-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-cream bg-warm-brown/80 px-4 py-2 rounded-full hover:bg-warm-brown transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="text-2xl font-medium tracking-wide">
              <span className="text-sage-green">REPORT</span> <span className="text-burnt-orange/80">PROBLEM</span>
            </div>
          </div>
          <LanguageSelector />
        </div>
        
        {/* Hero section */}
        <div 
          className={`relative mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main title area */}
            <div className="md:col-span-7 bg-gradient-to-br from-terracotta/80 to-warm-brown/70 rounded-[40px] p-8 md:p-12 text-cream shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <AlertTriangle className="w-12 h-12" />
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Report a Problem
                </h1>
              </div>
              <h2 className="text-xl md:text-2xl mb-6 font-light opacity-90">
                Having issues with Tango A Diario?
              </h2>
              <p className="text-lg md:text-xl mb-6 opacity-95">
                We're here to help! Let us know what's not working and we'll get it fixed.
              </p>
              <div className="flex items-center gap-4">
                <MessageCircle className="w-8 h-8 text-cream/90" />
                <div className="w-2 h-2 bg-cream/80 rounded-full"></div>
                <Mail className="w-6 h-6 text-cream/90" />
                <div className="w-2 h-2 bg-cream/80 rounded-full"></div>
                <Phone className="w-8 h-8 text-cream/90" />
              </div>
            </div>
            
            {/* Contact info area */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="bg-gradient-to-br from-warm-brown/70 to-caramel/60 rounded-[30px] p-6 text-cream shadow-md">
                <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Us
                </h3>
                <p className="opacity-95 text-lg">
                  hello@tango-diario.com
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-sage-green/70 to-deep-teal/60 rounded-[30px] p-6 text-cream shadow-md">
                <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Us
                </h3>
                <p className="opacity-95 text-lg">
                  +49 174 5764613
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-terracotta/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-lg font-medium text-terracotta/80">© 2024 Tango A Diario</div>
            <div className="flex gap-6">
              <Link to="/terms" className="text-warm-brown/80 hover:text-terracotta/80 transition-colors">Terms</Link>
              <Link to="/privacy" className="text-warm-brown/80 hover:text-terracotta/80 transition-colors">Privacy</Link>
              <Link to="/contact" className="text-warm-brown/80 hover:text-terracotta/80 transition-colors">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Report;
