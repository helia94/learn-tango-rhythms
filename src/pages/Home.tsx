
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { Music, Map, Zap, LogIn, User, ChevronDown, ChevronUp } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
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
    <div className="min-h-screen bg-cream text-dark-brown overflow-hidden relative">
      {/* Mid-Century Modern organic shapes background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Large burnt orange shape in top left */}
        <div 
          className="absolute bg-burnt-orange rounded-full opacity-90" 
          style={{ 
            width: '45%', 
            height: '40%', 
            top: '-5%', 
            left: '-10%',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          }}
        />
        
        {/* Terracotta shape in top right */}
        <div 
          className="absolute bg-terracotta rounded-full opacity-80" 
          style={{ 
            width: '35%', 
            height: '30%', 
            top: '5%', 
            right: '5%',
            borderRadius: '70% 30% 50% 50% / 60% 40% 60% 40%',
          }}
        />
        
        {/* Brown shape in middle right */}
        <div 
          className="absolute bg-warm-brown rounded-full opacity-80" 
          style={{ 
            width: '25%', 
            height: '40%', 
            top: '35%', 
            right: '-5%',
            borderRadius: '50% 50% 70% 30% / 50% 50% 30% 70%',
          }}
        />
        
        {/* Burnt orange shape in bottom left */}
        <div 
          className="absolute bg-burnt-orange rounded-full opacity-70" 
          style={{ 
            width: '40%', 
            height: '45%', 
            bottom: '-15%', 
            left: '-10%',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          }}
        />
        
        {/* Teal accent shape */}
        <div 
          className="absolute bg-teal rounded-full opacity-80" 
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
        {/* Header with Language Selector */}
        <div className="flex justify-between items-center mb-12 pt-4">
          <div className="text-2xl font-medium tracking-wide">
            <span className="text-teal">TANGO</span> <span className="text-burnt-orange">A DIARIO</span>
          </div>
          <LanguageSelector />
        </div>
        
        {/* Hero section with Mid-Century Modern styling */}
        <div 
          className={`relative mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main title area */}
            <div className="md:col-span-7 bg-burnt-orange rounded-[40px] p-8 md:p-12 text-cream">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
                TANGO A DIARIO
              </h1>
              <h2 className="text-xl md:text-2xl mb-6 font-light">
                (Daily Tango)
              </h2>
              <p className="text-lg md:text-xl mb-6">
                The Duolingo for Tango Musicality
              </p>
              <div className="flex items-center gap-4">
                <Music className="w-8 h-8 text-cream" />
                <div className="w-2 h-2 bg-cream rounded-full"></div>
                <Zap className="w-6 h-6 text-cream" />
                <div className="w-2 h-2 bg-cream rounded-full"></div>
                <Map className="w-8 h-8 text-cream" />
              </div>
            </div>
            
            {/* Side content area */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="bg-warm-brown rounded-[30px] p-6 text-cream">
                <h3 className="text-xl font-medium mb-3">About Us</h3>
                <p>
                  Practice Tango Musicality for 5 Minutes Every Day. Get One Topic Per Week and Learn More About it Every Day.
                </p>
              </div>
              
              <div className="bg-mustard rounded-[30px] p-6 text-dark-brown">
                <h3 className="text-xl font-medium mb-3">Upcoming Events</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>05.21.XX</span>
                    <span>Rhythm Workshop</span>
                  </li>
                  <li className="flex justify-between">
                    <span>06.15.XX</span>
                    <span>Musicality Class</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main description section */}
        <div className="mb-16">
          <div className="bg-cream rounded-[30px] p-8 relative overflow-hidden shadow-md">
            {/* Background shape */}
            <div 
              className="absolute bg-burnt-orange opacity-10 rounded-full" 
              style={{ 
                width: '60%', 
                height: '120%', 
                top: '-10%', 
                right: '-20%',
                borderRadius: '70% 30% 50% 50% / 60% 40% 60% 40%',
              }}
            />
            
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-dark-brown relative z-10">
              PRACTICE MUSICALITY
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  <strong>Get One Topic Per Week</strong> and Learn More About it Every Day
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>Track Your Progress</strong> - Repeat, Repeat, and then Repeat - until You Can Forget It
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Most topics are about <strong>building more contrast</strong> into your dancing and <strong>breaking your habits</strong>
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>Example topics:</strong> Dancing fast and slow, dancing small and big, dancing high and low...
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons with Mid-Century styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Road Map Button */}
          <Link 
            to="/roadmap" 
            className="bg-cream border-2 border-burnt-orange text-burnt-orange font-medium text-xl p-6 rounded-[30px] hover:bg-burnt-orange hover:text-cream transition-colors flex items-center justify-between group"
          >
            <span className="font-medium">ROAD MAP</span>
            <Map className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </Link>
          
          {/* Profile/Login Button */}
          <Link 
            to={user ? "/profile" : "/auth"}
            className="bg-teal text-cream font-medium text-xl p-6 rounded-[30px] hover:bg-cream hover:text-teal hover:border-teal border-2 border-teal transition-colors flex items-center justify-between group"
          >
            <span className="font-medium">
              {user ? "PROFILE" : "LOGIN"}
            </span>
            {user ? 
              <User className="w-6 h-6 group-hover:scale-110 transition-transform" /> : 
              <LogIn className="w-6 h-6 group-hover:scale-110 transition-transform" />
            }
          </Link>

          {/* Rhythm Lab Button */}
          <Link 
            to="/rhythmlab" 
            className="bg-cream border-2 border-warm-brown text-warm-brown font-medium text-xl p-6 rounded-[30px] hover:bg-warm-brown hover:text-cream transition-colors flex items-center justify-between group"
          >
            <span className="font-medium">RHYTHM LAB</span>
            <Music className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </Link>
        </div>

        {/* Expandable Sections with Mid-Century styling */}
        <div className="mb-16 bg-cream rounded-[30px] p-6 shadow-md">
          <Accordion type="single" collapsible className="w-full">
            {/* Why Section */}
            <AccordionItem value="why" className="border-b border-burnt-orange/30">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-2xl font-medium text-burnt-orange">
                  WHY?
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-10 h-10 bg-burnt-orange text-cream flex items-center justify-center font-bold rounded-full">1</span>
                    <p className="leading-relaxed pt-2">
                      Because it took me more than 8 years and many long distance trips to musicality workshops to learn basic concepts that are not even that hard
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-10 h-10 bg-terracotta text-cream flex items-center justify-center font-bold rounded-full">2</span>
                    <p className="leading-relaxed pt-2">
                      Because each workshop was 3-4 days, way too much information at once, and I hardly ever went back to practicing them
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-10 h-10 bg-warm-brown text-cream flex items-center justify-center font-bold rounded-full">3</span>
                    <p className="leading-relaxed pt-2">
                      Because I needed a little inspiration continuously instead of a lot at once
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Is this free? Section */}
            <AccordionItem value="pricing" className="border-b border-burnt-orange/30">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-2xl font-medium text-burnt-orange">
                  IS THIS FREE?
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="leading-relaxed">
                  For now, yes, but paying even a little amount will increase your motivation and commitment at least five fold. So, in the future, this will be paid for both our sakes.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Proof of Concept Section */}
            <AccordionItem value="concept" className="border-b border-burnt-orange/30">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-2xl font-medium text-burnt-orange">
                  PROOF OF CONCEPT
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="leading-relaxed">
                  For now, this is just a proof of concept. I made it because I had a hunch that others might also need what I needed. I am testing that hunch. In fact, if you are reading this, you are already part of this test. I will commit to finishing it if I find people who really really really want it :) If you kind of want it, this is not for you yet!
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Credits Section */}
            <AccordionItem value="credits" className="border-b border-burnt-orange/30">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-2xl font-medium text-burnt-orange">
                  CREDITS
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    I am Helia, but the information in the app did not come to me in a dream. It is the result of the work of many Tango Teachers who have invested their life into understanding this music and teaching it. I just like to make this information more accessible.
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-bold">I have personally learned the most from:</span> Horacio Godoy, Michael Lavoca, Pepa Polazón, and Murat Erdemsel.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Footer with Mid-Century styling */}
        <footer className="mt-16 pt-6 border-t border-burnt-orange/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-lg font-medium text-burnt-orange">TANGO A DIARIO © 2025</div>
            <div className="flex gap-6">
              <a href="#" className="text-warm-brown hover:text-burnt-orange transition-colors">Terms</a>
              <a href="#" className="text-warm-brown hover:text-burnt-orange transition-colors">Privacy</a>
              <a href="#" className="text-warm-brown hover:text-burnt-orange transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
