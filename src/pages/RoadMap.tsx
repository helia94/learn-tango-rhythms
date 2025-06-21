import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Map, Lock, CheckCircle, Circle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationKey } from '@/data/translations/index';
import { useTopicVisibility } from '@/contexts/TopicVisibilityContext';
import LanguageSelector from '@/components/LanguageSelector';
import TopicProgressManager from '@/components/TopicProgressManager';

const RoadMap = () => {
  const { t } = useTranslation();
  const { getTopicVisibility, getAllVisibleTopics } = useTopicVisibility();

  // All concepts with their configuration
  const allConcepts: Array<{
    key: string;
    translationKey: TranslationKey;
    topicIndex: number;
    link?: string;
  }> = [
    { key: "dancingFastVsSlow", translationKey: "concepts.dancingFastVsSlow", topicIndex: 0, link: "/exercises/dancing-fast-slow" },
    { key: "dancingSmallVsBig", translationKey: "concepts.dancingSmallVsBig", topicIndex: 1, link: "/exercises/dancing-small-big" },
    { key: "dancingHighVsLow", translationKey: "concepts.dancingHighVsLow", topicIndex: 2, link: "/exercises/dancing-high-low" },
    { key: "dancingCircularVsLinear", translationKey: "concepts.dancingCircularVsLinear", topicIndex: 3, link: "/exercises/dancing-circular-linear" },
    { key: "withControlVsWithoutControl", translationKey: "concepts.withControlVsWithoutControl", topicIndex: 4, link: "/exercises/dancing-with-without-control" },
    { key: "fullWeightTransferVsRebounds", translationKey: "concepts.fullWeightTransferVsRebounds", topicIndex: 5 },
    { key: "expandingVsShrinking", translationKey: "concepts.expandingVsShrinking", topicIndex: 6 },
    { key: "highBodyTensionVsLowBodyTension", translationKey: "concepts.highBodyTensionVsLowBodyTension", topicIndex: 7 },
    { key: "feetAlwaysOnFloorVsFeetOffFloor", translationKey: "concepts.feetAlwaysOnFloorVsFeetOffFloor", topicIndex: 8 },
    { key: "pushingFloorVsNotPushingFloor", translationKey: "concepts.pushingFloorVsNotPushingFloor", topicIndex: 9 },
    { key: "leadingEveryStepVsNotLeadingEveryStep", translationKey: "concepts.leadingEveryStepVsNotLeadingEveryStep", topicIndex: 10 },
    { key: "sameStepsVsDifferentSteps", translationKey: "concepts.sameStepsVsDifferentSteps", topicIndex: 11 },
    { key: "fewStepsVsManySteps", translationKey: "concepts.fewStepsVsManySteps", topicIndex: 12 },
    { key: "dancingRhythmVsDancingMelody", translationKey: "concepts.dancingRhythmVsDancingMelody", topicIndex: 13 },
    { key: "facingPartnerVsTurningAway", translationKey: "concepts.facingPartnerVsTurningAway", topicIndex: 14 },
    { key: "acceleratingVsDecelerating", translationKey: "concepts.acceleratingVsDecelerating", topicIndex: 15 },
    { key: "dancingRubato", translationKey: "concepts.dancingRubato", topicIndex: 16 },
    { key: "marcatoIn2VsIn4", translationKey: "concepts.marcatoIn2VsIn4", topicIndex: 17 },
    { key: "normalSyncopa", translationKey: "concepts.normalSyncopa", topicIndex: 18 },
    { key: "doubleSyncopa", translationKey: "concepts.doubleSyncopa", topicIndex: 19 },
    { key: "dragSyncopa", translationKey: "concepts.dragSyncopa", topicIndex: 20 },
    { key: "dance4To1", translationKey: "concepts.dance4To1", topicIndex: 21 },
    { key: "danceTriplets", translationKey: "concepts.danceTriplets", topicIndex: 22 },
    { key: "danceLikeJellyfish", translationKey: "concepts.danceLikeJellyfish", topicIndex: 23 },
    { key: "danceLikeWater", translationKey: "concepts.danceLikeWater", topicIndex: 24 },
    { key: "danceLikeSculptures", translationKey: "concepts.danceLikeSculptures", topicIndex: 25 },
    { key: "danceTheAccents", translationKey: "concepts.danceTheAccents", topicIndex: 26 }
  ];

  // Filter concepts based on visibility
  const visibleConcepts = allConcepts.filter(concept => {
    const visibility = getTopicVisibility(concept.key, concept.topicIndex);
    return visibility.isVisible;
  });

  const getNodeStatus = (concept: typeof allConcepts[0]) => {
    const visibility = getTopicVisibility(concept.key, concept.topicIndex);
    
    if (!visibility.isVisible) return 'locked';
    if (visibility.isActive) return 'active';
    if (visibility.isUnlocked) return 'unlocked';
    return 'locked';
  };
  
  const getNodeIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-6 h-6 text-golden-yellow animate-pulse" />;
      case 'unlocked':
        return <Circle className="w-6 h-6 text-sage-green" />;
      default:
        return <Lock className="w-6 h-6 text-warm-brown opacity-50" />;
    }
  };

  // Generate winding path coordinates for each visible concept
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
      {/* Include topic progress manager */}
      <TopicProgressManager />
      
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
            
            {/* Generate smooth winding path for visible concepts */}
            <path d={`M ${generateWindingPath(0, visibleConcepts.length).x} ${generateWindingPath(0, visibleConcepts.length).y} ${visibleConcepts.map((_, index) => {
            const point = generateWindingPath(index, visibleConcepts.length);
            return index === 0 ? '' : `L ${point.x} ${point.y}`;
          }).join(' ')}`} stroke="url(#roadGradient)" strokeWidth="8" fill="none" className="drop-shadow-2xl" />
            
            {/* Road center line */}
            <path d={`M ${generateWindingPath(0, visibleConcepts.length).x} ${generateWindingPath(0, visibleConcepts.length).y} ${visibleConcepts.map((_, index) => {
            const point = generateWindingPath(index, visibleConcepts.length);
            return index === 0 ? '' : `L ${point.x} ${point.y}`;
          }).join(' ')}`} stroke="hsl(var(--cream))" strokeWidth="1" fill="none" strokeDasharray="2 3" className="opacity-60" />
          </svg>

          {/* Concept Nodes along the winding path */}
          {visibleConcepts.map((concept, index) => {
            const status = getNodeStatus(concept);
            const position = generateWindingPath(index, visibleConcepts.length);
            const isLeft = position.x < 50; // Determine which side of the road to place the concept
            const visibility = getTopicVisibility(concept.key, concept.topicIndex);

            const ConceptCard = ({ children }: { children: React.ReactNode }) => {
              if (concept.link && visibility.isUnlocked) {
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
                      <div className={`game-card ${status} bg-gradient-to-br from-cream to-sandy-beige border-4 border-warm-brown shadow-xl rounded-2xl p-4 min-w-[240px] transition-all duration-300 hover:scale-105 ${!visibility.isUnlocked ? 'opacity-60 grayscale' : 'cursor-pointer hover:shadow-2xl'}`}>
                        <div className="text-warm-brown font-bold text-center text-sm">
                          {t(concept.translationKey)}
                        </div>
                        {visibility.isActive && visibility.deadline && (
                          <div className="mt-2 text-xs text-center text-golden-yellow font-medium">
                            Active until {visibility.deadline.toLocaleDateString()}
                          </div>
                        )}
                        {!visibility.isUnlocked && (
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
                      <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-2xl transition-all duration-300 ${status === 'active' ? 'bg-golden-yellow border-cream animate-gentle-bounce' : status === 'unlocked' ? 'bg-sage-green border-cream hover:scale-110 cursor-pointer' : 'bg-warm-brown border-cream opacity-60'}`}>
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
