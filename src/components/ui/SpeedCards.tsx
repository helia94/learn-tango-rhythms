
import React from 'react';

interface SpeedCard {
  number: string;
  label: string;
  bgColor: string;
  borderColor: string;
}

interface SpeedCardsProps {
  cards: SpeedCard[];
}

const SpeedCards: React.FC<SpeedCardsProps> = ({ cards }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {cards.map((card, index) => (
        <div 
          key={index}
          className={`${card.bgColor} backdrop-blur-sm rounded-2xl p-6 text-center border ${card.borderColor}`}
        >
          <div className="text-4xl font-bold text-gray-700 mb-3">{card.number}</div>
          <div className="text-gray-700 text-lg">{card.label}</div>
        </div>
      ))}
    </div>
  );
};

export default SpeedCards;
