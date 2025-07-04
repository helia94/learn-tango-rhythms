
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from '@/components/LanguageSelector';
import ProblemButton from '@/components/ui/ProblemButton';

interface PageHeaderProps {
  title: string;
  backRoute?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, backRoute = "/roadmap" }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Navigation */}
      <div className="relative z-10 p-4">
        {/* Main navigation row */}
        <div className="flex justify-between items-center mb-4 md:mb-0">
          <Link to={backRoute} className="inline-flex items-center gap-2 text-cream bg-warm-brown/80 px-4 py-2 rounded-full hover:bg-warm-brown transition-all duration-300 shadow-lg backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4" />
            {t('common.backToRoadmap')}
          </Link>
          
          {/* Desktop: Show both buttons on the right */}
          <div className="hidden md:flex items-center gap-4">
            <ProblemButton />
            <LanguageSelector />
          </div>
          
          {/* Mobile: Only show language selector */}
          <div className="md:hidden">
            <LanguageSelector />
          </div>
        </div>
        
        {/* Mobile: Problem button on separate row */}
        <div className="md:hidden flex justify-center">
          <ProblemButton />
        </div>
      </div>

      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-display text-gray-700 drop-shadow-2xl tracking-wider mb-4">
          {title}
        </h1>
      </div>
    </>
  );
};

export default PageHeader;
