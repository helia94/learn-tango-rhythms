
import React from 'react';
import { SpeedLevel } from '@/types/rhythm';

interface SpeedControlProps {
  speedLevels: SpeedLevel[];
  currentSpeedLevel: number;
  onSpeedChange: (level: number) => void;
}

const SpeedControl = ({ speedLevels, currentSpeedLevel, onSpeedChange }: SpeedControlProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="berlin-track-label">SPEED</div>
      <div className="flex gap-2">
        {speedLevels.map((speed, index) => (
          <button
            key={index}
            onClick={() => onSpeedChange(index)}
            className={`preset-button ${currentSpeedLevel === index ? 'bg-berlin-lime' : ''}`}
          >
            {speed.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpeedControl;
