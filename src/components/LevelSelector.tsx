
import React from 'react';

interface LevelSelectorProps {
  level: number;
  onLevelChange: (level: number) => void;
  className?: string;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({
  level,
  onLevelChange,
  className = ''
}) => {
  const handleCircleClick = (clickedLevel: number) => {
    // If clicking the same level, reset to 0, otherwise set to clicked level
    onLevelChange(clickedLevel === level ? 0 : clickedLevel);
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      {[1, 2, 3, 4].map((circleLevel) => (
        <button
          key={circleLevel}
          type="button"
          onClick={() => handleCircleClick(circleLevel)}
          className={`w-4 h-4 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
            circleLevel <= level
              ? 'bg-golden-yellow border-golden-yellow'
              : 'bg-transparent border-gray-300 hover:border-golden-yellow/50'
          }`}
          aria-label={`Level ${circleLevel}`}
        />
      ))}
    </div>
  );
};

export default LevelSelector;
