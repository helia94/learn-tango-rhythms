
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StorySectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'floating' | 'flowing' | 'mystical' | 'warm';
  delay?: number;
}

export const StorySection: React.FC<StorySectionProps> = ({
  children,
  className = '',
  variant = 'floating',
  delay = 0
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'floating':
        return `
          bg-gradient-to-br from-cream/90 via-sandy-beige/80 to-dusty-rose/70
          border-0 shadow-2xl backdrop-blur-sm
          hover:shadow-3xl hover:-translate-y-2
          before:absolute before:inset-0 before:bg-gradient-to-r 
          before:from-golden-yellow/10 before:to-terracotta/10 
          before:rounded-3xl before:-z-10
          transform rotate-1 hover:rotate-0
        `;
      case 'flowing':
        return `
          bg-gradient-to-tr from-sage-green/20 via-cream/90 to-mushroom/60
          border-2 border-sage-green/30 shadow-xl
          hover:shadow-2xl hover:scale-105
          before:absolute before:inset-0 before:bg-wave-pattern before:opacity-20
          transform -rotate-1 hover:rotate-0
        `;
      case 'mystical':
        return `
          bg-gradient-to-bl from-deep-teal/30 via-cream/85 to-dusty-rose/40
          border border-deep-teal/40 shadow-xl
          hover:shadow-mystical hover:scale-102
          before:absolute before:inset-0 before:bg-mystical-pattern before:opacity-15
          transform rotate-0.5 hover:-rotate-0.5
        `;
      case 'warm':
        return `
          bg-gradient-to-r from-terracotta/20 via-cream/90 to-golden-yellow/30
          border-2 border-terracotta/20 shadow-lg
          hover:shadow-xl hover:-translate-y-1
          before:absolute before:inset-0 before:bg-warm-texture before:opacity-10
          transform -rotate-0.5 hover:rotate-0
        `;
      default:
        return '';
    }
  };

  return (
    <div 
      className="relative animate-fade-in"
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      <Card className={`
        relative overflow-hidden transition-all duration-500 ease-out
        rounded-3xl p-8 mb-8
        ${getVariantStyles()}
        ${className}
      `}>
        <CardContent className="relative z-10 p-0">
          {children}
        </CardContent>
        
        {/* Floating elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-golden-yellow/20 rounded-full animate-pulse" 
             style={{ animationDelay: `${delay + 1000}ms` }} />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-terracotta/15 rounded-full animate-pulse"
             style={{ animationDelay: `${delay + 1500}ms` }} />
      </Card>
    </div>
  );
};
