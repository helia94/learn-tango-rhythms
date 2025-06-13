
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from '@/components/LanguageSelector';

const RhythmHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-12 text-center">
      {/* Language Selector in top right */}
      <div className="flex justify-end mb-4">
        <LanguageSelector />
      </div>
      
      <h1 className="boho-title text-6xl md:text-8xl mb-6 font-display">{t('rhythm.title')}</h1>
      <div className="boho-panel p-6 max-w-4xl mx-auto">
        <p className="boho-subtitle text-sm leading-relaxed">{t('rhythm.subtitle')}</p>
      </div>
    </div>
  );
};

export default RhythmHeader;
