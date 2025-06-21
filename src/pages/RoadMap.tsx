import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Map as MapIcon, Lock, CheckCircle, Circle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationKey } from '@/data/translations/index';
import { useTopicVisibility } from '@/contexts/TopicVisibilityContext';
import { useTopicActivation } from '@/hooks/useTopicActivation';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSelector from '@/components/LanguageSelector';

const RoadMap = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { getTopicVisibility, isLoading, visibleTopics } = useTopicVisibility();
  const { getTopicDeadline } = useTopicActivation();
  const [nextAvailableDate, setNextAvailableDate] = useState<Date | null>(null);
  const [nextAvailableTopicIndex, setNextAvailableTopicIndex] = useState<number | null>(null);

  // All concepts combined into one flowing sequence
  const allConcepts: Array<{
    key: string;
    translationKey: TranslationKey;
    topicIndex?: number;
    link?: string;
  }> = useMemo(() => [
    { key: "dancingFastVsSlow", translationKey: "concepts.dancingFastVsSlow", topicIndex: 0, link: "/exercises/dancing-fast-slow" },
    { key: "dancingSmallVsBig", translationKey: "concepts.dancingSmallVsBig", topicIndex: 1, link: "/exercises/dancing-small-big" },
    { key: "dancingHighVsLow", translationKey: "concepts.dancingHighVsLow", topicIndex: 2, link: "/exercises/dancing-high-low" },
    { key: "dancingCircularVsLinear", translationKey: "concepts.dancingCircularVsLinear", topicIndex: 3, link: "/exercises/dancing-circular-linear" },
    { key: "withControlVsWithoutControl", translationKey: "concepts.withControlVsWithoutControl", topicIndex: 4, link: "/exercises/dancing-with-without-control" },
    { key: "fullWeightTransferVsRebounds", translationKey: "concepts.fullWeightTransferVsRebounds" },
    { key: "expandingVsShrinking", translationKey: "concepts.expandingVsShrinking" },
    { key: "highBodyTensionVsLowBodyTension", translationKey: "concepts.highBodyTensionVsLowBodyTension" },
    { key: "feetAlwaysOnFloorVsFeetOffFloor", translationKey: "concepts.feetAlwaysOnFloorVsFeetOffFloor" },
    { key: "pushingFloorVsNotPushingFloor", translationKey: "concepts.pushingFloorVsNotPushingFloor" },
    { key: "leadingEveryStepVsNotLeadingEveryStep", translationKey: "concepts.leadingEveryStepVsNotLeadingEveryStep" },
    { key: "sameStepsVsDifferentSteps", translationKey: "concepts.sameStepsVsDifferentSteps" },
    { key: "fewStepsVsManySteps", translationKey: "concepts.fewStepsVsManySteps" },
    { key: "dancingRhythmVsDancingMelody", translationKey: "concepts.dancingRhythmVsDancingMelody" },
    { key: "facingPartnerVsTurningAway", translationKey: "concepts.facingPartnerVsTurningAway" },
    { key: "acceleratingVsDecelerating", translationKey: "concepts.acceleratingVsDecelerating" },
    { key: "dancingRubato", translationKey: "concepts.dancingRubato" },
    { key: "marcatoIn2VsIn4", translationKey: "concepts.marcatoIn2VsIn4" },
    { key: "normalSyncopa", translationKey: "concepts.normalSyncopa" },
    { key: "doubleSyncopa", translationKey: "concepts.doubleSyncopa" },
    { key: "dragSyncopa", translationKey: "concepts.dragSyncopa" },
    { key: "dance4To1", translationKey: "concepts.dance4To1" },
    { key: "danceTriplets", translationKey: "concepts.danceTriplets" },
    { key: "danceLikeJellyfish", translationKey: "concepts.danceLikeJellyfish" },
    { key: "danceLikeWater", translationKey: "concepts.danceLikeWater" },
    { key: "danceLikeSculptures", translationKey: "concepts.danceLikeSculptures" },
    { key: "danceTheAccents", translationKey: "concepts.danceTheAccents" }
  ], []);

  // Memoize concept statuses to prevent excessive calls to getTopicVisibility
  const conceptStatuses = useMemo(() => {
    const statuses = new Map();
    
    allConcepts.forEach(concept => {
      if (concept.topicIndex === undefined) {
        statuses.set(concept.key, {
          unlocked: false,
          completed: false,
          visible: false,
          active: false
        });
        return;
      }

      const topicVisibility = getTopicVisibility(concept.topicIndex);
      
      if (!topicVisibility) {
        statuses.set(concept.key, {
          unlocked: false,
          completed: false,
          visible: false,
          active: false
        });
        return;
      }

      statuses.set(concept.key, {
        unlocked: topicVisibility.isUnlocked,
        completed: false,
        visible: topicVisibility.isVisible,
        active: topicVisibility.isActive
      });
    });

    return statuses;
  }, [allConcepts, getTopicVisibility, visibleTopics]); // Include visibleTopics to ensure updates

  // Calculate next available date only when needed
  useEffect(() => {
    const calculateNextAvailableDate = async () => {
      if (!user || isLoading || visibleTopics.length === 0) return;

      // Find the first locked topic that isn't visible
      const lockedTopic = visibleTopics.find(topic => !topic.isVisible && !topic.isUnlocked);
      if (!lockedTopic) {
        setNextAvailableDate(null);
        setNextAvailableTopicIndex(null);
        return;
      }

      // Get the previous topic's deadline to calculate availability
      const previousTopicIndex = lockedTopic.topicIndex - 1;
      const previousTopic = visibleTopics.find(t => t.topicIndex === previousTopicIndex);
      
      if (previousTopic && previousTopic.isActive) {
        try {
          const deadline = await getTopicDeadline(previousTopic.topicKey, previousTopic.topicIndex);
          if (deadline) {
            setNextAvailableDate(deadline);
            setNextAvailableTopicIndex(lockedTopic.topicIndex);
          } else {
            setNextAvailableDate(null);
            setNextAvailableTopicIndex(null);
          }
        } catch (error) {
          console.error('Error calculating next available date:', error);
          setNextAvailableDate(null);
          setNextAvailableTopicIndex(null);
        }
      } else {
        setNextAvailableDate(null);
        setNextAvailableTopicIndex(null);
      }
    };

    calculateNextAvailableDate();
  }, [user, isLoading, visibleTopics, getTopicDeadline]);

  // Generate winding path coordinates for each concept
  const generateWindingPath = useCallback((index: number, total: number) => {
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
  }, []);

  const getNodeIcon = (unlocked: boolean, active: boolean, visible: boolean) => {
    if (!visible) {
      return <Lock className="w-6 h-6 text-warm-brown opacity-50" />;
    }
    
    if (active) {
      return <Circle className="w-6 h-6 text-sage-green animate-gentle-bounce" />;
    }
    
    if (unlocked) {
      return <Circle className="w-6 h-6 text-golden-yellow" />;
    }
    
    return <Lock className="w-6 h-6 text-warm-brown opacity-50" />;
  };

  const getNodeBackground = (unlocked: boolean, active: boolean, visible: boolean) => {
    if (!visible) {
      return 'bg-warm-brown border-cream opacity-60';
    }
    
    if (active) {
      return 'bg-sage-green border-cream animate-gentle-bounce';
    }
    
    if (unlocked) {
      return 'bg-golden-yellow border-cream hover:scale-110 cursor-pointer';
    }
    
    return 'bg-warm-brown border-cream opacity-60';
  };

  const formatAvailabilityDate = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, []);

  const shouldShowAvailabilityInfo = useCallback((concept: typeof allConcepts[0]) => {
    return user && 
           concept.topicIndex === nextAvailableTopicIndex && 
           nextAvailableDate && 
           !conceptStatuses.get(concept.key)?.visible;
  }, [user, nextAvailableTopicIndex, nextAvailableDate, conceptStatuses]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige flex items-center justify-center">
        <div className="text-cream text-2xl">Loading...</div>
      </div>
    );
  }
  
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
          <MapIcon className="w-16 h-16 text-golden-yellow drop-shadow-lg" />
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
            const conceptStatus = conceptStatuses.get(concept.key) || { unlocked: false, completed: false, visible: false, active: false };
            const position = generateWindingPath(index, allConcepts.length);
            const isLeft = position.x < 50; // Determine which side of the road to place the concept
            const canRoute = conceptStatus.visible && concept.link;
            const showAvailability = shouldShowAvailabilityInfo(concept);

            const ConceptCard = ({ children }: { children: React.ReactNode }) => {
              if (canRoute) {
                return (
                  <Link to={concept.link!} className="block">
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
                      <div className={`game-card bg-gradient-to-br from-cream to-sandy-beige border-4 border-warm-brown shadow-xl rounded-2xl p-4 min-w-[240px] transition-all duration-300 hover:scale-105 ${!conceptStatus.visible ? 'opacity-60 grayscale' : canRoute ? 'cursor-pointer hover:shadow-2xl' : ''}`}>
                        <div className="text-warm-brown font-bold text-center text-sm">
                          {t(concept.translationKey)}
                        </div>
                        {showAvailability && nextAvailableDate && (
                          <div className="text-xs text-sage-green font-medium text-center mt-2">
                            Available on {formatAvailabilityDate(nextAvailableDate)}
                          </div>
                        )}
                        {!conceptStatus.visible && !showAvailability && (
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
                      <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-2xl transition-all duration-300 ${getNodeBackground(conceptStatus.unlocked, conceptStatus.active, conceptStatus.visible)}`}>
                        {getNodeIcon(conceptStatus.unlocked, conceptStatus.active, conceptStatus.visible)}
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
