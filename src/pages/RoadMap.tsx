
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Map, Lock, CheckCircle, Circle, Star, Trophy, Zap, Heart, Music, Compass, Target, Crown, Gem, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const RoadMap = () => {
  const { t } = useTranslation();

  // All concepts combined into one road with varying distances
  const allConcepts = [
    { name: "Dancing fast vs Dancing slow", unlocked: true, completed: true, distance: 'short', symbol: Zap },
    { name: "Dancing small vs Dancing big", unlocked: true, completed: true, distance: 'medium', symbol: Star },
    { name: "Dancing high vs Dancing low", unlocked: true, completed: false, distance: 'long', symbol: Target },
    { name: "Dancing circular vs Dancing linear", unlocked: true, completed: false, distance: 'short', symbol: Compass },
    { name: "With control vs Without control", unlocked: false, completed: false, distance: 'long', symbol: Crown },
    { name: "Full weight transfer vs Rebounds", unlocked: false, completed: false, distance: 'medium', symbol: Heart },
    { name: "Expanding vs Shrinking", unlocked: false, completed: false, distance: 'short', symbol: Gem },
    { name: "High body tension vs Low body tension", unlocked: false, completed: false, distance: 'long', symbol: Sparkles },
    { name: "Feet always on the floor vs Feet off the floor", unlocked: false, completed: false, distance: 'medium', symbol: Music },
    { name: "Pushing the floor vs Not pushing the floor", unlocked: false, completed: false, distance: 'short', symbol: Trophy },
    { name: "Leading every step vs Not leading every step", unlocked: false, completed: false, distance: 'long', symbol: Star },
    { name: "Same steps vs Different steps", unlocked: false, completed: false, distance: 'medium', symbol: Target },
    { name: "Few steps vs Many steps", unlocked: false, completed: false, distance: 'short', symbol: Compass },
    { name: "Dancing rhythm vs Dancing melody", unlocked: false, completed: false, distance: 'long', symbol: Music },
    { name: "Facing partner vs Turning away", unlocked: false, completed: false, distance: 'medium', symbol: Heart },
    { name: "Accelerating vs Decelerating", unlocked: false, completed: false, distance: 'short', symbol: Zap },
    { name: "Dancing rubato", unlocked: false, completed: false, distance: 'long', symbol: Crown },
    { name: "Marcato in 2 vs in 4", unlocked: false, completed: false, distance: 'medium', symbol: Gem },
    { name: "The normal syncopa", unlocked: false, completed: false, distance: 'short', symbol: Sparkles },
    { name: "The double syncopa", unlocked: false, completed: false, distance: 'long', symbol: Trophy },
    { name: "The drag syncopa", unlocked: false, completed: false, distance: 'medium', symbol: Star },
    { name: "Dance 4-1", unlocked: false, completed: false, distance: 'short', symbol: Target },
    { name: "Dance triplets", unlocked: false, completed: false, distance: 'long', symbol: Music },
    { name: "Dance like a jellyfish", unlocked: false, completed: false, distance: 'medium', symbol: Heart },
    { name: "Dance like water", unlocked: false, completed: false, distance: 'short', symbol: Compass },
    { name: "Dance like sculptures", unlocked: false, completed: false, distance: 'long', symbol: Crown },
    { name: "Dance the accents", unlocked: false, completed: false, distance: 'medium', symbol: Gem }
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

  const getDistanceClass = (distance: string) => {
    switch (distance) {
      case 'short': return 'mb-8';
      case 'medium': return 'mb-16';
      case 'long': return 'mb-24';
      default: return 'mb-16';
    }
  };

  const getWindingOffset = (index: number) => {
    const patterns = [
      'translate-x-0',
      'translate-x-8',
      '-translate-x-8',
      'translate-x-16',
      '-translate-x-16',
      'translate-x-4',
      '-translate-x-4',
      'translate-x-12',
      '-translate-x-12'
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-golden-yellow animate-organic-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-dusty-rose animate-organic-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 rounded-full bg-terracotta animate-organic-pulse delay-2000"></div>
        
        {/* Additional floating symbols */}
        <div className="absolute top-32 right-40 text-golden-yellow opacity-30 animate-gentle-bounce delay-500">
          <Star className="w-8 h-8" />
        </div>
        <div className="absolute top-60 left-32 text-dusty-rose opacity-30 animate-gentle-bounce delay-1500">
          <Music className="w-10 h-10" />
        </div>
        <div className="absolute bottom-60 right-32 text-terracotta opacity-30 animate-gentle-bounce delay-2500">
          <Trophy className="w-12 h-12" />
        </div>
        <div className="absolute top-80 right-60 text-sage-green opacity-30 animate-gentle-bounce delay-3000">
          <Heart className="w-8 h-8" />
        </div>
      </div>

      {/* Navigation with enhanced styling */}
      <div className="relative z-10 p-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-cream bg-gradient-to-r from-warm-brown to-caramel px-6 py-3 rounded-full hover:from-caramel hover:to-warm-brown transition-all duration-300 shadow-xl backdrop-blur-sm border-2 border-golden-yellow/30 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold">Back to Home</span>
        </Link>
      </div>

      {/* Enhanced Header */}
      <div className="relative z-10 text-center mb-12">
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="relative">
            <Map className="w-20 h-20 text-golden-yellow drop-shadow-2xl animate-gentle-bounce" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-dusty-rose animate-organic-pulse" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-display text-cream drop-shadow-2xl tracking-wider relative">
            ROAD MAP
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6">
              <Crown className="w-8 h-8 md:w-12 md:h-12 text-golden-yellow animate-gentle-bounce delay-1000" />
            </div>
          </h1>
        </div>
        
        <div className="mx-auto max-w-3xl bg-gradient-to-r from-cream/90 via-sandy-beige/90 to-cream/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-golden-yellow relative overflow-hidden">
          <div className="absolute top-2 left-4">
            <Gem className="w-6 h-6 text-terracotta opacity-60" />
          </div>
          <div className="absolute bottom-2 right-4">
            <Target className="w-6 h-6 text-sage-green opacity-60" />
          </div>
          <p className="text-2xl text-warm-brown font-bold mb-2">
            🎯 Your Tango Mastery Journey
          </p>
          <p className="text-warm-brown text-lg">
            Navigate through fundamental concepts and unlock advanced techniques on this winding path of discovery
          </p>
        </div>
      </div>

      {/* Enhanced Winding Road Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="relative">
          {/* Enhanced Road Background - Now Winding */}
          <div className="absolute inset-0 flex justify-center">
            <div className="relative w-40 min-h-full">
              {/* Main road with curves */}
              <div className="absolute inset-0 bg-gradient-to-b from-warm-brown via-caramel to-warm-brown rounded-full opacity-80 shadow-2xl transform rotate-1"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-caramel via-warm-brown to-caramel rounded-full opacity-60 shadow-xl transform -rotate-1 scale-95"></div>
              
              {/* Road side decorations */}
              <div className="absolute -left-8 top-20 w-4 h-4 bg-dusty-rose rounded-full opacity-60"></div>
              <div className="absolute -right-8 top-40 w-6 h-6 bg-golden-yellow rounded-full opacity-50"></div>
              <div className="absolute -left-6 top-80 w-3 h-3 bg-sage-green rounded-full opacity-70"></div>
              <div className="absolute -right-10 top-120 w-5 h-5 bg-terracotta rounded-full opacity-60"></div>
            </div>
          </div>
          
          {/* Enhanced Road Markings */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-3 bg-cream opacity-70 min-h-full flex flex-col gap-6 pt-8 rounded-full">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className={`h-6 bg-cream rounded-full ${i % 3 === 0 ? 'bg-golden-yellow' : ''}`}></div>
              ))}
            </div>
          </div>

          {/* Concept Nodes on the Winding Road */}
          <div className="relative z-10 py-8">
            {allConcepts.map((concept, index) => {
              const status = getNodeStatus(concept.unlocked, concept.completed);
              const Symbol = concept.symbol;
              const windingOffset = getWindingOffset(index);
              const distanceClass = getDistanceClass(concept.distance);
              
              return (
                <div key={index} className={`relative ${distanceClass}`}>
                  <div className={`flex items-center justify-center ${windingOffset}`}>
                    {/* Concept Card */}
                    <div className="relative">
                      <div className={`game-card ${status} bg-gradient-to-br from-cream via-sandy-beige to-mushroom border-4 border-warm-brown shadow-2xl rounded-2xl p-6 min-w-[280px] max-w-[320px] transition-all duration-300 hover:scale-105 hover:rotate-1 transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-full ${
                            status === 'completed' 
                              ? 'bg-sage-green text-cream' 
                              : status === 'unlocked'
                              ? 'bg-golden-yellow text-warm-brown'
                              : 'bg-warm-brown text-cream opacity-60'
                          }`}>
                            <Symbol className="w-5 h-5" />
                          </div>
                          <div className={`w-12 h-12 rounded-full border-3 flex items-center justify-center shadow-xl transition-all duration-300 ${
                            status === 'completed' 
                              ? 'bg-sage-green border-cream animate-gentle-bounce' 
                              : status === 'unlocked'
                              ? 'bg-golden-yellow border-cream hover:scale-110 cursor-pointer'
                              : 'bg-warm-brown border-cream opacity-60'
                          }`}>
                            {getNodeIcon(status)}
                          </div>
                        </div>
                        
                        <div className="text-warm-brown font-bold text-center text-lg leading-tight">
                          {concept.name}
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-2 -right-2">
                          <div className="w-4 h-4 bg-golden-yellow rounded-full opacity-70"></div>
                        </div>
                        <div className="absolute -bottom-1 -left-1">
                          <div className="w-3 h-3 bg-dusty-rose rounded-full opacity-60"></div>
                        </div>
                      </div>
                      
                      {/* Node Number with enhanced styling */}
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-warm-brown to-caramel text-cream px-4 py-2 rounded-full text-sm font-bold shadow-xl border-2 border-golden-yellow/50">
                          #{index + 1}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Road milestone markers */}
                  {index % 5 === 0 && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                      <div className="bg-terracotta text-cream px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-gentle-bounce">
                        🏁 CHECKPOINT
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mb-16 mt-12">
          <div className="bg-gradient-to-br from-burnt-orange via-terracotta to-paprika backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-4 border-golden-yellow max-w-3xl mx-auto relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-4 left-6">
              <Trophy className="w-8 h-8 text-golden-yellow/30" />
            </div>
            <div className="absolute bottom-4 right-6">
              <Sparkles className="w-10 h-10 text-cream/20" />
            </div>
            <div className="absolute top-1/2 left-4">
              <Star className="w-6 h-6 text-dusty-rose/40 animate-organic-pulse" />
            </div>
            <div className="absolute top-1/2 right-4">
              <Gem className="w-6 h-6 text-golden-yellow/40 animate-organic-pulse delay-1000" />
            </div>
            
            <h3 className="text-4xl font-display text-cream mb-6 drop-shadow-lg relative">
              🚀 READY TO START YOUR EPIC JOURNEY?
            </h3>
            <p className="text-cream mb-8 text-xl leading-relaxed">
              Begin practicing and unlock new concepts as you progress along this magnificent tango road
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/rhythmlab" 
                className="group game-button bg-gradient-to-r from-sage-green via-deep-teal to-sage-green text-cream px-10 py-5 rounded-xl font-bold text-xl shadow-2xl border-3 border-cream hover:scale-110 transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <Music className="w-6 h-6 group-hover:animate-gentle-bounce" />
                  <span>START PRACTICE</span>
                </div>
              </Link>
              <Link 
                to="/rhythmlab/quiz" 
                className="group game-button bg-gradient-to-r from-golden-yellow via-dusty-rose to-golden-yellow text-warm-brown px-10 py-5 rounded-xl font-bold text-xl shadow-2xl border-3 border-cream hover:scale-110 transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 group-hover:animate-gentle-bounce" />
                  <span>TAKE QUIZ</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
