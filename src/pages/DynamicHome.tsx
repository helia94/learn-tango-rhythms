
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { Music, Map, User, LogIn, Zap } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const DynamicHome = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform values for different sections with more spacing
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.6]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const section1Y = useTransform(scrollYProgress, [0.1, 0.25], [100, 0]);
  const section1Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4], [0, 1, 1, 0]);
  
  const section2Y = useTransform(scrollYProgress, [0.25, 0.4], [100, 0]);
  const section2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  
  const section3Y = useTransform(scrollYProgress, [0.4, 0.55], [100, 0]);
  const section3Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
  
  const section4Y = useTransform(scrollYProgress, [0.55, 0.7], [100, 0]);
  const section4Opacity = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);

  const section5Y = useTransform(scrollYProgress, [0.7, 0.85], [100, 0]);
  const section5Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9, 0.95], [0, 1, 1, 0]);

  const finalY = useTransform(scrollYProgress, [0.85, 0.95], [100, 0]);
  const finalOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  return (
    <div 
      ref={containerRef}
      className="min-h-[1000vh] bg-gradient-to-b from-gray-900 via-gray-800 to-black relative overflow-hidden"
    >
      {/* Fixed Language Selector */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* Hero Section - Fixed */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-10"
        style={{ scale: titleScale, opacity: titleOpacity }}
      >
        <div className="text-center px-8">
          <motion.h1 
            className="boho-title text-6xl md:text-9xl lg:text-[12rem] mb-12 font-display text-white font-bold"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            TANGO A DIARIO
          </motion.h1>
          <motion.div 
            className="flex items-center justify-center gap-6 mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Music className="w-12 h-12 text-golden-yellow animate-gentle-bounce" />
            <div className="w-4 h-4 bg-terracotta rounded-full animate-organic-pulse"></div>
            <Zap className="w-10 h-10 text-golden-yellow animate-gentle-bounce delay-300" />
          </motion.div>
        </div>
      </motion.div>

      {/* Section 1 - Tagline */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20 bg-black/80"
        style={{ y: section1Y, opacity: section1Opacity }}
      >
        <div className="text-center px-8">
          <h2 className="text-4xl md:text-8xl lg:text-9xl font-display text-white mb-8 font-bold">
            The Duolingo for
          </h2>
          <h2 className="text-5xl md:text-9xl lg:text-10xl font-display text-golden-yellow font-bold">
            Tango Musicality
          </h2>
        </div>
      </motion.div>

      {/* Section 2 - Practice Message */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20 bg-gray-900/90"
        style={{ y: section2Y, opacity: section2Opacity }}
      >
        <div className="text-center px-8">
          <h3 className="text-3xl md:text-7xl lg:text-8xl font-display text-white leading-relaxed mb-6 font-bold">
            Practice Tango Musicality
          </h3>
          <h3 className="text-4xl md:text-8xl lg:text-9xl font-display text-terracotta mt-8 font-bold">
            for 5 Minutes Every Day
          </h3>
        </div>
      </motion.div>

      {/* Section 3 - Navigation Buttons */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20 bg-gray-800/90"
        style={{ y: section3Y, opacity: section3Opacity }}
      >
        <div className="flex flex-col gap-12 px-8">
          <Link 
            to="/roadmap" 
            className="bg-gradient-to-r from-burnt-orange to-terracotta text-white font-display text-2xl md:text-4xl lg:text-5xl px-16 py-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-2 border-warm-brown/20 text-center font-bold"
          >
            <div className="flex items-center justify-center gap-6">
              <Map className="w-12 h-12 md:w-16 md:h-16" />
              <span>ROAD MAP</span>
            </div>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-8">
            <Link 
              to="/rhythmlab" 
              className="bg-gradient-to-r from-sage-green to-deep-teal text-white font-display text-xl md:text-3xl lg:text-4xl px-12 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-warm-brown/20 text-center font-bold"
            >
              <div className="flex items-center justify-center gap-4">
                <Music className="w-8 h-8 md:w-12 md:h-12" />
                <span>RHYTHM LAB</span>
              </div>
            </Link>
            
            <Link 
              to={user ? "/profile" : "/auth"}
              className="bg-gradient-to-r from-golden-yellow to-dusty-rose text-gray-900 font-display text-xl md:text-3xl lg:text-4xl px-12 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-warm-brown/20 text-center font-bold"
            >
              <div className="flex items-center justify-center gap-4">
                {user ? <User className="w-8 h-8 md:w-12 md:h-12" /> : <LogIn className="w-8 h-8 md:w-12 md:h-12" />}
                <span>{user ? "PROFILE" : "LOGIN"}</span>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Section 4 - Learning Method */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20 bg-gray-900/95"
        style={{ y: section4Y, opacity: section4Opacity }}
      >
        <div className="text-center px-8 max-w-6xl">
          <h3 className="text-2xl md:text-6xl lg:text-7xl font-display text-white leading-relaxed mb-12 font-bold">
            Get One Topic Per Week
          </h3>
          <h3 className="text-3xl md:text-7xl lg:text-8xl font-display text-golden-yellow mb-16 font-bold">
            Learn More About it Every Day
          </h3>
          <p className="text-xl md:text-4xl lg:text-5xl text-white leading-relaxed mb-8 font-medium">
            Track Your Progress - Repeat, Repeat, and then Repeat - until You Can Forget It
          </p>
          <p className="text-lg md:text-3xl lg:text-4xl text-dusty-rose mt-8 font-medium">
            Most topics are about building more contrast in to your dancing and breaking your habits
          </p>
        </div>
      </motion.div>

      {/* Section 5 - Why & Examples */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20 bg-black/95"
        style={{ y: section5Y, opacity: section5Opacity }}
      >
        <div className="px-8 max-w-6xl w-full">
          <Accordion type="single" collapsible className="mb-12">
            <AccordionItem value="why" className="border-white/20">
              <AccordionTrigger className="text-2xl md:text-5xl lg:text-6xl font-display text-white hover:text-golden-yellow font-bold">
                Why?
              </AccordionTrigger>
              <AccordionContent className="text-lg md:text-3xl lg:text-4xl text-white space-y-8 pt-8 font-medium">
                <p>1- Because it took me more than 8 years and many long distance trips to musicality workshops to learn this basic concept that are not even that hard</p>
                <p>2- Because each workshop was 3-4 days, way too much information at once, and I hardly ever went back to practicing them</p>
                <p>3- Because I needed a little inspiration continuously instead of a lot at once</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="text-center space-y-8">
            <p className="text-xl md:text-4xl lg:text-5xl text-white font-medium">
              <span className="font-display text-golden-yellow font-bold">Example topics:</span> Dancing fast and slow, dancing small and big, dancing high and low...
            </p>
            <p className="text-lg md:text-3xl lg:text-4xl text-dusty-rose font-medium">
              <span className="font-display font-bold">Is this free?</span> For now, yes, but paying will increase your motivation five fold.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Final Section - Credits */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20 bg-black"
        style={{ y: finalY, opacity: finalOpacity }}
      >
        <div className="text-center px-8 max-w-6xl">
          <h3 className="text-2xl md:text-5xl lg:text-6xl font-display text-white mb-12 font-bold">
            This is just a proof of concept
          </h3>
          <p className="text-lg md:text-3xl lg:text-4xl text-white mb-16 leading-relaxed font-medium">
            I made it because I had a hunch that others might also need what I needed. 
            If you really really really want it, you're part of this test.
          </p>
          <p className="text-base md:text-2xl lg:text-3xl text-dusty-rose font-medium">
            <span className="font-display text-golden-yellow font-bold">Credits:</span> I am Helia. 
            I learned the most from Horacio Godoy, Michael Lavoca, Pepa Polazón, and Murat Erdemsel.
          </p>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-32 right-32 w-24 h-24 bg-paprika transform rotate-45"></div>
        <div className="absolute bottom-48 left-16 w-32 h-32 bg-sage-green transform rotate-12"></div>
        <div className="absolute top-1/2 right-16 w-20 h-20 bg-golden-yellow transform -rotate-12"></div>
        <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-terracotta transform rotate-45"></div>
      </div>
    </div>
  );
};

export default DynamicHome;
