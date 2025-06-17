
import React from 'react';
import { getThemeClasses, type ThemeVariant } from '@/utils/themeSystem';

interface SpeedCard {
  number: string;
  label: string;
  theme: ThemeVariant;
}

interface SpeedCardsProps {
  cards: SpeedCard[];
}

const SpeedCards: React.FC<SpeedCardsProps> = ({ cards }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {cards.map((card, index) => {
        const themeColors = getThemeClasses(card.theme);
        
        return (
          <div 
            key={index}
            className={`${themeColors.background} backdrop-blur-sm rounded-2xl p-6 text-center border ${themeColors.border}`}
          >
            <div className="text-4xl font-bold text-gray-700 mb-3">{card.number}</div>
            <div className="text-gray-700 text-lg">{card.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SpeedCards;
