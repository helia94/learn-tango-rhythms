
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Map, Lock, CheckCircle, Circle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const RoadMap = () => {
  const { t } = useTranslation();

  const danceConceptPairs = [
    { left: "Dancing fast", right: "Dancing slow", unlocked: true, completed: true },
    { left: "Dancing small", right: "Dancing big", unlocked: true, completed: true },
    { left: "Dancing high", right: "Dancing low", unlocked: true, completed: false },
    { left: "Dancing circular", right: "Dancing linear", unlocked: true, completed: false },
    { left: "With control", right: "Without control", unlocked: false, completed: false },
    { left: "Full weight transfer", right: "Rebounds", unlocked: false, completed: false },
    { left: "Expanding", right: "Shrinking", unlocked: false, completed: false },
    { left: "High body tension", right: "Low body tension", unlocked: false, completed: false },
    { left: "Feet always on the floor", right: "Feet off the floor", unlocked: false, completed: false },
    { left: "Pushing the floor", right: "Not pushing the floor", unlocked: false, completed: false },
    { left: "Leading every step", right: "Not leading every step", unlocked: false, completed: false },
    { left: "Same steps", right: "Different steps", unlocked: false, completed: false },
    { left: "Few steps", right: "Many steps", unlocked: false, completed: false },
    { left: "Dancing rhythm", right: "Dancing melody", unlocked: false, completed: false },
    { left: "Facing partner", right: "Turning away", unlocked: false, completed: false },
    { left: "Accelerating", right: "Decelerating", unlocked: false, completed: false }
  ];

  const singleConcepts = [
    { name: "Dancing rubato", unlocked: false, completed: false },
    { name: "Marcato in 2 vs in 4", unlocked: false, completed: false },
    { name: "The normal syncopa", unlocked: false, completed: false },
    { name: "The double syncopa", unlocked: false, completed: false },
    { name: "The drag syncopa", unlocked: false, completed: false },
    { name: "Dance 4-1", unlocked: false, completed: false },
    { name: "Dance triplets", unlocked: false, completed: false },
    { name: "Dance like a jellyfish", unlocked: false, completed: false },
    { name: "Dance like water", unlocked: false, completed: false },
    { name: "Dance like sculptures", unlocked: false, completed: false },
    { name: "Dance the accents", unlocked: false, completed: false }
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-golden-yellow animate-organic-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-dusty-rose animate-organic-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 rounded-full bg-terracotta animate-organic-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 p-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-cream bg-warm-brown/80 px-4 py-2 rounded-full hover:bg-warm-brown transition-all duration-300 shadow-lg backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Map className="w-16 h-16 text-golden-yellow drop-shadow-lg" />
          <h1 className="text-6xl md:text-8xl font-display text-cream drop-shadow-2xl tracking-wider">
            ROAD MAP
          </h1>
        </div>
        
        <div className="mx-auto max-w-2xl bg-cream/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-golden-yellow">
          <p className="text-xl text-warm-brown font-medium">
            🎯 Your Tango Mastery Journey
          </p>
          <p className="text-warm-brown mt-2">
            Navigate through fundamental concepts and unlock advanced techniques
          </p>
        </div>
      </div>

      {/* Road Path Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* The Road - Winding Path */}
        <div className="relative">
          {/* Road Background */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-32 bg-gradient-to-b from-warm-brown to-caramel rounded-full opacity-80 shadow-2xl min-h-full"></div>
          </div>
          
          {/* Road Markings */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-2 bg-cream opacity-60 min-h-full flex flex-col gap-8 pt-8">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="h-8 bg-cream rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Concept Nodes on the Road */}
          <div className="relative z-10 space-y-16 py-8">
            {danceConceptPairs.map((pair, index) => {
              const status = getNodeStatus(pair.unlocked, pair.completed);
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative">
                  {/* Concept Pair Node */}
                  <div className={`flex items-center justify-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Left/Right Concept */}
                    <div className={`${isEven ? 'mr-8' : 'ml-8'} transform ${isEven ? 'rotate-2' : '-rotate-2'}`}>
                      <div className={`game-card ${status} bg-gradient-to-br from-cream to-sandy-beige border-4 border-warm-brown shadow-xl rounded-2xl p-4 min-w-[200px] transition-all duration-300 hover:scale-105`}>
                        <div className="text-warm-brown font-bold text-center">
                          {isEven ? pair.left : pair.right}
                        </div>
                      </div>
                    </div>

                    {/* Central Road Node */}
                    <div className="relative z-20">
                      <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-2xl transition-all duration-300 ${
                        status === 'completed' 
                          ? 'bg-sage-green border-cream animate-gentle-bounce' 
                          : status === 'unlocked'
                          ? 'bg-golden-yellow border-cream hover:scale-110 cursor-pointer'
                          : 'bg-warm-brown border-cream opacity-60'
                      }`}>
                        {getNodeIcon(status)}
                      </div>
                      
                      {/* Node Number */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="bg-warm-brown text-cream px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Right/Left Concept */}
                    <div className={`${isEven ? 'ml-8' : 'mr-8'} transform ${isEven ? '-rotate-2' : 'rotate-2'}`}>
                      <div className={`game-card ${status} bg-gradient-to-br from-cream to-sandy-beige border-4 border-warm-brown shadow-xl rounded-2xl p-4 min-w-[200px] transition-all duration-300 hover:scale-105`}>
                        <div className="text-warm-brown font-bold text-center">
                          {isEven ? pair.right : pair.left}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* VS Indicator */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="bg-burnt-orange text-cream px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      VS
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Advanced Concepts Section - Bonus Area */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-display text-cream drop-shadow-lg mb-4">
              🏆 BONUS CHALLENGES
            </h2>
            <div className="bg-terracotta/90 backdrop-blur-sm rounded-2xl p-4 max-w-md mx-auto shadow-xl border-2 border-golden-yellow">
              <p className="text-cream font-medium">
                Master the fundamentals to unlock these advanced techniques!
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {singleConcepts.map((concept, index) => {
              const status = getNodeStatus(concept.unlocked, concept.completed);
              
              return (
                <div key={index} className="relative group">
                  <div className={`game-card ${status} bg-gradient-to-br from-dusty-rose to-paprika border-3 border-cream shadow-xl rounded-xl p-4 text-center transition-all duration-300 ${
                    status === 'locked' ? 'opacity-50 grayscale' : 'hover:scale-105 hover:rotate-1'
                  }`}>
                    <div className="flex items-center justify-center mb-2">
                      {getNodeIcon(status)}
                    </div>
                    <div className="text-cream font-bold text-sm">
                      {concept.name}
                    </div>
                    {status === 'locked' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-warm-brown/80 rounded-xl">
                        <Lock className="w-8 h-8 text-cream" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action - Game Style */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-burnt-orange to-terracotta backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-golden-yellow max-w-2xl mx-auto">
            <h3 className="text-3xl font-display text-cream mb-4 drop-shadow-lg">
              🚀 READY TO START YOUR JOURNEY?
            </h3>
            <p className="text-cream mb-6 text-lg">
              Begin practicing and unlock new concepts as you progress
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/rhythmlab" 
                className="game-button bg-gradient-to-r from-sage-green to-deep-teal text-cream px-8 py-4 rounded-xl font-bold text-lg shadow-xl border-2 border-cream hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                🎵 START PRACTICE
              </Link>
              <Link 
                to="/rhythmlab/quiz" 
                className="game-button bg-gradient-to-r from-golden-yellow to-dusty-rose text-warm-brown px-8 py-4 rounded-xl font-bold text-lg shadow-xl border-2 border-cream hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                🧠 TAKE QUIZ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
