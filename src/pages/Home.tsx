
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Music, Map, Zap, LogIn, User, ChevronDown } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const ScrollSection = ({ children, className = "", delay = 0, sectionIndex = 0 }: { 
    children: React.ReactNode, 
    className?: string, 
    delay?: number,
    sectionIndex?: number 
  }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-10%" });
    
    // Create dynamic transforms based on scroll position
    const sectionProgress = useTransform(
      scrollYProgress, 
      [sectionIndex * 0.08, (sectionIndex + 1) * 0.08], 
      [0, 1]
    );
    
    const y = useTransform(sectionProgress, [0, 0.5, 1], [100, 0, -50]);
    const scale = useTransform(sectionProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);
    const opacity = useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);
    
    return (
      <motion.div
        ref={ref}
        style={{ y, scale, opacity }}
        className={`h-screen flex items-center justify-center px-4 ${className}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay }}
          className="w-full max-w-7xl text-center"
        >
          {children}
        </motion.div>
      </motion.div>
    );
  };

  const DynamicButton = ({ to, children, variant = "primary", icon: Icon }: { 
    to: string, 
    children: React.ReactNode, 
    variant?: "primary" | "secondary" | "accent",
    icon?: any
  }) => {
    const variantStyles = {
      primary: "bg-gradient-to-r from-burnt-orange to-terracotta hover:from-terracotta hover:to-paprika",
      secondary: "bg-gradient-to-r from-sage-green to-deep-teal hover:from-deep-teal hover:to-sage-green", 
      accent: "bg-gradient-to-r from-golden-yellow to-dusty-rose hover:from-dusty-rose hover:to-golden-yellow text-warm-brown"
    };

    return (
      <motion.div
        whileHover={{ scale: 1.1, y: -10 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-warm-brown/20 to-terracotta/20 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>
        <Link 
          to={to} 
          className={`relative block ${variantStyles[variant]} text-cream font-bold text-3xl md:text-4xl px-16 py-8 rounded-2xl shadow-2xl transition-all duration-300 border-2 border-warm-brown/20`}
        >
          <div className="flex items-center justify-center gap-6">
            {Icon && <Icon className="w-12 h-12" />}
            <span className="font-display tracking-wider uppercase">{children}</span>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className="relative bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      {/* Fixed Language Selector */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="fixed top-1/2 right-8 transform -translate-y-1/2 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-cream"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>

      {/* Main Title Section */}
      <ScrollSection sectionIndex={0}>
        <motion.h1 
          className="boho-title text-8xl md:text-[12rem] lg:text-[16rem] mb-8 font-display leading-none"
        >
          TANGO A DIARIO
        </motion.h1>
        <motion.div 
          className="text-4xl md:text-6xl lg:text-8xl text-warm-brown font-medium tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          (DAILY TANGO)
        </motion.div>
      </ScrollSection>

      {/* Subtitle Section */}
      <ScrollSection sectionIndex={1}>
        <motion.h2 
          className="text-6xl md:text-9xl lg:text-[12rem] font-display text-terracotta leading-tight"
        >
          The Duolingo for<br />Tango Musicality
        </motion.h2>
      </ScrollSection>

      {/* Description Section */}
      <ScrollSection sectionIndex={2}>
        <motion.div className="text-5xl md:text-8xl lg:text-[10rem] font-display text-burnt-orange leading-relaxed">
          Practice Tango Musicality<br />
          for 5 Minutes Every Day
        </motion.div>
      </ScrollSection>

      {/* Road Map Button Section */}
      <ScrollSection sectionIndex={3}>
        <DynamicButton to="/roadmap" icon={Map} variant="primary">
          Road Map
        </DynamicButton>
      </ScrollSection>

      {/* Weekly Topic Description */}
      <ScrollSection sectionIndex={4}>
        <motion.div className="text-4xl md:text-7xl lg:text-9xl font-display text-deep-teal leading-relaxed">
          Get One Topic Per Week<br />
          and Learn More About it<br />
          Every Day
        </motion.div>
      </ScrollSection>

      {/* Progress Tracking */}
      <ScrollSection sectionIndex={5}>
        <motion.div className="text-3xl md:text-6xl lg:text-8xl font-display text-paprika leading-relaxed">
          Track Your Progress - Repeat, Repeat,<br />
          and then Repeat - until You Can Forget It
        </motion.div>
      </ScrollSection>

      {/* Contrast Building */}
      <ScrollSection sectionIndex={6}>
        <motion.div className="text-3xl md:text-6xl lg:text-8xl font-display text-caramel leading-relaxed">
          Most topics are about building<br />
          more contrast into your dancing<br />
          and breaking your habits
        </motion.div>
      </ScrollSection>

      {/* Button Trio */}
      <ScrollSection sectionIndex={7}>
        <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
          <DynamicButton to={user ? "/profile" : "/auth"} icon={user ? User : LogIn} variant="accent">
            {user ? "Profile" : "Login"}
          </DynamicButton>
          <DynamicButton to="/rhythmlab" icon={Music} variant="secondary">
            Rhythm Lab
          </DynamicButton>
        </div>
      </ScrollSection>

      {/* Why Section */}
      <ScrollSection sectionIndex={8}>
        <div className="w-full max-w-6xl">
          <motion.h3 className="text-5xl md:text-8xl lg:text-[10rem] font-display text-burnt-orange text-center mb-12">
            Why?
          </motion.h3>
          
          <Accordion type="single" collapsible className="space-y-6">
            <AccordionItem value="reason-1" className="boho-panel p-8">
              <AccordionTrigger className="text-2xl md:text-4xl font-medium text-warm-brown">
                Because it took me more than 8 years...
              </AccordionTrigger>
              <AccordionContent className="text-xl md:text-2xl text-gray-700 leading-relaxed pt-6">
                Because it took me more than 8 years and many long distance trips to musicality workshops to learn these basic concepts that are not even that hard.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="reason-2" className="boho-panel p-8">
              <AccordionTrigger className="text-2xl md:text-4xl font-medium text-warm-brown">
                Because each workshop was 3-4 days...
              </AccordionTrigger>
              <AccordionContent className="text-xl md:text-2xl text-gray-700 leading-relaxed pt-6">
                Because each workshop was 3-4 days, way too much information at once, and I hardly ever went back to practicing them.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="reason-3" className="boho-panel p-8">
              <AccordionTrigger className="text-2xl md:text-4xl font-medium text-warm-brown">
                Because I needed continuous inspiration...
              </AccordionTrigger>
              <AccordionContent className="text-xl md:text-2xl text-gray-700 leading-relaxed pt-6">
                Because I needed a little inspiration continuously instead of a lot at once.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollSection>

      {/* Example Topics */}
      <ScrollSection sectionIndex={9}>
        <motion.h3 className="text-4xl md:text-7xl lg:text-9xl font-display text-sage-green mb-8">
          What are some example topics?
        </motion.h3>
        <motion.div className="text-3xl md:text-6xl lg:text-8xl font-display text-deep-teal leading-relaxed">
          Dancing fast and slow,<br />
          dancing small and big,<br />
          dancing high and low, ...
        </motion.div>
      </ScrollSection>

      {/* Free/Paid */}
      <ScrollSection sectionIndex={10}>
        <motion.h3 className="text-4xl md:text-7xl lg:text-9xl font-display text-golden-yellow mb-8">
          Is this free?
        </motion.h3>
        <motion.div className="text-2xl md:text-4xl lg:text-6xl text-warm-brown leading-relaxed max-w-5xl">
          For now, yes, but paying even a little amount will increase your motivation and commitment at least five fold. So, in the future, this will be paid for both our sakes.
        </motion.div>
      </ScrollSection>

      {/* Finally */}
      <ScrollSection sectionIndex={11}>
        <motion.h3 className="text-4xl md:text-7xl lg:text-9xl font-display text-terracotta mb-12">
          Finally?
        </motion.h3>
        <motion.div className="text-xl md:text-3xl lg:text-4xl text-gray-700 leading-relaxed space-y-6 max-w-6xl">
          <p>For now, this is just a proof of concept. I made it because I had a hunch that others might also need what I needed. I am testing that hunch.</p>
          <p>In fact, if you are reading this, you are already part of this test.</p>
          <p className="font-bold text-paprika">I will commit to finishing it if I find people who really really really want it :)</p>
          <p>If you kind of want it, this is not for you yet! If you really really really want it, sign up for this list so I can keep track, decide whether to do this, and inform you when I do.</p>
        </motion.div>
      </ScrollSection>

      {/* Credits */}
      <ScrollSection sectionIndex={12} className="pb-20">
        <motion.h3 className="text-4xl md:text-7xl lg:text-9xl font-display text-caramel mb-12">
          Credits?
        </motion.h3>
        <motion.div className="text-xl md:text-3xl lg:text-4xl text-gray-700 leading-relaxed space-y-6 max-w-6xl">
          <p>I am Helia, but the information in the app did not come to me in a dream. It is the result of the work of many Tango Teachers who have invested their life into understanding this music and teaching it.</p>
          <p>I just like to make this information more accessible.</p>
          <p className="font-semibold">I have personally learned the most from Horracio Godoy, Michael Lavoca, Pepa Polazon, and Murat Erdemsel.</p>
        </motion.div>
      </ScrollSection>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-paprika transform rotate-45"></div>
        <div className="absolute bottom-1/3 left-1/6 w-24 h-24 bg-golden-yellow transform rotate-12"></div>
        <div className="absolute top-2/3 right-1/6 w-20 h-20 bg-sage-green transform -rotate-12"></div>
      </div>
    </div>
  );
};

export default Home;
