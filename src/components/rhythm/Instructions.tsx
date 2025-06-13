
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const Instructions = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-12 text-center max-w-4xl mx-auto">
      <div className="boho-panel p-6">
        <p className="boho-subtitle text-sm leading-relaxed whitespace-pre-line">
          {t('rhythm.instructions')}
        </p>
      </div>
    </div>
  );
};

export default Instructions;
