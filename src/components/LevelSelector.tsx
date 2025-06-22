
import React from 'react';
import { Star } from 'lucide-react';

interface LevelSelectorProps {
  level: number;
  onLevelChange: (level: number) => void;
  disabled?: boolean;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ 
  level, 
  onLevelChange, 
  disabled = false 
}) => {
  const handleClick = (newLevel: number) => {
    if (disabled) return;
    onLevelChange(newLevel);
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4].map((starLevel) => (
        <button
          key={starLevel}
          onClick={() => handleClick(starLevel)}
          disabled={disabled}
          className={`transition-all duration-200 ${
            disabled 
              ? 'cursor-not-allowed opacity-50' 
              : 'hover:scale-110 cursor-pointer'
          }`}
          type="button"
        >
          <Star
            className={`w-6 h-6 ${
              starLevel <= level
                ? 'fill-golden-yellow text-golden-yellow'
                : disabled
                ? 'text-gray-300'
                : 'text-gray-400 hover:text-golden-yellow'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default LevelSelector;
