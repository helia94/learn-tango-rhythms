
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

  // Transform values for different sections
  const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  const section1Y = useTransform(scrollYProgress, [0.05, 0.2], [100, 0]);
  const section1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
  
  const section2Y = useTransform(scrollYProgress, [0.2, 0.35], [100, 0]);
  const section2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  
  const section3Y = useTransform(scrollYProgress, [0.35, 0.5], [100, 0]);
  const section3Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  
  const section4Y = useTransform(scrollYProgress, [0.5, 0.65], [100, 0]);
  const section4Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);

  const section5Y = useTransform(scrollYProgress, [0.65, 0.8], [100, 0]);
  const section5Opacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0]);

  const finalY = useTransform(scrollYProgress, [0.8, 0.95], [100, 0]);
  const finalOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

  return (
    <div 
      ref={containerRef}
      className="min-h-[800vh] bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige relative overflow-hidden"
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
        <div className="text-center px-4">
          <motion.h1 
            className="boho-title text-4xl md:text-8xl mb-8 font-display text-cream"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            TANGO A DIARIO
          </motion.h1>
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Music className="w-8 h-8 text-burnt-orange animate-gentle-bounce" />
            <div className="w-2 h-2 bg-terracotta rounded-full animate-organic-pulse"></div>
            <Zap className="w-6 h-6 text-golden-yellow animate-gentle-bounce delay-300" />
          </motion.div>
        </div>
      </motion.div>

      {/* Section 1 - Tagline */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20"
        style={{ y: section1Y, opacity: section1Opacity }}
      >
        <div className="text-center px-4">
          <h2 className="text-2xl md:text-6xl font-display text-cream mb-4">
            The Duolingo for
          </h2>
          <h2 className="text-3xl md:text-7xl font-display text-golden-yellow">
            Tango Musicality
          </h2>
        </div>
      </motion.div>

      {/* Section 2 - Practice Message */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20"
        style={{ y: section2Y, opacity: section2Opacity }}
      >
        <div className="text-center px-4">
          <h3 className="text-xl md:text-5xl font-display text-cream leading-relaxed">
            Practice Tango Musicality
          </h3>
          <h3 className="text-2xl md:text-6xl font-display text-terracotta mt-4">
            for 5 Minutes Every Day
          </h3>
        </div>
      </motion.div>

      {/* Section 3 - Navigation Buttons */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20"
        style={{ y: section3Y, opacity: section3Opacity }}
      >
        <div className="flex flex-col gap-8 px-4">
          <Link 
            to="/roadmap" 
            className="bg-gradient-to-r from-burnt-orange to-terracotta text-cream font-display text-xl md:text-3xl px-12 py-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-2 border-warm-brown/20 text-center"
          >
            <div className="flex items-center justify-center gap-4">
              <Map className="w-8 h-8" />
              <span>ROAD MAP</span>
            </div>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              to="/rhythmlab" 
              className="bg-gradient-to-r from-sage-green to-deep-teal text-cream font-display text-lg md:text-2xl px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-warm-brown/20 text-center"
            >
              <div className="flex items-center justify-center gap-3">
                <Music className="w-6 h-6" />
                <span>RHYTHM LAB</span>
              </div>
            </Link>
            
            <Link 
              to={user ? "/profile" : "/auth"}
              className="bg-gradient-to-r from-golden-yellow to-dusty-rose text-warm-brown font-display text-lg md:text-2xl px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-warm-brown/20 text-center"
            >
              <div className="flex items-center justify-center gap-3">
                {user ? <User className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
                <span>{user ? "PROFILE" : "LOGIN"}</span>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Section 4 - Learning Method */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20"
        style={{ y: section4Y, opacity: section4Opacity }}
      >
        <div className="text-center px-4 max-w-4xl">
          <h3 className="text-lg md:text-4xl font-display text-cream leading-relaxed mb-6">
            Get One Topic Per Week
          </h3>
          <h3 className="text-xl md:text-5xl font-display text-golden-yellow mb-8">
            Learn More About it Every Day
          </h3>
          <p className="text-base md:text-2xl text-cream/90 leading-relaxed">
            Track Your Progress - Repeat, Repeat, and then Repeat - until You Can Forget It
          </p>
          <p className="text-sm md:text-xl text-dusty-rose mt-4">
            Most topics are about building more contrast in to your dancing and breaking your habits
          </p>
        </div>
      </motion.div>

      {/* Section 5 - Why & Examples */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20"
        style={{ y: section5Y, opacity: section5Opacity }}
      >
        <div className="px-4 max-w-4xl w-full">
          <Accordion type="single" collapsible className="mb-8">
            <AccordionItem value="why" className="border-cream/20">
              <AccordionTrigger className="text-xl md:text-3xl font-display text-cream hover:text-golden-yellow">
                Why?
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-lg text-cream/90 space-y-4 pt-4">
                <p>1- Because it took me more than 8 years and many long distance trips to musicality workshops to learn this basic concept that are not even that hard</p>
                <p>2- Because each workshop was 3-4 days, way too much information at once, and I hardly ever went back to practicing them</p>
                <p>3- Because I needed a little inspiration continuously instead of a lot at once</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="text-center space-y-4">
            <p className="text-base md:text-xl text-cream">
              <span className="font-display text-golden-yellow">Example topics:</span> Dancing fast and slow, dancing small and big, dancing high and low...
            </p>
            <p className="text-sm md:text-lg text-dusty-rose">
              <span className="font-display">Is this free?</span> For now, yes, but paying will increase your motivation five fold.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Final Section - Credits */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20"
        style={{ y: finalY, opacity: finalOpacity }}
      >
        <div className="text-center px-4 max-w-4xl">
          <h3 className="text-lg md:text-3xl font-display text-cream mb-6">
            This is just a proof of concept
          </h3>
          <p className="text-sm md:text-lg text-cream/90 mb-8 leading-relaxed">
            I made it because I had a hunch that others might also need what I needed. 
            If you really really really want it, you're part of this test.
          </p>
          <p className="text-xs md:text-base text-dusty-rose">
            <span className="font-display text-golden-yellow">Credits:</span> I am Helia. 
            I learned the most from Horacio Godoy, Michael Lavoca, Pepa Polazón, and Murat Erdemsel.
          </p>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-32 right-32 w-16 h-16 bg-paprika transform rotate-45"></div>
        <div className="absolute bottom-48 left-16 w-20 h-20 bg-sage-green transform rotate-12"></div>
        <div className="absolute top-1/2 right-16 w-12 h-12 bg-golden-yellow transform -rotate-12"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-terracotta transform rotate-45"></div>
      </div>
    </div>
  );
};

export default DynamicHome;
