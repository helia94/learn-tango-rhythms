
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import TipsInfoBox from '@/components/ui/TipsInfoBox';
import AudioSection from '@/components/ui/AudioSection';
import SeeAllAssignmentsButton from '@/components/ui/SeeAllAssignmentsButton';
import TextContent from '@/components/ui/TextContent';
import TopicStartButton from '@/components/ui/TopicStartButton';

const DancingSmallBig = () => {
  const { t } = useTranslation();

  const tips = [
    t('exercises.dancingSmallBig.tip1'),
    t('exercises.dancingSmallBig.tip2'), 
    t('exercises.dancingSmallBig.tip3'),
    t('exercises.dancingSmallBig.tip4')
  ];

  const practiceAudioTracks = [
    {
      key: 'staccato-example',
      title: 'Staccato Example - Small Steps',
      audioUrl: '/audio/staccato-example.mp3'
    },
    {
      key: 'legato-example',
      title: 'Legato Example - Varied Steps',
      audioUrl: '/audio/legato-example.mp3'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader title={t('exercises.dancingSmallBig.title')} />
      
      {/* Topic Action Button */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="text-center">
          <TopicStartButton 
            topicKey="dancing-small-big"
            topicIndex={1}
          />
        </div>
      </div>

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Introduction Story */}
        <StorySection>
          <TextContent variant="lead" align="center" className="mb-6">
            {t('exercises.dancingSmallBig.introText1')}
          </TextContent>
          <TextContent variant="body" align="center">
            {t('exercises.dancingSmallBig.introText2')}
          </TextContent>
        </StorySection>

        {/* Simple Start Section */}
        <StorySection title="Let's Start Simple">
          <TextContent variant="body" align="center" className="mb-8">
            {t('exercises.dancingSmallBig.resetAndTryBigger')}
          </TextContent>
        </StorySection>

        {/* Tips for Larger Steps */}
        <StorySection>
          <TipsInfoBox
            title={t('exercises.dancingSmallBig.tipsTitle')}
            tips={tips}
          />
        </StorySection>

        {/* Musical Connection */}
        <StorySection title="Musical Connection">
          <TextContent variant="body" align="center" className="space-y-4">
            <p>{t('exercises.dancingSmallBig.connectToMusic')}</p>
            <p>{t('exercises.dancingSmallBig.staccatoForSmaller')}</p>
            <p>{t('exercises.dancingSmallBig.practiceChanging')}</p>
          </TextContent>
        </StorySection>

        {/* Audio Practice Section */}
        <AudioSection 
          title="Practice with Different Musical Characters"
          description="Listen to these examples and practice changing your step size based on the musical character."
          tracks={practiceAudioTracks}
        />

        {/* See All Assignments Button */}
        <div className="text-center my-12">
          <SeeAllAssignmentsButton 
            to="/exercises/dancing-small-big/assignments"
          >
            {t('exercises.dancingSmallBig.allAssignments')}
          </SeeAllAssignmentsButton>
        </div>
      </div>
    </div>
  );
};

export default DancingSmallBig;
