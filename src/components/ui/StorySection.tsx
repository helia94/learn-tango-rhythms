
import React from 'react';

interface StorySectionProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

const StorySection: React.FC<StorySectionProps> = ({ title, className = "mb-16", children }) => {
  return (
    <div className={className}>
      {title && (
        <h2 className="text-3xl font-display text-gray-800 mb-8 text-center">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default StorySection;
