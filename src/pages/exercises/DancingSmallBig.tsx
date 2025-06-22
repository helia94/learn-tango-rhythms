
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import TextContent from '@/components/ui/TextContent';
import TopicStartButton from '@/components/ui/TopicStartButton';
import SeeAllAssignmentsButton from '@/components/ui/SeeAllAssignmentsButton';
import AssignmentList from '@/components/AssignmentList';
import SmallAndBigDaily1to7 from '@/components/SmallAndBigDaily1to7';
import { getWeeklyAssignments } from '@/data/assignments/smallAndBig';
import AudioPlayer from '@/components/AudioPlayer';
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

  const weeklyAssignmentsData = getWeeklyAssignments();
  const weeklyAssignments = weeklyAssignmentsData.map(item => item.assignment);

  // Practice playlist data for small/big movements
  const practicePlaylistData = {
    title: t('exercises.dancingSmallBig.practiceSongs' as any),
    description: t('exercises.dancingSmallBig.practiceSongsText' as any),
    spotifySrc: "https://open.spotify.com/embed/playlist/37i9dQZF1DX1rVvRgjX59F?utm_source=generator&theme=0",
    infoBoxes: [
      {
        title: t('exercises.dancingSmallBig.songs1And2' as any),
        subtitle: 'Small Movement Focus',
        description: t('exercises.dancingSmallBig.songs1And2Text' as any),
        theme: 'terracotta' as const
      },
      {
        title: t('exercises.dancingSmallBig.songs3And4' as any),
        subtitle: 'Big Movement Focus',
        description: t('exercises.dancingSmallBig.songs3And4Text' as any),
        theme: 'golden' as const
      },
      {
        title: t('exercises.dancingSmallBig.songs5And6' as any),
        subtitle: 'Size Contrast',
        description: t('exercises.dancingSmallBig.songs5And6Text' as any),
        theme: 'dusty-rose' as const
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader title={t('exercises.dancingSmallBig.title' as any)} />
      
      {/* Topic Action Button */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="text-center">
          <TopicStartButton 
            topicKey="dancing-small-big"
            topicIndex={2}
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
        </StorySection>

        {/* Musical Connection Section */}
        <StorySection>
          <h2 className="text-3xl font-display text-gray-800 mb-6 text-center">
            {t('exercises.dancingSmallBig.musicalConnectionTitle' as any)}
          </h2>
          <TextContent variant="body" align="center">
            {t('exercises.dancingSmallBig.musicalConnectionText1' as any)}
          </TextContent>
        </StorySection>

        <AudioPlayer
          title="Small-Big Example - Movement Contrast"
          audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750588894/Small_Big_Example_Movement_Contrast.mp3"
          colorChanges={[
            { timestamp: 0, color: 'bg-sage-green' },
            { timestamp: 6000, color: 'bg-terracotta' },
            { timestamp: 12000, color: 'bg-sage-green' },
            { timestamp: 18000, color: 'bg-terracotta' },
          ]}
        />

        {/* Weekly Assignment Section */}
        <StorySection>
          <div className="text-center mb-8">
            <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
            <h2 className="text-3xl font-display text-gray-800 mb-6">{t('exercises.dancingSmallBig.allAssignments' as any)}</h2>
            
            {/* Prominent "See All Assignments" Button */}
            <div className="mb-6">
              <SeeAllAssignmentsButton to="/exercises/dancing-small-big/assignments" />
            </div>
          </div>
          
          <AssignmentList
            assignments={weeklyAssignments}
            completedTasks={completedTasks}
            onTaskLevelChange={handleTaskLevelChange}
            keyPrefix="assignment"
            topicName="dancing-small-big"
            topicIndex={2}
          />
        </StorySection>

        {/* Practice Playlist Section */}
        <PracticePlaylistSection 
          title={practicePlaylistData.title}
          description={practicePlaylistData.description}
          spotifySrc={practicePlaylistData.spotifySrc}
          infoBoxes={practicePlaylistData.infoBoxes}
        />
      </div>

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
