
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Map, Lock, CheckCircle, Circle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from '@/components/LanguageSelector';

const RoadMap = () => {
  const { t } = useTranslation();

  // All concepts combined into one flowing sequence
  const allConcepts = [
    { key: "dancingFastVsSlow", unlocked: true, completed: true, link: "/exercises/dancing-fast-slow" },
    { key: "dancingSmallVsBig", unlocked: true, completed: true },
    { key: "dancingHighVsLow", unlocked: true, completed: false },
    { key: "dancingCircularVsLinear", unlocked: true, completed: false },
    { key: "withControlVsWithoutControl", unlocked: false, completed: false },
    { key: "fullWeightTransferVsRebounds", unlocked: false, completed: false },
    { key: "expandingVsShrinking", unlocked: false, completed: false },
    { key: "highBodyTensionVsLowBodyTension", unlocked: false, completed: false },
    { key: "feetAlwaysOnFloorVsFeetOffFloor", unlocked: false, completed: false },
    { key: "pushingFloorVsNotPushingFloor", unlocked: false, completed: false },
    { key: "leadingEveryStepVsNotLeadingEveryStep", unlocked: false, completed: false },
    { key: "sameStepsVsDifferentSteps", unlocked: false, completed: false },
    { key: "fewStepsVsManySteps", unlocked: false, completed: false },
    { key: "dancingRhythmVsDancingMelody", unlocked: false, completed: false },
    { key: "facingPartnerVsTurningAway", unlocked: false, completed: false },
    { key: "acceleratingVsDecelerating", unlocked: false, completed: false },
    { key: "dancingRubato", unlocked: false, completed: false },
    { key: "marcatoIn2VsIn4", unlocked: false, completed: false },
    { key: "normalSyncopa", unlocked: false, completed: false },
    { key: "doubleSyncopa", unlocked: false, completed: false },
    { key: "dragSyncopa", unlocked: false, completed: false },
    { key: "dance4To1", unlocked: false, completed: false },
    { key: "danceTriplets", unlocked: false, completed: false },
    { key: "danceLikeJellyfish", unlocked: false, completed: false },
    { key: "danceLikeWater", unlocked: false, completed: false },
    { key: "danceLikeSculptures", unlocked: false, completed: false },
    { key: "danceTheAccents", unlocked: false, completed: false }
  ];

  const getNodeStatus = (unlocked: boolean, completed: boolean) => {
    if (completed) return 'completed';
    if (unlocked) return 'unlocked';
    return 'locked';
  };
  
  const getNodeIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-sage-green" />;
      case 'unlocked':
        return <Circle className="w-6 h-6 text-golden-yellow" />;
      default:
        return <Lock className="w-6 h-6 text-warm-brown opacity-50" />;
    }
  };

  // Generate winding path coordinates for each concept
  const generateWindingPath = (index: number, total: number) => {
    const progress = index / (total - 1);
    const baseY = progress * 100; // Base vertical progression

    // Create curves using sine waves with different frequencies
    const curve1 = Math.sin(progress * Math.PI * 3) * 15; // Primary curve
    const curve2 = Math.sin(progress * Math.PI * 7) * 8; // Secondary curve
    const curve3 = Math.sin(progress * Math.PI * 11) * 4; // Tertiary curve

    const x = 50 + curve1 + curve2 + curve3; // Center at 50% with curves
    const y = baseY;
    return {
      x,
      y
    };
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-golden-yellow animate-organic-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-dusty-rose animate-organic-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 rounded-full bg-terracotta animate-organic-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 p-4 flex justify-between items-center">
        <Link to="/" className="inline-flex items-center gap-2 text-cream bg-warm-brown/80 px-4 py-2 rounded-full hover:bg-warm-brown transition-all duration-300 shadow-lg backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4" />
          {t('common.backToHome')}
        </Link>
        
        <LanguageSelector />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Map className="w-16 h-16 text-golden-yellow drop-shadow-lg" />
          <h1 className="text-6xl md:text-8xl font-display text-cream drop-shadow-2xl tracking-wider">
            {t('roadmap.title')}
          </h1>
        </div>
      </div>

      {/* Winding Road Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="relative min-h-[3000px]">
          {/* Winding Road Background - SVG Path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--warm-brown))" stopOpacity="0.8" />
                <stop offset="50%" stopColor="hsl(var(--caramel))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--warm-brown))" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            {/* Generate smooth winding path */}
            <path d={`M ${generateWindingPath(0, allConcepts.length).x} ${generateWindingPath(0, allConcepts.length).y} ${allConcepts.map((_, index) => {
            const point = generateWindingPath(index, allConcepts.length);
            return index === 0 ? '' : `L ${point.x} ${point.y}`;
          }).join(' ')}`} stroke="url(#roadGradient)" strokeWidth="8" fill="none" className="drop-shadow-2xl" />
            
            {/* Road center line */}
            <path d={`M ${generateWindingPath(0, allConcepts.length).x} ${generateWindingPath(0, allConcepts.length).y} ${allConcepts.map((_, index) => {
            const point = generateWindingPath(index, allConcepts.length);
            return index === 0 ? '' : `L ${point.x} ${point.y}`;
          }).join(' ')}`} stroke="hsl(var(--cream))" strokeWidth="1" fill="none" strokeDasharray="2 3" className="opacity-60" />
          </svg>

          {/* Concept Nodes along the winding path */}
          {allConcepts.map((concept, index) => {
            const status = getNodeStatus(concept.unlocked, concept.completed);
            const position = generateWindingPath(index, allConcepts.length);
            const isLeft = position.x < 50; // Determine which side of the road to place the concept

            const ConceptCard = ({ children }: { children: React.ReactNode }) => {
              if (concept.link && status !== 'locked') {
                return (
                  <Link to={concept.link} className="block">
                    {children}
                  </Link>
                );
              }
              return <>{children}</>;
            };

            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`
                }}
              >
                {/* Road Node */}
                <div className="relative flex items-center">
                  {/* Concept Card */}
                  <div className={`${isLeft ? 'order-1 mr-8' : 'order-3 ml-8'} transform ${isLeft ? 'rotate-2' : '-rotate-2'}`}>
                    <ConceptCard>
                      <div className={`game-card ${status} bg-gradient-to-br from-cream to-sandy-beige border-4 border-warm-brown shadow-xl rounded-2xl p-4 min-w-[240px] transition-all duration-300 hover:scale-105 ${status === 'locked' ? 'opacity-60 grayscale' : 'cursor-pointer hover:shadow-2xl'}`}>
                        <div className="text-warm-brown font-bold text-center text-sm">
                          {t(`concepts.${concept.key}`)}
                        </div>
                        {status === 'locked' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-warm-brown/80 rounded-2xl">
                            <Lock className="w-6 h-6 text-cream" />
                          </div>
                        )}
                      </div>
                    </ConceptCard>
                  </div>

                  {/* Central Road Node */}
                  <div className="order-2 relative z-20">
                    <ConceptCard>
                      <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-2xl transition-all duration-300 ${status === 'completed' ? 'bg-sage-green border-cream animate-gentle-bounce' : status === 'unlocked' ? 'bg-golden-yellow border-cream hover:scale-110 cursor-pointer' : 'bg-warm-brown border-cream opacity-60'}`}>
                        {getNodeIcon(status)}
                      </div>
                    </ConceptCard>
                    
                    {/* Node Number */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-warm-brown text-cream px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action - Game Style */}
        <div className="text-center mb-16 mt-16">
          
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
