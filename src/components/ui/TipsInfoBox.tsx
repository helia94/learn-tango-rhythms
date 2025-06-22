
import React from 'react';
import { getThemeClasses, themePresets, type ThemeVariant } from '@/utils/themeSystem';
import { renderTextWithLineBreaks } from '@/utils/textUtils';

interface TipsInfoBoxProps {
  title: string;
  tips: string[];
  theme?: ThemeVariant;
  variant?: 'tips' | 'instructions' | 'notes' | 'warnings';
  className?: string;
}

const TipsInfoBox: React.FC<TipsInfoBoxProps> = ({
  title,
  tips,
  theme,
  variant = 'tips',
  className = ""
}) => {
  // Get theme based on variant if not explicitly provided
  const getVariantTheme = (): ThemeVariant => {
    if (theme) return theme;
    
    switch (variant) {
      case 'tips': return themePresets.info;
      case 'instructions': return themePresets.assignment;
      case 'notes': return themePresets.note;
      case 'warnings': return themePresets.warning;
      default: return themePresets.info;
    }
  };

  const themeColors = getThemeClasses(getVariantTheme());

  return (
    <div className={`${themeColors.background} backdrop-blur-sm rounded-2xl p-6 border ${themeColors.border} ${className}`}>
      <h4 className="text-lg font-display text-gray-700 mb-4">{title}</h4>
      <ul className="text-gray-600 space-y-2 text-base">
        {tips.map((tip, index) => (
          <li key={index}>• {renderTextWithLineBreaks(tip)}</li>
        ))}
      </ul>
    </div>
  );
};

export default TipsInfoBox;
