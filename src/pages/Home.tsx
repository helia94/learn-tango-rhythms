
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  useInView,
  AnimatePresence 
} from 'framer-motion';
import { Music, Map, Zap, LogIn, User, ArrowDown } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Swiss International Style spring configuration
  const springConfig = { damping: 20, stiffness: 300, mass: 0.8 };
  
  // Hero section animations
  const heroScale = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [1.2, 0.8]),
    springConfig
  );
  
  const heroOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [1, 0]),
    springConfig
  );

  // Section visibility based on scroll
  const section2Progress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const section3Progress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const section4Progress = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const section5Progress = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <div 
      ref={containerRef}
      className="relative bg-white text-black overflow-hidden"
      style={{ height: '500vh' }} // 5 sections × 100vh
    >
      {/* Language Selector - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* Hero Section - TANGO a DIARIO */}
      <motion.section 
        className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
        style={{ 
          scale: heroScale,
          opacity: heroOpacity
        }}
      >
        <div className="relative w-full">
          {/* Main Title - Burst effect */}
          <motion.h1 
            className="text-black font-black text-center leading-none"
            style={{ 
              fontSize: 'clamp(4rem, 20vw, 12rem)',
              fontFamily: 'Impact, "Arial Black", sans-serif',
              letterSpacing: '-0.05em',
              width: '120%',
              marginLeft: '-10%'
            }}
            initial={{ scale: 0, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              ...springConfig,
              delay: 0.2 
            }}
          >
            TANGO
            <br />
            <span className="text-red-600">a DIARIO</span>
          </motion.h1>

          {/* Subtitle slides up */}
          <motion.p 
            className="text-center mt-8 text-xl md:text-2xl font-light tracking-wide"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, ...springConfig }}
          >
            The Duolingo for Tango Musicality
          </motion.p>

          {/* Animated underline */}
          <motion.div
            className="absolute bottom-0 left-1/2 h-1 bg-red-600"
            initial={{ width: 0, x: '-50%' }}
            animate={{ width: '80%', x: '-50%' }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
          />
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </motion.section>

      {/* Section 2 - PRACTICE 5 MINUTES DAILY */}
      <motion.section 
        className="fixed inset-0 flex items-center justify-center"
        style={{ 
          opacity: useSpring(section2Progress, springConfig),
          scale: useSpring(useTransform(section2Progress, [0, 1], [0.8, 1]), springConfig)
        }}
      >
        <motion.div
          className="text-center"
          style={{
            y: useSpring(useTransform(section2Progress, [0, 1], [100, 0]), springConfig)
          }}
        >
          <motion.h2 
            className="text-black font-black leading-none mb-8"
            style={{ 
              fontSize: 'clamp(3rem, 15vw, 8rem)',
              fontFamily: 'Impact, "Arial Black", sans-serif',
              letterSpacing: '-0.02em'
            }}
            animate={{ 
              fontWeight: [100, 900, 100],
              scaleY: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
          >
            PRACTICE
            <br />
            <span className="text-red-600">5 MINUTES</span>
            <br />
            DAILY
          </motion.h2>
          
          {/* Geometric accent */}
          <motion.div
            className="w-32 h-32 bg-red-600 mx-auto"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.section>

      {/* Section 3 - ROAD MAP Button */}
      <motion.section 
        className="fixed inset-0 flex items-center justify-center"
        style={{ 
          opacity: useSpring(section3Progress, springConfig)
        }}
      >
        <motion.div
          className="text-center"
          style={{
            scale: useSpring(useTransform(section3Progress, [0, 1], [0.5, 1]), springConfig)
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Link 
              to="/roadmap"
              className="group relative block"
            >
              <motion.div
                className="bg-black text-white px-16 py-8 text-6xl md:text-8xl font-black tracking-tight"
                style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: '#dc2626',
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                ROAD MAP
              </motion.div>
              
              {/* Geometric hover effect */}
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-red-600"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, scale: 1.2 }}
              />
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Section 4 - TRACK YOUR PROGRESS */}
      <motion.section 
        className="fixed inset-0 flex items-center justify-center"
        style={{ 
          opacity: useSpring(section4Progress, springConfig)
        }}
      >
        <motion.div className="text-center">
          {['T', 'R', 'A', 'C', 'K', ' ', 'Y', 'O', 'U', 'R', ' ', 'P', 'R', 'O', 'G', 'R', 'E', 'S', 'S'].map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block text-black font-black"
              style={{ 
                fontSize: 'clamp(2rem, 10vw, 6rem)',
                fontFamily: 'Impact, "Arial Black", sans-serif'
              }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ 
                y: useTransform(section4Progress, [0, 1], [100, 0]),
                opacity: useTransform(section4Progress, [0, 1], [0, 1])
              }}
              transition={{ 
                delay: index * 0.1,
                ...springConfig
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
          
          {/* Progress visualization */}
          <motion.div
            className="mt-12 w-full max-w-md mx-auto"
            style={{
              opacity: useSpring(section4Progress, springConfig)
            }}
          >
            <div className="grid grid-cols-12 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square bg-red-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 2 + (i * 0.1),
                    ...springConfig
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Section 5 - Final CTA */}
      <motion.section 
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{ 
          opacity: useSpring(section5Progress, springConfig)
        }}
      >
        <motion.div
          className="text-center space-y-12"
          style={{
            y: useSpring(useTransform(section5Progress, [0, 1], [50, 0]), springConfig)
          }}
        >
          <motion.h3
            className="text-black font-black text-4xl md:text-6xl"
            style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
            animate={{ 
              scale: [1, 1.02, 1],
              rotate: [0, 0.5, 0, -0.5, 0]
            }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            START YOUR
            <br />
            <span className="text-red-600">TANGO JOURNEY</span>
          </motion.h3>

          {/* Action buttons in grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
            <Link to="/rhythmlab">
              <motion.div
                className="bg-red-600 text-white px-8 py-6 text-2xl font-black tracking-wide"
                style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: '#000',
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                RHYTHM LAB
              </motion.div>
            </Link>
            
            <Link to={user ? "/profile" : "/auth"}>
              <motion.div
                className="bg-black text-white px-8 py-6 text-2xl font-black tracking-wide"
                style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: '#dc2626',
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {user ? "PROFILE" : "LOGIN"}
              </motion.div>
            </Link>
          </div>

          {/* Final geometric element */}
          <motion.div
            className="w-4 h-4 bg-red-600 mx-auto"
            animate={{ 
              scale: [1, 2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;
