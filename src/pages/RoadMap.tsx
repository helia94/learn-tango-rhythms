
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Map, Lock, CheckCircle, Circle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from '@/components/LanguageSelector';

const RoadMap = () => {
  const { t } = useTranslation();

  // All concepts combined into one flowing sequence
  const allConcepts = [
    { name: "Dancing fast vs slow", unlocked: true, completed: true },
    { name: "Dancing small vs big", unlocked: true, completed: true },
    { name: "Dancing high vs low", unlocked: true, completed: false },
    { name: "Dancing circular vs linear", unlocked: true, completed: false },
    { name: "With control vs without control", unlocked: false, completed: false },
    { name: "Full weight transfer vs rebounds", unlocked: false, completed: false },
    { name: "Expanding vs shrinking", unlocked: false, completed: false },
    { name: "High body tension vs low body tension", unlocked: false, completed: false },
    { name: "Feet always on the floor vs feet off the floor", unlocked: false, completed: false },
    { name: "Pushing the floor vs not pushing the floor", unlocked: false, completed: false },
    { name: "Leading every step vs not leading every step", unlocked: false, completed: false },
    { name: "Same steps vs different steps", unlocked: false, completed: false },
    { name: "Few steps vs many steps", unlocked: false, completed: false },
    { name: "Dancing rhythm vs dancing melody", unlocked: false, completed: false },
    { name: "Facing partner vs turning away", unlocked: false, completed: false },
    { name: "Accelerating vs decelerating", unlocked: false, completed: false },
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

  // Generate winding path coordinates for each concept
  const generateWindingPath = (index: number, total: number) => {
    const progress = index / (total - 1);
    const baseY = progress * 100; // Base vertical progression
    
    // Create curves using sine waves with different frequencies
    const curve1 = Math.sin(progress * Math.PI * 3) * 15; // Primary curve
    const curve2 = Math.sin(progress * Math.PI * 7) * 8;  // Secondary curve
    const curve3 = Math.sin(progress * Math.PI * 11) * 4; // Tertiary curve
    
    const x = 50 + curve1 + curve2 + curve3; // Center at 50% with curves
    const y = baseY;
    
    return { x, y };
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
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-cream bg-warm-brown/80 px-4 py-2 rounded-full hover:bg-warm-brown transition-all duration-300 shadow-lg backdrop-blur-sm"
        >
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
        
        <div className="mx-auto max-w-2xl bg-cream/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-golden-yellow">
          <p className="text-xl text-warm-brown font-medium">
            {t('roadmap.subtitle')}
          </p>
          <p className="text-warm-brown mt-2">
            {t('roadmap.description')}
          </p>
        </div>
      </div>

      {/* Winding Road Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="relative min-h-[3000px]">
          {/* Winding Road Background - SVG Path */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--warm-brown))" stopOpacity="0.8" />
                <stop offset="50%" stopColor="hsl(var(--caramel))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--warm-brown))" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            {/* Generate smooth winding path */}
            <path
              d={`M ${generateWindingPath(0, allConcepts.length).x} ${generateWindingPath(0, allConcepts.length).y} ${
                allConcepts.map((_, index) => {
                  const point = generateWindingPath(index, allConcepts.length);
                  return index === 0 ? '' : `L ${point.x} ${point.y}`;
                }).join(' ')
              }`}
              stroke="url(#roadGradient)"
              strokeWidth="8"
              fill="none"
              className="drop-shadow-2xl"
            />
            
            {/* Road center line */}
            <path
              d={`M ${generateWindingPath(0, allConcepts.length).x} ${generateWindingPath(0, allConcepts.length).y} ${
                allConcepts.map((_, index) => {
                  const point = generateWindingPath(index, allConcepts.length);
                  return index === 0 ? '' : `L ${point.x} ${point.y}`;
                }).join(' ')
              }`}
              stroke="hsl(var(--cream))"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2 3"
              className="opacity-60"
            />
          </svg>

          {/* Concept Nodes along the winding path */}
          {allConcepts.map((concept, index) => {
            const status = getNodeStatus(concept.unlocked, concept.completed);
            const position = generateWindingPath(index, allConcepts.length);
            const isLeft = position.x < 50; // Determine which side of the road to place the concept
            
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
                    <div className={`game-card ${status} bg-gradient-to-br from-cream to-sandy-beige border-4 border-warm-brown shadow-xl rounded-2xl p-4 min-w-[240px] transition-all duration-300 hover:scale-105 ${
                      status === 'locked' ? 'opacity-60 grayscale' : ''
                    }`}>
                      <div className="text-warm-brown font-bold text-center text-sm">
                        {concept.name}
                      </div>
                      {status === 'locked' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-warm-brown/80 rounded-2xl">
                          <Lock className="w-6 h-6 text-cream" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Central Road Node */}
                  <div className="order-2 relative z-20">
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
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action - Game Style */}
        <div className="text-center mb-16 mt-16">
          <div className="bg-gradient-to-r from-burnt-orange to-terracotta backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-golden-yellow max-w-2xl mx-auto">
            <h3 className="text-3xl font-display text-cream mb-4 drop-shadow-lg">
              {t('roadmap.readyToStart')}
            </h3>
            <p className="text-cream mb-6 text-lg">
              {t('roadmap.startPracticeDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/rhythmlab" 
                className="game-button bg-gradient-to-r from-sage-green to-deep-teal text-cream px-8 py-4 rounded-xl font-bold text-lg shadow-xl border-2 border-cream hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                {t('roadmap.startPractice')}
              </Link>
              <Link 
                to="/rhythmlab/quiz" 
                className="game-button bg-gradient-to-r from-golden-yellow to-dusty-rose text-warm-brown px-8 py-4 rounded-xl font-bold text-lg shadow-xl border-2 border-cream hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                {t('roadmap.takeQuiz')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
