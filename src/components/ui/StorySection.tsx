
import React from 'react';
import { getThemeClasses, themePresets, type ThemeVariant } from '@/utils/themeSystem';

interface StorySectionProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'intro' | 'highlight' | 'assignment' | 'practice' | 'note';
  size?: 'default' | 'large' | 'small';
  theme?: ThemeVariant;
}

const StorySection: React.FC<StorySectionProps> = ({ 
  title, 
  className = "", 
  children, 
  variant = 'default',
  size = 'default',
  theme
}) => {
  // Base spacing classes
  const baseSpacing = {
    default: "mb-16",
    large: "mb-20",
    small: "mb-12"
  };

  // Get theme colors based on variant or explicit theme
  const getVariantTheme = (): ThemeVariant | null => {
    if (theme) return theme;
    
    switch (variant) {
      case 'highlight': return themePresets.highlight;
      case 'assignment': return themePresets.assignment;
      case 'practice': return themePresets.practice;
      case 'note': return themePresets.note;
      default: return null;
    }
  };

  const variantTheme = getVariantTheme();
  const themeColors = variantTheme ? getThemeClasses(variantTheme) : null;

  // Variant-specific styling
  const variantStyles = {
    default: "",
    intro: "",
    highlight: themeColors ? `${themeColors.background} backdrop-blur-sm rounded-2xl p-8 border ${themeColors.border}` : "bg-dusty-rose/20 backdrop-blur-sm rounded-2xl p-8 border border-dusty-rose/30",
    assignment: themeColors ? `${themeColors.background} backdrop-blur-sm rounded-2xl p-8 border ${themeColors.border}` : "bg-sage-green/10 backdrop-blur-sm rounded-2xl p-8 border border-sage-green/20",
    practice: themeColors ? `${themeColors.background} backdrop-blur-sm rounded-2xl p-8 border ${themeColors.border}` : "bg-golden-yellow/10 backdrop-blur-sm rounded-2xl p-8 border border-golden-yellow/20",
    note: themeColors ? `${themeColors.background} backdrop-blur-sm rounded-2xl p-8 border ${themeColors.border}` : "bg-warm-brown/10 backdrop-blur-sm rounded-2xl p-8 border border-warm-brown/20"
  };

  // Title styling based on variant
  const titleStyles = {
    default: "text-3xl font-display text-gray-800 mb-8 text-center",
    intro: "text-4xl font-display text-gray-800 mb-8 text-center",
    highlight: "text-2xl font-display text-gray-800 mb-6 text-center",
    assignment: "text-2xl font-display text-gray-800 mb-6 text-center",
    practice: "text-2xl font-display text-gray-800 mb-6 text-center",
    note: "text-xl font-display text-gray-800 mb-4 text-center"
  };

  const combinedClassName = `${baseSpacing[size]} ${variantStyles[variant]} ${className}`.trim();

  return (
    <div className={combinedClassName}>
      {title && (
        <h2 className={titleStyles[variant]}>{title}</h2>
      )}
      <div>
        {children}
      </div>
    </div>
  );
};

export default StorySection;
