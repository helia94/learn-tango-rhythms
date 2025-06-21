
import React from 'react';

const RoadMapBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-golden-yellow animate-organic-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-dusty-rose animate-organic-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-40 h-40 rounded-full bg-terracotta animate-organic-pulse delay-2000"></div>
    </div>
  );
};

export default RoadMapBackground;
