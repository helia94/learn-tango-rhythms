
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
    <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-6 border border-warm-brown/30">
      <div className="text-center mb-4">
        <h4 className="text-lg font-display text-gray-700 mb-2">Ultra Slow Movement Practice</h4>
        <p className="text-gray-600 text-sm">Watch the avatar demonstrate extremely slow walking</p>
      </div>
      
      <div className="relative w-full h-20 bg-gray-100 rounded-lg mb-4 overflow-hidden">
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-linear"
          style={{ left: `${position}%` }}
        >
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-dusty-rose text-cream text-xs font-bold">
              👤
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div className="flex gap-2 justify-center">
        <button 
          onClick={toggleWalking}
          className="px-4 py-2 bg-sage-green text-cream rounded-lg hover:bg-sage-green/80 transition-colors text-sm"
        >
          {isWalking ? 'Pause' : 'Start'} Walking
        </button>
        <button 
          onClick={resetPosition}
          className="px-4 py-2 bg-gray-500 text-cream rounded-lg hover:bg-gray-600 transition-colors text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SlowWalkingAvatar;
