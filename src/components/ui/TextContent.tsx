
import React from 'react';
import { cn } from '@/lib/utils';

export type TextVariant = 'body' | 'lead' | 'subtitle';

interface TextContentProps {
  children: string;
  variant?: TextVariant;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const TextContent: React.FC<TextContentProps> = ({
  children,
  variant = 'body',
  align = 'left',
  className = ""
}) => {
  const variantStyles = {
    body: "text-gray-600 text-lg leading-relaxed",
    lead: "text-gray-700 text-xl leading-relaxed",
    subtitle: "text-gray-600 text-base leading-relaxed"
  };

  const alignStyles = {
    left: "text-left",
    center: "text-center", 
    right: "text-right"
  };

  // Helper function to render text with line breaks
  const renderTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className={cn(
      variantStyles[variant],
      alignStyles[align],
      className
    )}>
      {renderTextWithLineBreaks(children)}
    </div>
  );
};

export default TextContent;
