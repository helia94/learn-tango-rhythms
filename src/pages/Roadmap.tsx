
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
import { Music, Clock, Target, Award, BookOpen, Users } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

const Roadmap = () => {
  const { t } = useTranslation();

  const roadmapItems = [
    {
      id: 'rhythm-lab',
      title: t('roadmap.rhythmLab.title'),
      description: t('roadmap.rhythmLab.description'),
      icon: Music,
      status: 'available',
      route: '/rhythmlab'
    },
    {
      id: 'harmony-studio',
      title: t('roadmap.harmonyStudio.title'),
      description: t('roadmap.harmonyStudio.description'),
      icon: BookOpen,
      status: 'locked',
      route: null
    },
    {
      id: 'melody-composer',
      title: t('roadmap.melodyComposer.title'),
      description: t('roadmap.melodyComposer.description'),
      icon: Target,
      status: 'locked',
      route: null
    },
    {
      id: 'performance-hall',
      title: t('roadmap.performanceHall.title'),
      description: t('roadmap.performanceHall.description'),
      icon: Award,
      status: 'locked',
      route: null
    },
    {
      id: 'collaboration-space',
      title: t('roadmap.collaborationSpace.title'),
      description: t('roadmap.collaborationSpace.description'),
      icon: Users,
      status: 'locked',
      route: null
    },
    {
      id: 'master-class',
      title: t('roadmap.masterClass.title'),
      description: t('roadmap.masterClass.description'),
      icon: Clock,
      status: 'locked',
      route: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {t('roadmap.status.available')}
          </span>
        );
      case 'locked':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {t('roadmap.status.locked')}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>
          
          <h1 className="boho-title text-6xl md:text-8xl mb-6 font-display">
            {t('roadmap.title')}
          </h1>
          <div className="boho-panel p-6 max-w-4xl mx-auto">
            <p className="boho-subtitle text-lg leading-relaxed">
              {t('roadmap.subtitle')}
            </p>
          </div>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmapItems.map((item) => {
            const IconComponent = item.icon;
            const isAvailable = item.status === 'available';
            
            const cardContent = (
              <div className={`boho-panel p-6 h-full transition-all duration-300 ${
                isAvailable 
                  ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' 
                  : 'opacity-60 cursor-not-allowed'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    isAvailable 
                      ? 'bg-gradient-to-r from-sage-green to-deep-teal text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  {getStatusBadge(item.status)}
                </div>
                
                <h3 className="boho-subtitle text-xl font-semibold mb-3">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );

            return (
              <div key={item.id}>
                {isAvailable && item.route ? (
                  <Link to={item.route} className="block h-full">
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Overview */}
        <div className="mt-16">
          <div className="boho-panel p-8 text-center">
            <h2 className="boho-subtitle text-2xl font-semibold mb-4">
              {t('roadmap.progress.title')}
            </h2>
            <div className="flex justify-center items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>1 {t('roadmap.progress.available')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span>5 {t('roadmap.progress.locked')}</span>
              </div>
            </div>
            <div className="mt-4 text-muted-foreground">
              <p>{t('roadmap.progress.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
