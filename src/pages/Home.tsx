
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 overflow-hidden relative">
      {/* Organic shapes background adapted to roadmap colors */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Large blue-gray shape in top left */}
        <div 
          className="absolute bg-blue-200/60 rounded-full opacity-90" 
          style={{ 
            width: '45%', 
            height: '40%', 
            top: '-5%', 
            left: '-10%',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          }}
        />
        
        {/* Purple shape in top right */}
        <div 
          className="absolute bg-purple-200/50 rounded-full opacity-80" 
          style={{ 
            width: '35%', 
            height: '30%', 
            top: '5%', 
            right: '5%',
            borderRadius: '70% 30% 50% 50% / 60% 40% 60% 40%',
          }}
        />
        
        {/* Green shape in middle right */}
        <div 
          className="absolute bg-green-200/40 rounded-full opacity-80" 
          style={{ 
            width: '25%', 
            height: '40%', 
            top: '35%', 
            right: '-5%',
            borderRadius: '50% 50% 70% 30% / 50% 50% 30% 70%',
          }}
        />
        
        {/* Orange shape in bottom left */}
        <div 
          className="absolute bg-orange-200/50 rounded-full opacity-70" 
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
          className="absolute bg-teal-200/60 rounded-full opacity-80" 
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
            <span className="text-blue-600">TANGO</span> <span className="text-purple-600">A DIARIO</span>
          </div>
          <LanguageSelector />
        </div>
        
        {/* Hero section */}
        <div 
          className={`relative mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main title area */}
            <div className="md:col-span-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[40px] p-8 md:p-12 text-white shadow-xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
                TANGO A DIARIO
              </h1>
              <h2 className="text-xl md:text-2xl mb-6 font-light opacity-90">
                (Daily Tango)
              </h2>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                The Duolingo for Tango Musicality
              </p>
              <div className="flex items-center gap-4">
                <Music className="w-8 h-8 text-white" />
                <div className="w-2 h-2 bg-white rounded-full opacity-70"></div>
                <Zap className="w-6 h-6 text-white" />
                <div className="w-2 h-2 bg-white rounded-full opacity-70"></div>
                <Map className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {/* Side content area */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-[30px] p-6 text-white shadow-lg">
                <h3 className="text-xl font-medium mb-3">About Us</h3>
                <p className="opacity-90">
                  Practice Tango Musicality for 5 Minutes Every Day. Get One Topic Per Week and Learn More About it Every Day.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-[30px] p-6 text-gray-800 shadow-lg">
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
          <div className="bg-white/80 backdrop-blur-sm rounded-[30px] p-8 relative overflow-hidden shadow-lg border border-gray-200/50">
            {/* Background shape */}
            <div 
              className="absolute bg-gradient-to-r from-blue-100 to-purple-100 opacity-50 rounded-full" 
              style={{ 
                width: '60%', 
                height: '120%', 
                top: '-10%', 
                right: '-20%',
                borderRadius: '70% 30% 50% 50% / 60% 40% 60% 40%',
              }}
            />
            
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-800 relative z-10">
              PRACTICE MUSICALITY
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-gray-700">
                  <strong className="text-gray-800">Get One Topic Per Week</strong> and Learn More About it Every Day
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  <strong className="text-gray-800">Track Your Progress</strong> - Repeat, Repeat, and then Repeat - until You Can Forget It
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-gray-700">
                  Most topics are about <strong className="text-gray-800">building more contrast</strong> into your dancing and <strong className="text-gray-800">breaking your habits</strong>
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  <strong className="text-gray-800">Example topics:</strong> Dancing fast and slow, dancing small and big, dancing high and low...
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Road Map Button */}
          <Link 
            to="/roadmap" 
            className="bg-white border-2 border-blue-500 text-blue-600 font-medium text-xl p-6 rounded-[30px] hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-between group shadow-lg"
          >
            <span className="font-medium">ROAD MAP</span>
            <Map className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </Link>
          
          {/* Profile/Login Button */}
          <Link 
            to={user ? "/profile" : "/auth"}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-xl p-6 rounded-[30px] hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-between group shadow-lg"
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
            className="bg-white border-2 border-green-500 text-green-600 font-medium text-xl p-6 rounded-[30px] hover:bg-green-500 hover:text-white transition-colors flex items-center justify-between group shadow-lg"
          >
            <span className="font-medium">RHYTHM LAB</span>
            <Music className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </Link>
        </div>

        {/* Expandable Sections */}
        <div className="mb-16 bg-white/80 backdrop-blur-sm rounded-[30px] p-6 shadow-lg border border-gray-200/50">
          <Accordion type="single" collapsible className="w-full">
            {/* Why Section */}
            <AccordionItem value="why" className="border-b border-gray-200">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-2xl font-medium text-blue-600">
                  WHY?
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white flex items-center justify-center font-bold rounded-full">1</span>
                    <p className="leading-relaxed pt-2 text-gray-700">
                      Because it took me more than 8 years and many long distance trips to musicality workshops to learn basic concepts that are not even that hard
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white flex items-center justify-center font-bold rounded-full">2</span>
                    <p className="leading-relaxed pt-2 text-gray-700">
                      Because each workshop was 3-4 days, way too much information at once, and I hardly ever went back to practicing them
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-10 h-10 bg-green-500 text-white flex items-center justify-center font-bold rounded-full">3</span>
                    <p className="leading-relaxed pt-2 text-gray-700">
                      Because I needed a little inspiration continuously instead of a lot at once
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Is this free? Section */}
            <AccordionItem value="pricing" className="border-b border-gray-200">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-2xl font-medium text-blue-600">
                  IS THIS FREE?
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="leading-relaxed text-gray-700">
                  For now, yes, but paying even a little amount will increase your motivation and commitment at least five fold. So, in the future, this will be paid for both our sakes.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Proof of Concept Section */}
            <AccordionItem value="concept" className="border-b border-gray-200">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-2xl font-medium text-blue-600">
                  PROOF OF CONCEPT
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="leading-relaxed text-gray-700">
                  For now, this is just a proof of concept. I made it because I had a hunch that others might also need what I needed. I am testing that hunch. In fact, if you are reading this, you are already part of this test. I will commit to finishing it if I find people who really really really want it :) If you kind of want it, this is not for you yet!
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Credits Section */}
            <AccordionItem value="credits" className="border-b border-gray-200">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-2xl font-medium text-blue-600">
                  CREDITS
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4">
                  <p className="leading-relaxed text-gray-700">
                    I am Helia, but the information in the app did not come to me in a dream. It is the result of the work of many Tango Teachers who have invested their life into understanding this music and teaching it. I just like to make this information more accessible.
                  </p>
                  <p className="leading-relaxed text-gray-700">
                    <span className="font-bold text-gray-800">I have personally learned the most from:</span> Horacio Godoy, Michael Lavoca, Pepa Polazón, and Murat Erdemsel.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-lg font-medium text-blue-600">TANGO A DIARIO © 2025</div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
