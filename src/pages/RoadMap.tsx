
import React, { useEffect } from 'react';
import { useTopicVisibility } from '@/contexts/TopicVisibilityContext';
import RoadMapBackground from '@/components/roadmap/RoadMapBackground';
import RoadMapHeader from '@/components/roadmap/RoadMapHeader';
import RoadMapContainer from '@/components/roadmap/RoadMapContainer';
import { allConcepts } from '@/components/roadmap/conceptsData';
import { ScrollArea } from '@/components/ui/scroll-area';

const RoadMap = () => {
  const { isLoading, visibleTopics } = useTopicVisibility();

  // Log the visibility context when it changes
  useEffect(() => {
    console.log('RoadMap: TopicVisibility context updated:', {
      isLoading,
      visibleTopicsCount: visibleTopics.length,
      visibleTopics: visibleTopics.map(t => ({
        topicIndex: t.topicIndex,
        topicKey: t.topicKey,
        isVisible: t.isVisible,
        isUnlocked: t.isUnlocked,
        isActive: t.isActive
      }))
    });
  }, [isLoading, visibleTopics]);

  console.log('RoadMap: Rendering with isLoading:', isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige flex items-center justify-center">
        <div className="text-cream text-2xl">Loading...</div>
      </div>
    );
  }
  
  return (
    <ScrollArea className="min-h-screen w-full">
      <div className="min-h-screen min-w-[800px] bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige relative overflow-hidden">
        {/* Animated background elements */}
        <RoadMapBackground />

        <RoadMapHeader />

        {/* Winding Road Container */}
        <RoadMapContainer concepts={allConcepts} />
      </div>
    </ScrollArea>
  );
};

export default RoadMap;
