
import React from 'react';
import { cn } from '@/lib/utils';
import { renderTextWithLineBreaks } from '@/utils/textUtils';

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
