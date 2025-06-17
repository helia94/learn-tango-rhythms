
import React from 'react';

interface RatingSectionProps {
  title: string;
  placeholder: string;
  className?: string;
}

const RatingSection: React.FC<RatingSectionProps> = ({ 
  title, 
  placeholder, 
  className = "mb-8" 
}) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-display text-gray-800 mb-6 text-center">{title}</h2>
      <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-12 border border-cream/20">
        <p className="text-gray-500 text-center text-lg">
          {placeholder}
        </p>
      </div>
    </div>
  );
};

export default RatingSection;
