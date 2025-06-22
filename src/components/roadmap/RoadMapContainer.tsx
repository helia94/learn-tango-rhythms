
import React from 'react';
import { TranslationKey } from '@/data/translations/index';
import { useTopicVisibility } from '@/contexts/TopicVisibilityContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import RoadMapPath from './RoadMapPath';
import ConceptNode from './ConceptNode';

interface Concept {
  key: string;
  translationKey: TranslationKey;
  topicIndex?: number;
  link?: string;
}

interface RoadMapContainerProps {
  concepts: Concept[];
}

const RoadMapContainer: React.FC<RoadMapContainerProps> = ({ concepts }) => {
  const { getTopicVisibility } = useTopicVisibility();

  const getConceptStatus = (concept: Concept) => {
    // For concepts without topicIndex, use fallback logic
    if (concept.topicIndex === undefined) {
      return {
        unlocked: false,
        completed: false,
        visible: false,
        active: false
      };
    }

    const topicVisibility = getTopicVisibility(concept.topicIndex);
    
    if (!topicVisibility) {
      return {
        unlocked: false,
        completed: false,
        visible: false,
        active: false
      };
    }

    return {
      unlocked: topicVisibility.isUnlocked,
      completed: false, // We don't track completion status yet
      visible: topicVisibility.isVisible,
      active: topicVisibility.isActive
    };
  };

  return (
    <div className="relative z-10 w-full">
      <ScrollArea className="w-full">
        <div className="max-w-6xl mx-auto px-4 min-w-[800px]">
          <div className="relative min-h-[3000px]">
            {/* Winding Road Background - SVG Path */}
            <RoadMapPath conceptsCount={concepts.length} />

            {/* Concept Nodes along the winding path */}
            {concepts.map((concept, index) => {
              const conceptStatus = getConceptStatus(concept);

              return (
                <ConceptNode
                  key={concept.key}
                  concept={concept}
                  index={index}
                  totalConcepts={concepts.length}
                  conceptStatus={conceptStatus}
                />
              );
            })}
          </div>

          {/* Call to Action - Game Style */}
          <div className="text-center mb-16 mt-16">
            
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RoadMapContainer;
