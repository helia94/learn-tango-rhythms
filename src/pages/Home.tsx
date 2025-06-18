
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

  // Transform values for dynamic text scaling
  const titleScale = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1.5, 0.8]);
  const subtitleScale = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0.8, 1.2, 0.9]);
  const descriptionScale = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0.9, 1.1, 0.8]);

  const ScrollSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20%" });
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay }}
        className={`min-h-screen flex items-center justify-center ${className}`}
      >
        {children}
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
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-warm-brown/20 to-terracotta/20 rounded-xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>
        <Link 
          to={to} 
          className={`relative block ${variantStyles[variant]} text-cream font-bold text-2xl px-12 py-6 rounded-xl shadow-xl transition-all duration-300 border-2 border-warm-brown/20`}
        >
          <div className="flex items-center justify-center gap-4">
            {Icon && <Icon className="w-8 h-8" />}
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
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-cream"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Main Title Section */}
      <ScrollSection className="relative overflow-hidden">
        <div className="text-center px-4 max-w-6xl">
          <motion.h1 
            style={{ scale: titleScale }}
            className="boho-title text-6xl md:text-9xl mb-8 font-display leading-tight"
          >
            TANGO A DIARIO
          </motion.h1>
          <motion.div 
            className="text-2xl md:text-4xl text-warm-brown font-medium tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            (DAILY TANGO)
          </motion.div>
        </div>
      </ScrollSection>

      {/* Subtitle Section */}
      <ScrollSection>
        <motion.h2 
          style={{ scale: subtitleScale }}
          className="text-4xl md:text-7xl text-center font-display text-terracotta leading-tight px-4"
        >
          The Duolingo for<br />Tango Musicality
        </motion.h2>
      </ScrollSection>

      {/* Description Section */}
      <ScrollSection>
        <motion.div 
          style={{ scale: descriptionScale }}
          className="text-center px-4"
        >
          <div className="text-3xl md:text-6xl font-display text-burnt-orange leading-relaxed">
            Practice Tango Musicality<br />
            for 5 Minutes Every Day
          </div>
        </motion.div>
      </ScrollSection>

      {/* Road Map Button Section */}
      <ScrollSection>
        <DynamicButton to="/roadmap" icon={Map} variant="primary">
          Road Map
        </DynamicButton>
      </ScrollSection>

      {/* Weekly Topic Description */}
      <ScrollSection>
        <div className="text-center px-4 max-w-4xl">
          <motion.div 
            className="text-2xl md:text-5xl font-display text-deep-teal leading-relaxed"
            whileInView={{ scale: [0.9, 1.1, 1] }}
            transition={{ duration: 1 }}
          >
            Get One Topic Per Week<br />
            and Learn More About it<br />
            Every Day
          </motion.div>
        </div>
      </ScrollSection>

      {/* Progress Tracking */}
      <ScrollSection>
        <div className="text-center px-4 max-w-5xl">
          <motion.div 
            className="text-2xl md:text-4xl font-display text-paprika leading-relaxed"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 0.8 }}
          >
            Track Your Progress - Repeat, Repeat,<br />
            and then Repeat - until You Can Forget It
          </motion.div>
        </div>
      </ScrollSection>

      {/* Contrast Building */}
      <ScrollSection>
        <div className="text-center px-4 max-w-4xl">
          <motion.div 
            className="text-xl md:text-4xl font-display text-caramel leading-relaxed"
            whileInView={{ scale: [0.8, 1.2, 1] }}
            transition={{ duration: 1.2 }}
          >
            Most topics are about building<br />
            more contrast into your dancing<br />
            and breaking your habits
          </motion.div>
        </div>
      </ScrollSection>

      {/* Button Trio */}
      <ScrollSection>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center px-4">
          <DynamicButton to={user ? "/profile" : "/auth"} icon={user ? User : LogIn} variant="accent">
            {user ? "Profile" : "Login"}
          </DynamicButton>
          <DynamicButton to="/rhythmlab" icon={Music} variant="secondary">
            Rhythm Lab
          </DynamicButton>
        </div>
      </ScrollSection>

      {/* Why Section */}
      <ScrollSection>
        <div className="px-4 max-w-4xl w-full">
          <motion.h3 
            className="text-3xl md:text-5xl font-display text-burnt-orange text-center mb-8"
            whileInView={{ scale: [0.5, 1.1, 1] }}
          >
            Why?
          </motion.h3>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="reason-1" className="boho-panel p-6">
              <AccordionTrigger className="text-xl md:text-2xl font-medium text-warm-brown">
                Because it took me more than 8 years...
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-700 leading-relaxed pt-4">
                Because it took me more than 8 years and many long distance trips to musicality workshops to learn these basic concepts that are not even that hard.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="reason-2" className="boho-panel p-6">
              <AccordionTrigger className="text-xl md:text-2xl font-medium text-warm-brown">
                Because each workshop was 3-4 days...
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-700 leading-relaxed pt-4">
                Because each workshop was 3-4 days, way too much information at once, and I hardly ever went back to practicing them.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="reason-3" className="boho-panel p-6">
              <AccordionTrigger className="text-xl md:text-2xl font-medium text-warm-brown">
                Because I needed continuous inspiration...
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-700 leading-relaxed pt-4">
                Because I needed a little inspiration continuously instead of a lot at once.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollSection>

      {/* Example Topics */}
      <ScrollSection>
        <div className="text-center px-4 max-w-4xl">
          <motion.h3 
            className="text-2xl md:text-4xl font-display text-sage-green mb-6"
            whileInView={{ scale: [0.8, 1.1, 1] }}
          >
            What are some example topics?
          </motion.h3>
          <motion.div 
            className="text-xl md:text-3xl font-display text-deep-teal leading-relaxed"
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dancing fast and slow,<br />
            dancing small and big,<br />
            dancing high and low, ...
          </motion.div>
        </div>
      </ScrollSection>

      {/* Free/Paid */}
      <ScrollSection>
        <div className="text-center px-4 max-w-5xl">
          <motion.h3 
            className="text-2xl md:text-4xl font-display text-golden-yellow mb-6"
            whileInView={{ scale: [0.8, 1.1, 1] }}
          >
            Is this free?
          </motion.h3>
          <motion.div 
            className="text-lg md:text-2xl text-warm-brown leading-relaxed"
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 1 }}
          >
            For now, yes, but paying even a little amount will increase your motivation and commitment at least five fold. So, in the future, this will be paid for both our sakes.
          </motion.div>
        </div>
      </ScrollSection>

      {/* Finally */}
      <ScrollSection>
        <div className="text-center px-4 max-w-6xl">
          <motion.h3 
            className="text-2xl md:text-4xl font-display text-terracotta mb-8"
            whileInView={{ scale: [0.8, 1.1, 1] }}
          >
            Finally?
          </motion.h3>
          <motion.div 
            className="text-base md:text-xl text-gray-700 leading-relaxed space-y-4"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 1 }}
          >
            <p>For now, this is just a proof of concept. I made it because I had a hunch that others might also need what I needed. I am testing that hunch.</p>
            <p>In fact, if you are reading this, you are already part of this test.</p>
            <p className="font-bold text-paprika">I will commit to finishing it if I find people who really really really want it :)</p>
            <p>If you kind of want it, this is not for you yet! If you really really really want it, sign up for this list so I can keep track, decide whether to do this, and inform you when I do.</p>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Credits */}
      <ScrollSection className="pb-20">
        <div className="text-center px-4 max-w-5xl">
          <motion.h3 
            className="text-2xl md:text-4xl font-display text-caramel mb-8"
            whileInView={{ scale: [0.8, 1.1, 1] }}
          >
            Credits?
          </motion.h3>
          <motion.div 
            className="text-base md:text-lg text-gray-700 leading-relaxed space-y-4"
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            transition={{ duration: 1 }}
          >
            <p>I am Helia, but the information in the app did not come to me in a dream. It is the result of the work of many Tango Teachers who have invested their life into understanding this music and teaching it.</p>
            <p>I just like to make this information more accessible.</p>
            <p className="font-semibold">I have personally learned the most from Horracio Godoy, Michael Lavoca, Pepa Polazon, and Murat Erdemsel.</p>
          </motion.div>
        </div>
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
