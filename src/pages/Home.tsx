import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { Music, Map, Zap, LogIn, User, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Set loaded state after a short delay for entrance animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Language Selector in top right with brutalist styling */}
      <div className="absolute top-4 right-4 z-50">
        <div className="border-2 border-red-600">
          <LanguageSelector />
        </div>
      </div>

      {/* Abstract geometric shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute bg-red-600" 
          style={{ 
            width: '40%', 
            height: '30%', 
            top: '5%', 
            left: '0%',
            clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)'
          }}
        />
        <div 
          className="absolute bg-red-600" 
          style={{ 
            width: '25%', 
            height: '40%', 
            bottom: '10%', 
            right: '5%',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)'
          }}
        />
        <div 
          className="absolute bg-red-600" 
          style={{ 
            width: '15%', 
            height: '60%', 
            top: '20%', 
            left: '60%',
            transform: 'skew(-15deg)'
          }}
        />
        <div 
          className="absolute" 
          style={{ 
            width: '20%', 
            height: '10%', 
            bottom: '30%', 
            left: '30%',
            borderTop: '8px solid #dc2626',
            borderBottom: '8px solid #dc2626',
          }}
        />
        <div 
          className="absolute" 
          style={{ 
            width: '15%', 
            height: '15%', 
            top: '40%', 
            right: '40%',
            border: '8px solid #dc2626',
            transform: 'rotate(45deg)'
          }}
        />
        
        {/* Dynamic arrow elements */}
        <div 
          className="absolute" 
          style={{ 
            width: '20%', 
            height: '20%', 
            bottom: '15%', 
            left: '15%',
          }}
        >
          <ArrowRight 
            size={80} 
            className="text-red-600" 
            style={{ 
              transform: `rotate(${mousePosition.x / 50}deg)`,
              transition: 'transform 0.1s ease-out'
            }} 
          />
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12 pt-4">
          <div className="text-2xl font-bold tracking-tighter border-b-4 border-red-600 pb-1">
            TANGO A DIARIO
          </div>
          <div className="flex gap-8 text-xl">
            <Link to="/about" className="hover:text-red-600 transition-colors">ABOUT</Link>
            <Link to="/lessons" className="hover:text-red-600 transition-colors">LESSONS</Link>
            <Link to="/contact" className="hover:text-red-600 transition-colors">CONTACT</Link>
          </div>
        </nav>
        
        {/* Hero section with oversized typography */}
        <div 
          className={`relative mb-24 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
          style={{ height: '70vh' }}
        >
          {/* Massive TANGO text that breaks the grid */}
          <div 
            className="absolute text-[25vw] font-black leading-none tracking-tighter text-red-600 mix-blend-difference"
            style={{ 
              left: '-5vw', 
              top: '-10vh',
              transform: `translate(${mousePosition.x / 100}px, ${mousePosition.y / 100}px)`,
              transition: 'transform 0.5s ease-out'
            }}
          >
            TANGO
          </div>
          
          {/* A DIARIO text positioned asymmetrically */}
          <div 
            className="absolute text-[15vw] font-black leading-none tracking-tighter text-cream-100"
            style={{ 
              right: '5vw', 
              bottom: '5vh',
              transform: `translate(${-mousePosition.x / 150}px, ${-mousePosition.y / 150}px)`,
              transition: 'transform 0.5s ease-out'
            }}
          >
            A DIARIO
          </div>
          
          {/* Subtitle with brutalist styling */}
          <div 
            className="absolute bottom-0 left-0 bg-red-600 p-4 text-2xl font-bold"
            style={{ width: '60%' }}
          >
            THE DUOLINGO FOR TANGO MUSICALITY
          </div>
        </div>
        
        {/* Main content section with asymmetrical layout */}
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-7 bg-black border-4 border-red-600 p-6">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
              PRACTICE TANGO MUSICALITY
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">
              5 MINUTES EVERY DAY
            </h3>
            <div className="space-y-4 text-xl">
              <p className="leading-relaxed">
                <span className="font-bold">GET ONE TOPIC PER WEEK</span> and Learn More About it Every Day
              </p>
              <p className="leading-relaxed">
                <span className="font-bold">TRACK YOUR PROGRESS</span> - Repeat, Repeat, and then Repeat - until You Can Forget It
              </p>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-5 md:mt-24">
            <div className="bg-red-600 p-6 mb-6">
              <p className="text-xl leading-relaxed">
                Most topics are about <span className="font-bold">BUILDING MORE CONTRAST</span> into your dancing and <span className="font-bold">BREAKING YOUR HABITS</span>
              </p>
            </div>
            <div className="border-2 border-white p-6">
              <p className="text-xl leading-relaxed">
                <span className="font-bold">EXAMPLE TOPICS:</span> Dancing fast and slow, dancing small and big, dancing high and low...
              </p>
            </div>
          </div>
        </div>
        
        {/* Action buttons with brutalist styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Road Map Button */}
          <Link 
            to="/roadmap" 
            className="bg-black border-4 border-red-600 text-white font-bold text-2xl p-6 hover:bg-red-600 hover:text-black transition-colors flex items-center justify-between group"
          >
            <span className="font-black tracking-tighter">ROAD MAP</span>
            <Map className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </Link>
          
          {/* Profile/Login Button */}
          <Link 
            to={user ? "/profile" : "/auth"}
            className="bg-red-600 border-4 border-red-600 text-black font-bold text-2xl p-6 hover:bg-black hover:text-red-600 transition-colors flex items-center justify-between group"
          >
            <span className="font-black tracking-tighter">
              {user ? "PROFILE" : "LOGIN"}
            </span>
            {user ? 
              <User className="w-8 h-8 group-hover:scale-110 transition-transform" /> : 
              <LogIn className="w-8 h-8 group-hover:scale-110 transition-transform" />
            }
          </Link>

          {/* Rhythm Lab Button */}
          <Link 
            to="/rhythmlab" 
            className="bg-black border-4 border-white text-white font-bold text-2xl p-6 hover:bg-white hover:text-black transition-colors flex items-center justify-between group"
          >
            <span className="font-black tracking-tighter">RHYTHM LAB</span>
            <Music className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </Link>
        </div>

        {/* Expandable Sections with brutalist styling */}
        <div className="mb-16 border-t-4 border-red-600">
          <Accordion type="single" collapsible className="w-full">
            {/* Why Section */}
            <AccordionItem value="why" className="border-b-4 border-red-600">
              <AccordionTrigger className="py-6 hover:no-underline">
                <span className="text-3xl font-black tracking-tighter text-red-600">
                  WHY?
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-6 text-xl">
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-12 h-12 bg-red-600 text-black flex items-center justify-center font-black text-2xl">1</span>
                    <p className="leading-relaxed pt-2">
                      Because it took me more than 8 years and many long distance trips to musicality workshops to learn basic concepts that are not even that hard
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-12 h-12 bg-red-600 text-black flex items-center justify-center font-black text-2xl">2</span>
                    <p className="leading-relaxed pt-2">
                      Because each workshop was 3-4 days, way too much information at once, and I hardly ever went back to practicing them
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-12 h-12 bg-red-600 text-black flex items-center justify-center font-black text-2xl">3</span>
                    <p className="leading-relaxed pt-2">
                      Because I needed a little inspiration continuously instead of a lot at once
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Is this free? Section */}
            <AccordionItem value="pricing" className="border-b-4 border-red-600">
              <AccordionTrigger className="py-6 hover:no-underline">
                <span className="text-3xl font-black tracking-tighter text-red-600">
                  IS THIS FREE?
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="text-xl leading-relaxed">
                  For now, yes, but paying even a little amount will increase your motivation and commitment at least five fold. So, in the future, this will be paid for both our sakes.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Proof of Concept Section */}
            <AccordionItem value="concept" className="border-b-4 border-red-600">
              <AccordionTrigger className="py-6 hover:no-underline">
                <span className="text-3xl font-black tracking-tighter text-red-600">
                  PROOF OF CONCEPT
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="text-xl leading-relaxed">
                  For now, this is just a proof of concept. I made it because I had a hunch that others might also need what I needed. I am testing that hunch. In fact, if you are reading this, you are already part of this test. I will commit to finishing it if I find people who really really really want it :) If you kind of want it, this is not for you yet!
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Credits Section */}
            <AccordionItem value="credits" className="border-b-4 border-red-600">
              <AccordionTrigger className="py-6 hover:no-underline">
                <span className="text-3xl font-black tracking-tighter text-red-600">
                  CREDITS
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4 text-xl">
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

        {/* Footer with brutalist styling */}
        <footer className="mt-24 border-t-4 border-red-600 pt-6 flex justify-between">
          <div className="text-xl font-bold">TANGO A DIARIO © 2025</div>
          <div className="flex gap-6">
            <a href="#" className="text-xl hover:text-red-600 transition-colors">TERMS</a>
            <a href="#" className="text-xl hover:text-red-600 transition-colors">PRIVACY</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;

