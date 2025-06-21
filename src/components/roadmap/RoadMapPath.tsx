
import React from 'react';
import { generateWindingPath } from './utils/pathUtils';

interface RoadMapPathProps {
  conceptsCount: number;
}

const RoadMapPath: React.FC<RoadMapPathProps> = ({ conceptsCount }) => {
  const generatePathString = () => {
    const startPoint = generateWindingPath(0, conceptsCount);
    const pathPoints = Array.from({ length: conceptsCount }, (_, index) => {
      const point = generateWindingPath(index, conceptsCount);
      return index === 0 ? '' : `L ${point.x} ${point.y}`;
    }).join(' ');
    
    return `M ${startPoint.x} ${startPoint.y} ${pathPoints}`;
  };

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--warm-brown))" stopOpacity="0.8" />
          <stop offset="50%" stopColor="hsl(var(--caramel))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(var(--warm-brown))" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      
      {/* Generate smooth winding path */}
      <path 
        d={generatePathString()} 
        stroke="url(#roadGradient)" 
        strokeWidth="8" 
        fill="none" 
        className="drop-shadow-2xl" 
      />
      
      {/* Road center line */}
      <path 
        d={generatePathString()} 
        stroke="hsl(var(--cream))" 
        strokeWidth="1" 
        fill="none" 
        strokeDasharray="2 3" 
        className="opacity-60" 
      />
    </svg>
  );
};

export default RoadMapPath;
