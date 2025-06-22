
import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Circle, Calendar } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationKey } from '@/data/translations/index';
import { useAuth } from '@/contexts/AuthContext';
import { useNextTopicAvailability } from '@/hooks/useNextTopicAvailability';
import { generateWindingPath } from './utils/pathUtils';

interface ConceptStatus {
  unlocked: boolean;
  completed: boolean;
  visible: boolean;
  active: boolean;
}

interface ConceptNodeProps {
  concept: {
    key: string;
    translationKey: TranslationKey;
    topicIndex?: number;
    link?: string;
  };
  index: number;
  totalConcepts: number;
  conceptStatus: ConceptStatus;
}

const ConceptNode: React.FC<ConceptNodeProps> = ({ 
  concept, 
  index, 
  totalConcepts, 
  conceptStatus 
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { getNextTopicAvailability } = useNextTopicAvailability();
  
  const position = generateWindingPath(index, totalConcepts);
  const isLeft = position.x < 50;
  const canRoute = conceptStatus.visible && concept.link;

  // Get availability date for this topic
  const availabilityDate = user && concept.topicIndex ? getNextTopicAvailability(concept.topicIndex) : null;

  const getNodeIcon = (unlocked: boolean, active: boolean, visible: boolean) => {
    if (!visible) {
      return <Lock className="w-6 h-6 text-warm-brown opacity-50" />;
    }
    
    if (active) {
      return <Circle className="w-6 h-6 text-sage-green animate-gentle-bounce" />;
    }
    
    if (unlocked) {
      return <Circle className="w-6 h-6 text-golden-yellow" />;
    }
    
    return <Lock className="w-6 h-6 text-warm-brown opacity-50" />;
  };

  const getNodeBackground = (unlocked: boolean, active: boolean, visible: boolean) => {
    if (!visible) {
      return 'bg-warm-brown border-cream opacity-60';
    }
    
    if (active) {
      return 'bg-sage-green border-cream animate-gentle-bounce';
    }
    
    if (unlocked) {
      return 'bg-golden-yellow border-cream hover:scale-110 cursor-pointer';
    }
    
    return 'bg-warm-brown border-cream opacity-60';
  };

  const formatAvailabilityDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const ConceptCard = ({ children }: { children: React.ReactNode }) => {
    if (canRoute) {
      return (
        <Link to={concept.link!} className="block">
          {children}
        </Link>
      );
    }
    return <>{children}</>;
  };

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
    >
      {/* Road Node */}
      <div className="relative flex items-center">
        {/* Concept Card */}
        <div className={`${isLeft ? 'order-1 mr-2 sm:mr-8' : 'order-3 ml-2 sm:ml-8'} transform ${isLeft ? 'rotate-2' : '-rotate-2'}`}>
          <ConceptCard>
            <div className={`game-card bg-gradient-to-br from-cream to-sandy-beige border-4 border-warm-brown shadow-xl rounded-2xl p-3 sm:p-4 min-w-[180px] sm:min-w-[240px] max-w-[200px] sm:max-w-none transition-all duration-300 hover:scale-105 ${!conceptStatus.visible ? 'opacity-60 grayscale' : canRoute ? 'cursor-pointer hover:shadow-2xl' : ''}`}>
              <div className="text-warm-brown font-bold text-center text-xs sm:text-sm mb-2 leading-tight sm:leading-normal whitespace-normal break-words">
                {t(concept.translationKey)}
              </div>
              
              {/* Availability date info */}
              {availabilityDate && !conceptStatus.visible && (
                <div className="flex items-center justify-center gap-1 text-xs text-warm-brown/70 flex-wrap">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  <span className="text-center">Available on {formatAvailabilityDate(availabilityDate)}</span>
                </div>
              )}
              
              {!conceptStatus.visible && !availabilityDate && (
                <div className="absolute inset-0 flex items-center justify-center bg-warm-brown/80 rounded-2xl">
                  <Lock className="w-6 h-6 text-cream" />
                </div>
              )}
            </div>
          </ConceptCard>
        </div>

        {/* Central Road Node */}
        <div className="order-2 relative z-20">
          <ConceptCard>
            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-2xl transition-all duration-300 ${getNodeBackground(conceptStatus.unlocked, conceptStatus.active, conceptStatus.visible)}`}>
              {getNodeIcon(conceptStatus.unlocked, conceptStatus.active, conceptStatus.visible)}
            </div>
          </ConceptCard>
          
          {/* Node Number */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-warm-brown text-cream px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {index + 1}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptNode;
