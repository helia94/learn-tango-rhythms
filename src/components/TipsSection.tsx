
import React from 'react';

interface TipsSectionProps {
  title: string;
  tips: string[];
}

const TipsSection: React.FC<TipsSectionProps> = ({ title, tips }) => {
  return (
    <div className="bg-sage-green/20 backdrop-blur-sm rounded-2xl p-6 border border-sage-green/30">
      <h4 className="text-lg font-display text-gray-700 mb-4">{title}</h4>
      <ul className="text-gray-600 space-y-2 text-base">
        {tips.map((tip, index) => (
          <li key={index}>• {tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default TipsSection;
