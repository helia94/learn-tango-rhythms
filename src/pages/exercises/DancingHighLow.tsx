
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import TipsInfoBox from '@/components/ui/TipsInfoBox';
import SeeAllAssignmentsButton from '@/components/ui/SeeAllAssignmentsButton';
import TextContent from '@/components/ui/TextContent';
import TopicStartButton from '@/components/ui/TopicStartButton';
import DancingHighLowDaily1to7 from '@/components/DancingHighLowDaily1to7';
import { getWeeklyAssignments } from '@/data/assignments/dancing_high_low';

const DancingHighLow = () => {
  const { t } = useTranslation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});

  const handleTaskLevelChange = (taskId: string, level: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
    }));
  };

  const weeklyAssignments = getWeeklyAssignments();

  const tips = [
    t('exercises.dancingHighLow.tip1' as any),
    t('exercises.dancingHighLow.tip2' as any), 
    t('exercises.dancingHighLow.tip3' as any)
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader title={t('exercises.dancingHighLow.title' as any)} />
      
      {/* Topic Action Button */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="text-center">
          <TopicStartButton 
            topicKey="dancing-high-low"
            topicIndex={2}
          />
        </div>
      </div>

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Introduction Story */}
        <StorySection>
          <TextContent variant="lead" align="center" className="mb-6">
            {t('exercises.dancingHighLow.introText1' as any)}
          </TextContent>
          <TextContent variant="body" align="center">
            {t('exercises.dancingHighLow.introText2' as any)}
          </TextContent>
        </StorySection>

        {/* Tips for Height Tools */}
        <StorySection>
          <TipsInfoBox
            title={t('exercises.dancingHighLow.tipsTitle' as any)}
            tips={tips}
          />
        </StorySection>

        {/* Why Change Height Section */}
        <StorySection title="Why change the height?">
          <TextContent variant="body" align="center">
            {t('exercises.dancingHighLow.tip4' as any)}
          </TextContent>
        </StorySection>

        {/* Height Drama Text */}
        <StorySection>
          <TextContent variant="body" align="center" className="mb-6">
            {t('exercises.dancingHighLow.heightDramaText' as any)}
          </TextContent>
          
          {/* Professional Example Video */}
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/UiAic0aBKdc?si=0TlLs7TSAb4eYGoc"
                  title="Majo Martirena and Rodrigo Fonti - Height Variation Example"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                Majo Martirena and Rodrigo Fonti demonstrating height variations
              </p>
            </div>
          </div>
        </StorySection>

        {/* See All Assignments Button */}
        <div className="text-center my-12">
          <SeeAllAssignmentsButton 
            to="/exercises/dancing-high-low/assignments"
          >
            All Assignments
          </SeeAllAssignmentsButton>
        </div>
      </div>

      {/* Daily System */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <DancingHighLowDaily1to7 
          completedTasks={completedTasks}
          onTaskLevelChange={handleTaskLevelChange}
        />
      </div>
    </div>
  );
};

export default DancingHighLow;
