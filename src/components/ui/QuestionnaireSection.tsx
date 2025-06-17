
import React from 'react';
import { getThemeClasses, themePresets, type ThemeVariant } from '@/utils/themeSystem';

interface QuestionnaireItem {
  id: string;
  question: string;
  placeholder: string;
  type?: 'text' | 'textarea' | 'rating' | 'select';
  options?: string[];
}

interface QuestionnaireSectionProps {
  title: string;
  subtitle?: string;
  items: QuestionnaireItem[];
  theme?: ThemeVariant;
  onSubmit?: (data: Record<string, any>) => void;
  className?: string;
}

const QuestionnaireSection: React.FC<QuestionnaireSectionProps> = ({
  title,
  subtitle,
  items,
  theme = themePresets.note,
  onSubmit,
  className = ""
}) => {
  const themeColors = getThemeClasses(theme);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    if (onSubmit) {
      onSubmit({});
    }
  };

  return (
    <div className={className}>
      <h2 className="text-2xl font-display text-gray-800 mb-6 text-center">
        {title}
      </h2>
      
      {subtitle && (
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          {subtitle}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className={`${themeColors.background} backdrop-blur-sm rounded-2xl p-6 border ${themeColors.border}`}>
            <label className="block text-gray-700 font-medium mb-3">
              {item.question}
            </label>
            
            {item.type === 'textarea' ? (
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-golden-yellow/50"
                rows={4}
                placeholder={item.placeholder}
              />
            ) : item.type === 'select' && item.options ? (
              <select className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow/50">
                <option value="">{item.placeholder}</option>
                {item.options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            ) : item.type === 'rating' ? (
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-golden-yellow hover:bg-golden-yellow/20 transition-colors"
                  >
                    {rating}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="text"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-yellow/50"
                placeholder={item.placeholder}
              />
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default QuestionnaireSection;
