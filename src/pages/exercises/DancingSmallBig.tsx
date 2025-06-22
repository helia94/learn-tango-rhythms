
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import TipsInfoBox from '@/components/ui/TipsInfoBox';
import AudioSection from '@/components/ui/AudioSection';
import SeeAllAssignmentsButton from '@/components/ui/SeeAllAssignmentsButton';
import TextContent from '@/components/ui/TextContent';
import TopicStartButton from '@/components/ui/TopicStartButton';
import SmallAndBigDaily1to7 from '@/components/SmallAndBigDaily1to7';
import AssignmentList from '@/components/AssignmentList';
import { getWeeklyAssignments } from '@/data/assignments/smallAndBig';
import LegatoStaccatoSamples from '@/components/music_samples/legatoStaccato';
import PracticePlaylistSection from '@/components/ui/PracticePlaylistSection';

const DancingSmallBig = () => {
  const { t } = useTranslation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});

  const handleTaskLevelChange = (taskId: string, level: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
    }));
  };

  const weeklyAssignments = getWeeklyAssignments();

  // Practice playlist data for small/big movements - Updated with correct Spotify URL
  const practicePlaylistData = {
    title: t('exercises.dancingSmallBig.practiceSongs' as any),
    description: t('exercises.dancingSmallBig.practiceSongsText' as any),
    spotifySrc: "https://open.spotify.com/embed/playlist/18Qhg7v2D5MQZOUPYnwWDw?utm_source=generator&theme=0"
  };

  const tips = [
    t('exercises.dancingSmallBig.tip1' as any),
    t('exercises.dancingSmallBig.tip2' as any), 
    t('exercises.dancingSmallBig.tip3' as any),
    t('exercises.dancingSmallBig.tip4' as any)
  ];

  const practiceAudioTracks = [
    {
      key: 'staccato-example',
      title: t('exercises.dancingSmallBig.staccatoExampleTitle' as any),
      audioUrl: '/audio/staccato-example.mp3'
    },
    {
      key: 'legato-example',
      title: t('exercises.dancingSmallBig.legatoExampleTitle' as any),
      audioUrl: '/audio/legato-example.mp3'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader title={t('exercises.dancingSmallBig.title' as any)} />
      
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
            {t('exercises.dancingSmallBig.introText1' as any)}
          </TextContent>
          <TextContent variant="body" align="center">
            {t('exercises.dancingSmallBig.introText2' as any)}
          </TextContent>
          <TextContent variant="body" align="center" className="mb-8">
            {t('exercises.dancingSmallBig.introText3' as any)}
          </TextContent>
        </StorySection>

        {/* Tips for Larger Steps */}
        <StorySection>
          <TipsInfoBox
            title={t('exercises.dancingSmallBig.tipsTitle' as any)}
            tips={tips}
          />
        </StorySection>

        {/* Musical Connection */}
        <StorySection title={t('exercises.dancingSmallBig.musicalConnectionTitle' as any)}>
          <TextContent variant="body" align="center" className="space-y-4">
            {t('exercises.dancingSmallBig.musicalConnectionText1' as any)}
          </TextContent>
          <TextContent variant="body" align="center" className="space-y-4">
            {t('exercises.dancingSmallBig.musicalConnectionText2' as any)}
          </TextContent>
          <TextContent variant="body" align="center" className="space-y-4">
            {t('exercises.dancingSmallBig.musicalConnectionText3' as any)}
          </TextContent>
        </StorySection>

        <LegatoStaccatoSamples />        
        
        
        {/* Weekly Assignment Section */}
        <StorySection>
          <div className="text-center mb-8">
            <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
            <h2 className="text-3xl font-display text-gray-800 mb-6">{t('exercises.dancingCircularLinear.allAssignments' as any)}</h2>
            
            {/* Prominent "See All Assignments" Button */}
            <div className="mb-6">
              <SeeAllAssignmentsButton to="/exercises/dancing-small-big/assignments"/>
            </div>
          </div>
          
          <AssignmentList
            assignments={weeklyAssignments}
            completedTasks={completedTasks}
            onTaskLevelChange={handleTaskLevelChange}
            keyPrefix="assignment"
            topicName="dancing-small-big"
            topicIndex={3}
          />
        </StorySection>
        
        {/* Practice Playlist Section */}
        <PracticePlaylistSection 
          title={practicePlaylistData.title}
          description={practicePlaylistData.description}
          spotifySrc={practicePlaylistData.spotifySrc}
        />      </div>

      {/* Daily System */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <SmallAndBigDaily1to7 
          completedTasks={completedTasks}
          onTaskLevelChange={handleTaskLevelChange}
        />
      </div>
    </div>
  );
};

export default DancingSmallBig;
