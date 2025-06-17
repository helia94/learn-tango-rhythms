
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import TipsInfoBox from '@/components/ui/TipsInfoBox';
import AudioSection from '@/components/ui/AudioSection';
import SeeAllAssignmentsButton from '@/components/ui/SeeAllAssignmentsButton';
import CommentSection from '@/components/ui/CommentSection';
import RatingSection from '@/components/ui/RatingSection';
import TextContent from '@/components/ui/TextContent';

const DancingSmallBig = () => {
  const { t } = useTranslation();

  const tips = [
    t('exercises.dancingSmallBig.tip1' as any),
    t('exercises.dancingSmallBig.tip2' as any), 
    t('exercises.dancingSmallBig.tip3' as any),
    t('exercises.dancingSmallBig.tip4' as any)
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
    <div className="min-h-screen bg-gradient-to-b from-cream via-sandy-beige to-dusty-rose">
      <PageHeader title={t('exercises.dancingSmallBig.title' as any)} />
      
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Introduction Story */}
        <StorySection>
          <TextContent variant="body" className="space-y-4">
            <p>{t('exercises.dancingSmallBig.introText1' as any)}</p>
            <p>{t('exercises.dancingSmallBig.introText2' as any)}</p>
            <p>{t('exercises.dancingSmallBig.resetAndTryBigger' as any)}</p>
          </TextContent>
        </StorySection>

        {/* Tips for Larger Steps */}
        <TipsInfoBox
          title={t('exercises.dancingSmallBig.tipsTitle' as any)}
          tips={tips}
        />

        {/* Musical Connection */}
        <StorySection>
          <TextContent variant="body" className="space-y-4">
            <p>{t('exercises.dancingSmallBig.connectToMusic' as any)}</p>
            <p>{t('exercises.dancingSmallBig.staccatoForSmaller' as any)}</p>
            <p>{t('exercises.dancingSmallBig.practiceChanging' as any)}</p>
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
            {t('exercises.dancingSmallBig.allAssignments' as any)}
          </SeeAllAssignmentsButton>
        </div>

        {/* Comments Section */}
        <CommentSection
          title={t('exercises.dancingSmallBig.commentsTitle' as any)}
          placeholder={t('exercises.dancingSmallBig.commentsPlaceholder' as any)}
        />

        {/* Rating Section */}
        <RatingSection
          title={t('exercises.dancingSmallBig.rateTitle' as any)}
          placeholder={t('exercises.dancingSmallBig.ratePlaceholder' as any)}
        />
      </div>
    </div>
  );
};

export default DancingSmallBig;
