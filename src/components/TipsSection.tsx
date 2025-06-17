
import React from 'react';
import TipsInfoBox from '@/components/ui/TipsInfoBox';

interface TipsSectionProps {
  title: string;
  tips: string[];
}

const TipsSection: React.FC<TipsSectionProps> = ({ title, tips }) => {
  return (
    <TipsInfoBox 
      title={title}
      tips={tips}
      variant="tips"
    />
  );
};

export default TipsSection;
