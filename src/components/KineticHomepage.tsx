
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
import { Map, Music, Target } from 'lucide-react';

const KineticHomepage = () => {
  const { t } = useTranslation();
  const [currentSection, setCurrentSection] = useState(0);
  const { scrollY } = useScroll();
  
  const totalSections = 5;
  
  // Transform scroll position to section index
  const sectionProgress = useTransform(scrollY, [0, window.innerHeight * (totalSections - 1)], [0, totalSections - 1]);
  
  useEffect(() => {
    const unsubscribe = sectionProgress.onChange((latest) => {
      setCurrentSection(Math.round(latest));
    });
    return unsubscribe;
  }, [sectionProgress]);

  // Organic shape paths for blood-orange elements
  const organicShape1 = "M20,80 Q50,20 80,50 Q120,80 100,120 Q60,140 20,120 Z";
  const organicShape2 = "M40,20 Q80,10 120,40 Q140,80 110,120 Q70,140 30,110 Q10,70 40,20 Z";

  return (
    <div className="h-[500vh] bg-cream">
      {/* Hero Section - Frame 1 */}
      <motion.section 
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentSection === 0 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Blood-orange organic shape */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2"
          initial={{ x: -200, scale: 0 }}
          animate={{ 
            x: currentSection === 0 ? 100 : -200,
            scale: currentSection === 0 ? 1 : 0
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <svg width="300" height="400" viewBox="0 0 200 200">
            <path 
              d={organicShape1} 
              fill="hsl(var(--burnt-orange))" 
              opacity="0.8"
            />
          </svg>
        </motion.div>

        {/* Main title with dramatic entrance */}
        <div className="text-center z-10">
          <motion.h1 
            className="font-display font-black text-[15vw] leading-[0.8] text-warm-brown tracking-tighter"
            initial={{ y: 100, rotate: -5 }}
            animate={{ 
              y: currentSection === 0 ? 0 : -100,
              rotate: currentSection === 0 ? 0 : -15
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.3
            }}
          >
            TANGO
          </motion.h1>
          <motion.h1 
            className="font-display font-black text-[15vw] leading-[0.8] text-terracotta tracking-tighter"
            initial={{ y: 100, rotate: 5 }}
            animate={{ 
              y: currentSection === 0 ? 0 : -100,
              rotate: currentSection === 0 ? 0 : 15
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.5
            }}
          >
            A DIARIO
          </motion.h1>
          
          {/* Subtitle emerging from negative space */}
          <motion.p 
            className="font-body text-2xl mt-8 text-warm-brown font-medium tracking-wide uppercase"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: currentSection === 0 ? 1.2 : 0,
              opacity: currentSection === 0 ? 1 : 0
            }}
            transition={{ 
              duration: 0.6, 
              ease: "backOut",
              delay: 1.0
            }}
          >
            The Duolingo for Tango Musicality
          </motion.p>
        </div>
      </motion.section>

      {/* Practice Section - Frame 2 */}
      <motion.section 
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentSection === 1 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Burnt-brown speaker shape */}
        <motion.div
          className="absolute bottom-0 right-1/4"
          initial={{ y: 200, scale: 0 }}
          animate={{ 
            y: currentSection === 1 ? -50 : 200,
            scale: currentSection === 1 ? 1 : 0
          }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        >
          <svg width="250" height="300" viewBox="0 0 200 200">
            <path 
              d={organicShape2} 
              fill="hsl(var(--warm-brown))" 
              opacity="0.7"
            />
          </svg>
        </motion.div>

        {/* Fracturing text animation */}
        <div className="text-center z-10 max-w-4xl px-8">
          <motion.div 
            className="font-display text-6xl md:text-8xl font-bold text-warm-brown leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSection === 1 ? 1 : 0 }}
          >
            {/* Line 1 */}
            <motion.div
              className="block"
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{ 
                x: currentSection === 1 ? -100 : 0,
                y: currentSection === 1 ? -20 : 0,
                rotate: currentSection === 1 ? -2 : 0
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              PRACTICE TANGO
            </motion.div>
            
            {/* Line 2 */}
            <motion.div
              className="block text-terracotta"
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{ 
                x: currentSection === 1 ? 0 : 0,
                y: currentSection === 1 ? 0 : 0,
                rotate: currentSection === 1 ? 1 : 0
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              MUSICALITY
            </motion.div>
            
            {/* Line 3 */}
            <motion.div
              className="block text-burnt-orange"
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{ 
                x: currentSection === 1 ? 100 : 0,
                y: currentSection === 1 ? 20 : 0,
                rotate: currentSection === 1 ? 2 : 0
              }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              FOR 5 MINUTES EVERY DAY
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Button Section - Frame 3 */}
      <motion.section 
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentSection === 2 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Pulsing dot behind button */}
        <motion.div
          className="absolute w-4 h-4 bg-burnt-orange rounded-full"
          initial={{ scale: 0 }}
          animate={{ 
            scale: currentSection === 2 ? [1, 1.5, 1] : 0
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Morphing button */}
        <motion.div
          className="relative z-10"
          initial={{ width: 2, height: 2 }}
          animate={{ 
            width: currentSection === 2 ? 200 : 2,
            height: currentSection === 2 ? 60 : 2
          }}
          transition={{ duration: 0.8, ease: "backOut" }}
        >
          <Link 
            to="/roadmap"
            className="block w-full h-full bg-gradient-to-r from-terracotta to-burnt-orange rounded-full flex items-center justify-center group hover:shadow-2xl transition-all duration-300"
          >
            <motion.span 
              className="font-display font-bold text-cream text-xl tracking-wider uppercase"
              initial={{ y: -50, opacity: 0 }}
              animate={{ 
                y: currentSection === 2 ? 0 : -50,
                opacity: currentSection === 2 ? 1 : 0
              }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Map className="inline w-6 h-6 mr-3" />
              ROAD MAP
            </motion.span>
          </Link>
        </motion.div>
      </motion.section>

      {/* Why Section - Frame 4 */}
      <motion.section 
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentSection === 3 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Brown curtain peeling back */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-warm-brown origin-top-left"
          initial={{ scaleX: 1, scaleY: 1 }}
          animate={{ 
            scaleX: currentSection === 3 ? 0 : 1,
            scaleY: currentSection === 3 ? 0 : 1
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        <div className="text-center z-10 max-w-4xl px-8">
          {/* Why title */}
          <motion.h2
            className="font-display text-9xl font-black text-terracotta mb-16"
            initial={{ x: 300, rotate: 45 }}
            animate={{ 
              x: currentSection === 3 ? 0 : 300,
              rotate: currentSection === 3 ? 0 : 45
            }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            WHY?
          </motion.h2>

          {/* Answer points */}
          <div className="space-y-8">
            {[
              "8 YEARS OF TEACHING EXPERIENCE",
              "SCIENTIFICALLY PROVEN METHOD",
              "REALLY REALLY REALLY WANT IT"
            ].map((text, index) => (
              <motion.div
                key={index}
                className="font-body text-2xl text-warm-brown font-medium"
                initial={{ x: -200, rotate: -10 }}
                animate={{ 
                  x: currentSection === 3 ? 0 : -200,
                  rotate: currentSection === 3 ? 0 : -10,
                  y: index === 2 ? (currentSection === 3 ? -10 : 0) : 0
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3 + (index * 0.2),
                  ease: "backOut"
                }}
              >
                • {text}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Credits Section - Frame 5 */}
      <motion.section 
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentSection === 4 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center z-10">
          <motion.h3
            className="font-mono text-4xl text-warm-brown mb-8 tracking-wider"
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: currentSection === 4 ? 1 : 0,
              y: currentSection === 4 ? 0 : 50
            }}
            transition={{ duration: 0.8 }}
          >
            I AM HELIA
          </motion.h3>

          <motion.div
            className="font-body text-xl text-warm-brown space-y-2"
            initial={{ rotate: 180, scale: 0 }}
            animate={{ 
              rotate: currentSection === 4 ? 0 : 180,
              scale: currentSection === 4 ? 1 : 0
            }}
            transition={{ duration: 1.0, ease: "backOut", delay: 0.5 }}
          >
            <div>WITH VALENTINA TORRES</div>
            <div>& PABLO MARTINEZ</div>
          </motion.div>

          {/* Fingerprint dissolution */}
          <motion.div
            className="mt-12 w-16 h-16 mx-auto bg-burnt-orange rounded-full"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ 
              scale: currentSection === 4 ? [1, 0.8, 0] : 1,
              opacity: currentSection === 4 ? [1, 0.5, 0] : 1
            }}
            transition={{ duration: 2, delay: 1.5 }}
          />
        </div>
      </motion.section>

      {/* Scroll indicator */}
      <motion.div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: currentSection < 4 ? 1 : 0 }}
      >
        <motion.div
          className="w-1 h-16 bg-warm-brown/30 rounded-full overflow-hidden"
          animate={{ 
            scaleY: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-full bg-terracotta rounded-full"
            style={{ 
              height: `${((currentSection + 1) / totalSections) * 100}%`
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default KineticHomepage;
