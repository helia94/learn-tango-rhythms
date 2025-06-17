
import React from 'react';
import { CheckCircle, Clock, Target } from 'lucide-react';
import { getThemeClasses, themePresets, type ThemeVariant } from '@/utils/themeSystem';

interface ProgressItem {
  label: string;
  value: string | number;
  type: 'stat' | 'milestone' | 'time';
  completed?: boolean;
  theme?: ThemeVariant;
}

interface ProgressSectionProps {
  title: string;
  subtitle?: string;
  items: ProgressItem[];
  layout?: 'grid' | 'list';
  className?: string;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({
  title,
  subtitle,
  items,
  layout = 'grid',
  className = ""
}) => {
  const getIcon = (type: string, completed?: boolean) => {
    switch (type) {
      case 'milestone':
        return completed ? (
          <CheckCircle className="w-6 h-6 text-sage-green" />
        ) : (
          <Target className="w-6 h-6 text-gray-400" />
        );
      case 'time':
        return <Clock className="w-6 h-6 text-golden-yellow" />;
      default:
        return null;
    }
  };

  const layoutClasses = layout === 'grid' 
    ? `grid gap-6 ${items.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`
    : 'space-y-4';

  return (
    <div className={className}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display text-gray-800 mb-2">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 leading-relaxed">{subtitle}</p>
        )}
      </div>

      <div className={layoutClasses}>
        {items.map((item, index) => {
          const theme = item.theme || themePresets.info;
          const themeColors = getThemeClasses(theme);
          
          return (
            <div 
              key={index}
              className={`${themeColors.background} backdrop-blur-sm rounded-2xl p-6 border ${themeColors.border} ${layout === 'list' ? 'flex items-center space-x-4' : 'text-center'}`}
            >
              {layout === 'list' && getIcon(item.type, item.completed)}
              
              <div className={layout === 'list' ? 'flex-1' : ''}>
                {layout === 'grid' && (
                  <div className="mb-3">
                    {getIcon(item.type, item.completed)}
                  </div>
                )}
                
                <div className={`text-3xl font-bold text-gray-700 mb-2 ${layout === 'list' ? 'text-xl' : ''}`}>
                  {item.value}
                </div>
                
                <div className={`text-gray-600 ${layout === 'list' ? 'text-base' : 'text-lg'}`}>
                  {item.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSection;
