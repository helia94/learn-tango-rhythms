
import React from 'react';
import { getThemeClasses, type ThemeVariant } from '@/utils/themeSystem';

interface InfoBox {
  title: string;
  subtitle?: string;
  description: string;
  theme: ThemeVariant;
}

interface InfoBoxSectionProps {
  title?: string;
  infoBoxes: InfoBox[];
  columns?: 1 | 2 | 3 | 'auto';
  className?: string;
}

const InfoBoxSection: React.FC<InfoBoxSectionProps> = ({
  title,
  infoBoxes,
  columns = 'auto',
  className = ""
}) => {
  // Determine grid columns based on number of boxes or explicit setting
  const getGridColumns = () => {
    if (columns !== 'auto') return `grid-cols-${columns}`;
    
    switch (infoBoxes.length) {
      case 1: return 'grid-cols-1';
      case 2: return 'md:grid-cols-2';
      case 3: return 'md:grid-cols-3';
      default: return 'md:grid-cols-3';
    }
  };

  return (
    <div className={className}>
      {title && (
        <h3 className="text-2xl font-display text-gray-700 mb-6 text-center">
          {title}
        </h3>
      )}
      
      <div className={`grid gap-6 ${getGridColumns()}`}>
        {infoBoxes.map((box, index) => {
          const themeColors = getThemeClasses(box.theme);
          
          return (
            <div 
              key={index}
              className={`${themeColors.background} backdrop-blur-sm rounded-2xl p-6 border ${themeColors.border}`}
            >
              <h4 className="text-xl font-display text-gray-700 mb-4 text-center">
                {box.title}
              </h4>
              <p className="text-gray-600 text-center leading-relaxed">
                {box.subtitle && (
                  <><strong>{box.subtitle}</strong> - </>
                )}
                {box.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfoBoxSection;
