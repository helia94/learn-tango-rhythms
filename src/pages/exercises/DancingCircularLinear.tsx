
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import TextContent from '@/components/ui/TextContent';
import TopicStartButton from '@/components/ui/TopicStartButton';
import SeeAllAssignmentsButton from '@/components/ui/SeeAllAssignmentsButton';
import AssignmentList from '@/components/AssignmentList';
import DancingCircularLinearDaily1to3 from '@/components/DancingCircularLinearDaily1to3';
import { getWeeklyAssignments } from '@/data/assignments/dancing_circular_linear';
import LegatoStaccatoSamples from '@/components/music_samples/legatoStaccato';
import AudioPlayer from '@/components/AudioPlayer';
import PracticePlaylistSection from '@/components/ui/PracticePlaylistSection';

const DancingCircularLinear = () => {
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

  // Practice playlist data for circular/linear movements - Updated with correct Spotify URL
  const practicePlaylistData = {
    title: t('exercises.dancingCircularLinear.practiceSongs' as any),
    description: t('exercises.dancingCircularLinear.practiceSongsText' as any),
    spotifySrc: "https://open.spotify.com/embed/playlist/7GPljRTrndvp2oFOlKrn40?utm_source=generator&theme=0",
    infoBoxes: [
      {
        title: t('exercises.dancingCircularLinear.songs1And2' as any),
        subtitle: 'Circular Movement Focus',
        description: t('exercises.dancingCircularLinear.songs1And2Text' as any),
        theme: 'terracotta' as const
      },
      {
        title: t('exercises.dancingCircularLinear.songs3And4' as any),
        subtitle: 'Linear Movement Focus',
        description: t('exercises.dancingCircularLinear.songs3And4Text' as any),
        theme: 'golden' as const
      },
      {
        title: t('exercises.dancingCircularLinear.songs5And6' as any),
        subtitle: 'Mixed Movement Patterns',
        description: t('exercises.dancingCircularLinear.songs5And6Text' as any),
        theme: 'dusty-rose' as const
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader title={t('exercises.dancingCircularLinear.title' as any)} />
      
      {/* Topic Action Button */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="text-center">
          <TopicStartButton 
            topicKey="dancing-circular-linear"
            topicIndex={3}
          />
        </div>
      </div>

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Introduction Story */}
        <StorySection>
          <TextContent variant="lead" align="center" className="mb-6">
            {t('exercises.dancingCircularLinear.introText1' as any)}
          </TextContent>
          <TextContent variant="body" align="center">
            {t('exercises.dancingCircularLinear.introText2' as any)}
          </TextContent>
        </StorySection>

        {/* Musical Connection Section */}
        <StorySection>
          <h2 className="text-3xl font-display text-gray-800 mb-6 text-center">
            {t('exercises.dancingCircularLinear.musicalConnectionTitle' as any)}
          </h2>
          <TextContent variant="body" align="center">
            {t('exercises.dancingCircularLinear.musicalConnectionText1' as any)}
          </TextContent>
        </StorySection>

        <LegatoStaccatoSamples />

        <AudioPlayer
          title="Tango Brujo - Juan D'Arienzo Orchestra"
          audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750588894/Complex_L_and_S_-_Tango_Brujo_-_Juan_D_Arienzo_and_his_Orchestra_k0kar2.mp3"
          colorChanges={[
            { timestamp: 0, color: 'bg-sage-green' },
            { timestamp: 4110, color: 'bg-terracotta' },
            { timestamp: 5480, color: 'bg-sage-green' },
            { timestamp: 7550, color: 'bg-terracotta' },
            { timestamp: 10030, color: 'bg-sage-green' },
            { timestamp: 15050, color: 'bg-terracotta' },
            { timestamp: 23290, color: 'bg-sage-green' },
            { timestamp: 26220, color: 'bg-terracotta' },
          ]}
        />

        {/* Weekly Assignment Section */}
        <StorySection>
          <div className="text-center mb-8">
            <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
            <h2 className="text-3xl font-display text-gray-800 mb-6">{t('exercises.dancingCircularLinear.allAssignments' as any)}</h2>
            
            {/* Prominent "See All Assignments" Button */}
            <div className="mb-6">
              <SeeAllAssignmentsButton to="/exercises/dancing-circular-linear/assignments" />
            </div>
          </div>
          
          <AssignmentList
            assignments={weeklyAssignments}
            completedTasks={completedTasks}
            onTaskLevelChange={handleTaskLevelChange}
            keyPrefix="assignment"
            topicName="dancing-circular-linear"
            topicIndex={3}
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
        <DancingCircularLinearDaily1to3 
          completedTasks={completedTasks}
          onTaskLevelChange={handleTaskLevelChange}
        />
      </div>
    </div>
  );
};

export default DancingCircularLinear;
