
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const FastWalkingAvatar = () => {
  const [position, setPosition] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [speed, setSpeed] = useState(5); // Default speed

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWalking) {
      interval = setInterval(() => {
        setPosition(prev => {
          // Move fast based on speed setting
          const newPos = prev + speed;
          // Reset when reaching the end
          if (newPos >= 100) {
            return 0;
          }
          return newPos;
        });
      }, 100); // Update every 100ms for fast movement
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWalking, speed]);

  const toggleWalking = () => {
    setIsWalking(!isWalking);
  };

  const resetPosition = () => {
    setPosition(0);
    setIsWalking(false);
  };

  const adjustSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  return (
    <div className="bg-terracotta/20 backdrop-blur-sm rounded-2xl p-6 border border-terracotta/30">
      <div className="text-center mb-4">
        <h4 className="text-lg font-display text-gray-700 mb-2">Extremely Fast Movement Practice</h4>
        <p className="text-gray-600 text-sm">Explore the limits of fast movement</p>
      </div>
      
      <div className="relative w-full h-20 bg-gray-100 rounded-lg mb-4 overflow-hidden">
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-75 ease-linear"
          style={{ left: `${position}%` }}
        >
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-terracotta text-cream text-xs font-bold">
              🏃
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="text-sm text-gray-600 block mb-2">Speed Level:</label>
        <div className="flex gap-2">
          {[3, 5, 8, 12].map((speedLevel) => (
            <button
              key={speedLevel}
              onClick={() => adjustSpeed(speedLevel)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                speed === speedLevel 
                  ? 'bg-terracotta text-cream' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {speedLevel}x
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2 justify-center">
        <button 
          onClick={toggleWalking}
          className="px-4 py-2 bg-terracotta text-cream rounded-lg hover:bg-terracotta/80 transition-colors text-sm"
        >
          {isWalking ? 'Stop' : 'Go Fast'}
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

export default FastWalkingAvatar;
