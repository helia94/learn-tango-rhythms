
import React from 'react';
import { SpeedLevel } from '@/types/rhythm';
import { useTranslation } from '@/hooks/useTranslation';

interface SpeedControlProps {
  speedLevels: SpeedLevel[];
  currentSpeedLevel: number;
  onSpeedChange: (level: number) => void;
}

const SpeedControl = ({ speedLevels, currentSpeedLevel, onSpeedChange }: SpeedControlProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="track-label text-sm">{t('common.speed')}</div>
      <div className="flex gap-2">
        {speedLevels.map((speed, index) => (
          <button
            key={index}
            onClick={() => onSpeedChange(index)}
            className={`preset-button text-sm ${
              currentSpeedLevel === index ? 'bg-gradient-to-r from-sage-green to-deep-teal text-cream' : ''
            }`}
          >
            {speed.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpeedControl;
