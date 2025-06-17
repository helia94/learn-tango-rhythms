
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import TipsInfoBox from '@/components/ui/TipsInfoBox';
import AudioSection from '@/components/ui/AudioSection';
import SeeAllAssignmentsButton from '@/components/ui/SeeAllAssignmentsButton';
import CommentSection from '@/components/ui/CommentSection';
import RatingSection from '@/components/ui/RatingSection';

const DancingSmallBig = () => {
  const { t } = useTranslation();

  const tips = [
    t('exercises.dancingSmallBig.tip1'),
    t('exercises.dancingSmallBig.tip2'), 
    t('exercises.dancingSmallBig.tip3'),
    t('exercises.dancingSmallBig.tip4')
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-sandy-beige to-dusty-rose">
      <PageHeader title={t('exercises.dancingSmallBig.title')} />
      
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Introduction Story */}
        <StorySection
          content={[
            t('exercises.dancingSmallBig.introText1'),
            t('exercises.dancingSmallBig.introText2'),
            t('exercises.dancingSmallBig.resetAndTryBigger')
          ]}
        />

        {/* Tips for Larger Steps */}
        <TipsInfoBox
          title={t('exercises.dancingSmallBig.tipsTitle')}
          tips={tips}
        />

        {/* Musical Connection */}
        <StorySection
          content={[
            t('exercises.dancingSmallBig.connectToMusic'),
            t('exercises.dancingSmallBig.staccatoForSmaller'),
            t('exercises.dancingSmallBig.practiceChanging')
          ]}
        />

        {/* Audio Practice Section */}
        <AudioSection 
          title="Practice with Different Musical Characters"
          description="Listen to these examples and practice changing your step size based on the musical character."
        />

        {/* See All Assignments Button */}
        <div className="text-center my-12">
          <SeeAllAssignmentsButton 
            to="/exercises/dancing-small-big/assignments"
          >
            {t('exercises.dancingSmallBig.allAssignments')}
          </SeeAllAssignmentsButton>
        </div>

        {/* Comments Section */}
        <CommentSection
          title={t('exercises.dancingSmallBig.commentsTitle')}
          placeholder={t('exercises.dancingSmallBig.commentsPlaceholder')}
        />

        {/* Rating Section */}
        <RatingSection
          title={t('exercises.dancingSmallBig.rateTitle')}
          placeholder={t('exercises.dancingSmallBig.ratePlaceholder')}
        />
      </div>
    </div>
  );
};

export default DancingSmallBig;
