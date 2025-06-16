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
  return;
};
export default SlowWalkingAvatar;