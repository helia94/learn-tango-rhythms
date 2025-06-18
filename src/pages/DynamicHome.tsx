
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
      className="min-h-[1000vh] bg-gradient-to-b from-slate-950 via-slate-900 to-black relative overflow-hidden"
    >
      {/* Fixed Language Selector */}
      <div className="fixed top-8 right-8 z-50">
        <LanguageSelector />
      </div>

      {/* Clean geometric grid background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
               `,
               backgroundSize: '80px 80px'
             }}>
        </div>
      </div>

      {/* Subtle accent elements - positioned intentionally */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        {/* Top left accent */}
        <div className="absolute top-32 left-16 w-1 h-24 bg-golden-yellow"></div>
        <div className="absolute top-32 left-16 w-24 h-1 bg-golden-yellow"></div>
        
        {/* Bottom right accent */}
        <div className="absolute bottom-32 right-16 w-1 h-24 bg-terracotta"></div>
        <div className="absolute bottom-32 right-16 w-24 h-1 bg-terracotta"></div>
        
        {/* Center accent dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-sage-green rounded-full"></div>
      </div>

      {/* Hero Section - Fixed */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-10"
        style={{ scale: titleScale, opacity: titleOpacity }}
      >
        <div className="text-center px-8">
          <motion.h1 
            className="font-display text-8xl md:text-[10rem] lg:text-[14rem] mb-16 text-white font-bold tracking-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            TANGO A DIARIO
          </motion.h1>
          <motion.div 
            className="flex items-center justify-center gap-8 mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="w-12 h-12 border-2 border-golden-yellow flex items-center justify-center">
              <Music className="w-6 h-6 text-golden-yellow" />
            </div>
            <div className="w-1 h-16 bg-white/30"></div>
            <div className="w-12 h-12 border-2 border-terracotta flex items-center justify-center">
              <Zap className="w-6 h-6 text-terracotta" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Section 1 - Tagline */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20 bg-black/90"
        style={{ y: section1Y, opacity: section1Opacity }}
      >
        <div className="text-center px-8 max-w-7xl">
          <div className="mb-8">
            <div className="w-24 h-1 bg-golden-yellow mx-auto mb-8"></div>
            <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-display text-white mb-8 font-bold tracking-tight leading-none">
              The Duolingo for
            </h2>
            <h2 className="text-6xl md:text-9xl lg:text-[12rem] font-display text-golden-yellow font-bold tracking-tight leading-none">
              Tango Musicality
            </h2>
            <div className="w-24 h-1 bg-golden-yellow mx-auto mt-8"></div>
          </div>
        </div>
      </motion.div>

      {/* Section 2 - Practice Message */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20 bg-slate-950/95"
        style={{ y: section2Y, opacity: section2Opacity }}
      >
        <div className="text-center px-8 max-w-7xl">
          <div className="mb-8">
            <div className="w-16 h-16 border-2 border-terracotta mx-auto mb-12 flex items-center justify-center">
              <div className="w-2 h-2 bg-terracotta rounded-full"></div>
            </div>
            <h3 className="text-4xl md:text-7xl lg:text-9xl font-display text-white leading-tight mb-8 font-bold tracking-tight">
              Practice Tango Musicality
            </h3>
            <h3 className="text-5xl md:text-8xl lg:text-[10rem] font-display text-terracotta mt-12 font-bold tracking-tight">
              for 5 Minutes Every Day
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Section 3 - Navigation Buttons */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20 bg-gray-900/95"
        style={{ y: section3Y, opacity: section3Opacity }}
      >
        <div className="flex flex-col gap-8 px-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="w-32 h-1 bg-sage-green mx-auto mb-8"></div>
            <h3 className="text-2xl md:text-4xl font-display text-white font-bold tracking-wide uppercase">
              Choose Your Path
            </h3>
          </div>
          
          <Link 
            to="/roadmap" 
            className="group bg-white text-black font-display text-2xl md:text-4xl lg:text-5xl px-16 py-12 border-4 border-white hover:bg-black hover:text-white transition-all duration-300 text-center font-bold tracking-tight uppercase"
          >
            <div className="flex items-center justify-center gap-6">
              <div className="w-12 h-12 border-2 border-current flex items-center justify-center">
                <Map className="w-6 h-6" />
              </div>
              <span>ROAD MAP</span>
            </div>
          </Link>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Link 
              to="/rhythmlab" 
              className="bg-sage-green text-white font-display text-xl md:text-3xl px-12 py-8 hover:bg-white hover:text-sage-green border-4 border-sage-green transition-all duration-300 text-center font-bold tracking-tight uppercase"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="w-8 h-8 border-2 border-current flex items-center justify-center">
                  <Music className="w-4 h-4" />
                </div>
                <span>RHYTHM LAB</span>
              </div>
            </Link>
            
            <Link 
              to={user ? "/profile" : "/auth"}
              className="bg-terracotta text-white font-display text-xl md:text-3xl px-12 py-8 hover:bg-white hover:text-terracotta border-4 border-terracotta transition-all duration-300 text-center font-bold tracking-tight uppercase"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="w-8 h-8 border-2 border-current flex items-center justify-center">
                  {user ? <User className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                </div>
                <span>{user ? "PROFILE" : "LOGIN"}</span>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Section 4 - Learning Method */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20 bg-black/98"
        style={{ y: section4Y, opacity: section4Opacity }}
      >
        <div className="text-center px-8 max-w-6xl">
          <div className="grid grid-cols-3 gap-8 mb-16">
            <div className="w-full h-1 bg-golden-yellow"></div>
            <div className="w-full h-1 bg-terracotta"></div>
            <div className="w-full h-1 bg-sage-green"></div>
          </div>
          
          <h3 className="text-3xl md:text-6xl lg:text-8xl font-display text-white leading-tight mb-12 font-bold tracking-tight">
            Get One Topic Per Week
          </h3>
          <h3 className="text-4xl md:text-7xl lg:text-9xl font-display text-golden-yellow mb-16 font-bold tracking-tight">
            Learn More About it Every Day
          </h3>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-3xl lg:text-4xl text-white leading-relaxed mb-8 font-light">
              Track Your Progress • Repeat Until Mastery • Build Contrast in Your Dancing
            </p>
            <div className="w-16 h-1 bg-dusty-rose mx-auto mt-12"></div>
          </div>
        </div>
      </motion.div>

      {/* Section 5 - Why & Examples */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-20 bg-slate-950"
        style={{ y: section5Y, opacity: section5Opacity }}
      >
        <div className="px-8 max-w-6xl w-full">
          <div className="text-center mb-16">
            <div className="w-2 h-2 bg-golden-yellow rounded-full mx-auto mb-8"></div>
            <h3 className="text-2xl md:text-4xl font-display text-white font-bold tracking-wide uppercase mb-8">
              The Why & What
            </h3>
          </div>
          
          <Accordion type="single" collapsible className="mb-12">
            <AccordionItem value="why" className="border-white/20">
              <AccordionTrigger className="text-2xl md:text-4xl lg:text-5xl font-display text-white hover:text-golden-yellow font-bold tracking-tight">
                Why This Approach?
              </AccordionTrigger>
              <AccordionContent className="text-lg md:text-2xl lg:text-3xl text-white/80 space-y-6 pt-8 font-light leading-relaxed">
                <p>• 8+ years and countless workshops to learn basic concepts</p>
                <p>• Too much information at once, no consistent practice</p>
                <p>• Small daily inspiration beats overwhelming workshops</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="text-center space-y-8 border-t border-white/10 pt-12">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="w-8 h-1 bg-sage-green"></div>
              <div className="w-2 h-2 bg-golden-yellow rounded-full"></div>
              <div className="w-8 h-1 bg-terracotta"></div>
            </div>
            <p className="text-xl md:text-3xl lg:text-4xl text-white font-light">
              <span className="font-display text-golden-yellow font-bold">Topics:</span> Fast & Slow • Small & Big • High & Low
            </p>
            <p className="text-lg md:text-2xl lg:text-3xl text-white/60 font-light">
              <span className="font-display font-bold">Free for now</span> • Payment increases motivation
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
          <div className="mb-16">
            <div className="w-32 h-32 border border-white/20 mx-auto mb-12 flex items-center justify-center">
              <div className="w-16 h-16 border border-white/40 flex items-center justify-center">
                <div className="w-8 h-8 border border-white/60 flex items-center justify-center">
                  <div className="w-2 h-2 bg-golden-yellow rounded-full"></div>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-display text-white mb-12 font-bold tracking-tight">
              Proof of Concept
            </h3>
            <p className="text-lg md:text-2xl lg:text-3xl text-white/80 mb-16 leading-relaxed font-light max-w-4xl mx-auto">
              Built because others might need what I needed. If you really want this, you're part of the test.
            </p>
          </div>
          
          <div className="border-t border-white/10 pt-12">
            <p className="text-base md:text-xl lg:text-2xl text-white/60 font-light">
              <span className="font-display text-golden-yellow font-bold">Helia</span> • 
              Learned from Horacio Godoy, Michael Lavoca, Pepa Polazón, Murat Erdemsel
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DynamicHome;
