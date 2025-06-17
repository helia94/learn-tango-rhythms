
// Centralized theme system for consistent color schemes across components

export type ThemeVariant = 
  | 'terracotta' 
  | 'sage' 
  | 'golden' 
  | 'dusty-rose' 
  | 'warm-brown' 
  | 'deep-teal' 
  | 'paprika'
  | 'caramel'
  | 'mushroom';

export interface ThemeColors {
  background: string;
  border: string;
  text: string;
  accent: string;
}

export const themeVariants: Record<ThemeVariant, ThemeColors> = {
  terracotta: {
    background: 'bg-terracotta/20',
    border: 'border-terracotta/30',
    text: 'text-gray-700',
    accent: 'text-terracotta'
  },
  sage: {
    background: 'bg-sage-green/20',
    border: 'border-sage-green/30',
    text: 'text-gray-700',
    accent: 'text-sage-green'
  },
  golden: {
    background: 'bg-golden-yellow/20',
    border: 'border-golden-yellow/30',
    text: 'text-gray-700',
    accent: 'text-golden-yellow'
  },
  'dusty-rose': {
    background: 'bg-dusty-rose/20',
    border: 'border-dusty-rose/30',
    text: 'text-gray-700',
    accent: 'text-dusty-rose'
  },
  'warm-brown': {
    background: 'bg-warm-brown/20',
    border: 'border-warm-brown/30',
    text: 'text-gray-600',
    accent: 'text-warm-brown'
  },
  'deep-teal': {
    background: 'bg-deep-teal/20',
    border: 'border-deep-teal/30',
    text: 'text-gray-700',
    accent: 'text-deep-teal'
  },
  paprika: {
    background: 'bg-paprika/20',
    border: 'border-paprika/30',
    text: 'text-gray-700',
    accent: 'text-paprika'
  },
  caramel: {
    background: 'bg-caramel/20',
    border: 'border-caramel/30',
    text: 'text-gray-700',
    accent: 'text-caramel'
  },
  mushroom: {
    background: 'bg-mushroom/20',
    border: 'border-mushroom/30',
    text: 'text-gray-700',
    accent: 'text-mushroom'
  }
};

export const getThemeClasses = (variant: ThemeVariant): ThemeColors => {
  return themeVariants[variant];
};

// Predefined theme combinations for common use cases
export const themePresets = {
  highlight: 'dusty-rose' as ThemeVariant,
  assignment: 'sage' as ThemeVariant,
  practice: 'golden' as ThemeVariant,
  note: 'warm-brown' as ThemeVariant,
  info: 'deep-teal' as ThemeVariant,
  warning: 'paprika' as ThemeVariant
};
