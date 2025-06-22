import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import TextContent from '@/components/ui/TextContent';
import TopicStartButton from '@/components/ui/TopicStartButton';
import SeeAllAssignmentsButton from '@/components/ui/SeeAllAssignmentsButton';
import AssignmentList from '@/components/AssignmentList';
import DancingHighLowDaily1to7 from '@/components/DancingHighLowDaily1to7';
import { getWeeklyAssignments } from '@/data/assignments/dancing_high_low';
import AudioPlayer from '@/components/AudioPlayer';
import PracticePlaylistSection from '@/components/ui/PracticePlaylistSection';

const DancingHighLow = () => {
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

  // Practice playlist data for high/low movements - Updated with correct Spotify URL
  const practicePlaylistData = {
    title: t('exercises.dancingHighLow.practiceSongs' as any),
    description: t('exercises.dancingHighLow.practiceSongsText' as any),
    spotifySrc: "https://open.spotify.com/embed/playlist/59a9ECiGhkJ6t35KXC1DeP?utm_source=generator&theme=0"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader title={t('exercises.dancingHighLow.title' as any)} />
      
      {/* Topic Action Button */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="text-center">
          <TopicStartButton 
            topicKey="dancing-high-low"
            topicIndex={1}
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

        {/* Musical Connection Section */}
        <StorySection>
          <h2 className="text-3xl font-display text-gray-800 mb-6 text-center">
            {t('exercises.dancingHighLow.musicalConnectionTitle' as any)}
          </h2>
          <TextContent variant="body" align="center">
            {t('exercises.dancingHighLow.musicalConnectionText1' as any)}
          </TextContent>
        </StorySection>

        <AudioPlayer
          title="High-Low Example - Orchestra Variation"
          audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750588894/High_Low_Example_Orchestra_Variation.mp3"
          colorChanges={[
            { timestamp: 0, color: 'bg-sage-green' },
            { timestamp: 5000, color: 'bg-terracotta' },
            { timestamp: 10000, color: 'bg-sage-green' },
            { timestamp: 15000, color: 'bg-terracotta' },
          ]}
        />

        {/* Weekly Assignment Section */}
        <StorySection>
          <div className="text-center mb-8">
            <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
            <h2 className="text-3xl font-display text-gray-800 mb-6">{t('exercises.dancingHighLow.allAssignments' as any)}</h2>
            
            {/* Prominent "See All Assignments" Button */}
            <div className="mb-6">
              <SeeAllAssignmentsButton to="/exercises/dancing-high-low/assignments" />
            </div>
          </div>
          
          <AssignmentList
            assignments={weeklyAssignments}
            completedTasks={completedTasks}
            onTaskLevelChange={handleTaskLevelChange}
            keyPrefix="assignment"
            topicName="dancing-high-low"
            topicIndex={1}
          />
        </StorySection>

        {/* Practice Playlist Section */}
        <PracticePlaylistSection 
          title={practicePlaylistData.title}
          description={practicePlaylistData.description}
          spotifySrc={practicePlaylistData.spotifySrc}
        />
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
