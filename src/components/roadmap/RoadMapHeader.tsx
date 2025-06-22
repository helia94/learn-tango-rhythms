
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Map } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from '@/components/LanguageSelector';

const RoadMapHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Navigation */}
      <div className="relative z-10 p-2 sm:p-4 flex justify-between items-center">
        <Link to="/" className="inline-flex items-center gap-1 sm:gap-2 text-cream bg-warm-brown/80 px-2 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-warm-brown transition-all duration-300 shadow-lg backdrop-blur-sm text-sm sm:text-base">
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">{t('common.backToHome')}</span>
          <span className="xs:hidden">Back</span>
        </Link>
        
        <LanguageSelector />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-4 sm:mb-8 px-2">
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Map className="w-8 h-8 sm:w-16 sm:h-16 text-golden-yellow drop-shadow-lg" />
          <h1 className="text-3xl sm:text-6xl md:text-8xl font-display text-cream drop-shadow-2xl tracking-wider">
            {t('roadmap.title')}
          </h1>
        </div>
      </div>
    </>
  );
};

export default RoadMapHeader;
