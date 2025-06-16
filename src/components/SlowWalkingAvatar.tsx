
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const SlowWalkingAvatar = () => {
  const [position, setPosition] = useState(0);
  const [isWalking, setIsWalking] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isWalking) {
      interval = setInterval(() => {
        setPosition(prev => {
          // Move very slowly - 0.5% per second for ultra slow movement
          const newPos = prev + 0.5;
          // Reset when reaching the end
          if (newPos >= 100) {
            return 0;
          }
          return newPos;
        });
      }, 1000); // Update every second for extremely slow movement
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWalking]);

  const toggleWalking = () => {
    setIsWalking(!isWalking);
  };

  const resetPosition = () => {
    setPosition(0);
    setIsWalking(false);
  };

  return (
    <div className="bg-gradient-to-r from-sage-green/20 to-dusty-rose/20 backdrop-blur-sm rounded-2xl p-6 border border-sage-green/30">
      <div className="text-center mb-4">
        <h4 className="text-lg font-display text-gray-700 mb-2">Extremely Slow Walking Demo</h4>
        <p className="text-gray-600 text-sm">Watch the avatar take 8+ seconds for each step</p>
      </div>
      
      {/* Walking track */}
      <div className="relative w-full h-16 bg-warm-brown/20 rounded-lg mb-4 overflow-hidden">
        {/* Walking path line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2" />
        
        {/* Step markers */}
        {[0, 25, 50, 75, 100].map((pos) => (
          <div 
            key={pos}
            className="absolute top-1/2 w-1 h-6 bg-gray-400 transform -translate-y-1/2"
            style={{ left: `${pos}%` }}
          />
        ))}
        
        {/* Walking avatar */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-[8000ms] ease-in-out"
          style={{ 
            left: `${position}%`,
            transform: `translateY(-50%) translateX(-50%)`,
          }}
        >
          <Avatar className="w-12 h-12 border-2 border-golden-yellow">
            <AvatarImage src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback className="bg-golden-yellow text-warm-brown font-bold text-lg">
              🚶
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button
          onClick={toggleWalking}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isWalking 
              ? 'bg-dusty-rose text-cream hover:bg-dusty-rose/80' 
              : 'bg-sage-green text-cream hover:bg-sage-green/80'
          }`}
        >
          {isWalking ? 'Pause' : 'Start Walking'}
        </button>
        
        <button
          onClick={resetPosition}
          className="px-4 py-2 bg-warm-brown/40 text-gray-700 rounded-lg font-medium hover:bg-warm-brown/60 transition-all duration-200"
        >
          Reset
        </button>
      </div>
      
      <div className="mt-3 text-center">
        <div className="text-xs text-gray-500">
          Position: {Math.round(position)}% • Speed: Ultra Slow (8+ beats per step)
        </div>
      </div>
    </div>
  );
};

export default SlowWalkingAvatar;
