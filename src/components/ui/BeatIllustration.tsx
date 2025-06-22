
import React from 'react';

interface BeatIllustrationProps {
  className?: string;
}

const BeatIllustration: React.FC<BeatIllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Beat 1 - Strong (dark) */}
      <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center">
        <span className="text-xs text-white font-semibold">1</span>
      </div>
      
      {/* Beat 2 - Weak (light) */}
      <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-xs text-gray-700 font-semibold">2</span>
      </div>
      
      {/* Beat 3 - Strong (dark) */}
      <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center">
        <span className="text-xs text-white font-semibold">3</span>
      </div>
      
      {/* Beat 4 - Weak (light) */}
      <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-xs text-gray-700 font-semibold">4</span>
      </div>
    </div>
  );
};

export default BeatIllustration;
