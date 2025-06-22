
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
      <div className="relative z-10 p-4 flex justify-between items-center">
        <Link to="/" className="inline-flex items-center gap-2 text-cream bg-warm-brown/80 px-4 py-2 rounded-full hover:bg-warm-brown transition-all duration-300 shadow-lg backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4" />
          {t('common.backToHome')}
        </Link>
        
        <LanguageSelector />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Map className="w-16 h-16 text-golden-yellow drop-shadow-lg" />
          <h1 className="text-6xl md:text-8xl font-display text-cream drop-shadow-2xl tracking-wider">
            {t('roadmap.title')}
          </h1>
        </div>
      </div>
    </>
  );
};

export default RoadMapHeader;
