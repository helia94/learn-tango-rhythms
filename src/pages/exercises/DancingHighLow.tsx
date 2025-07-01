import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import TipsInfoBox from '@/components/ui/TipsInfoBox';
import SeeAllAssignmentsButton from '@/components/ui/SeeAllAssignmentsButton';
import TextContent from '@/components/ui/TextContent';
import TopicStartButton from '@/components/ui/TopicStartButton';
import AssignmentList from '@/components/AssignmentList';
import { getWeeklyAssignments } from '@/data/assignments/dancing_high_low';
import PracticePlaylistSection from '@/components/ui/PracticePlaylistSection';
import { TOPIC_CONFIG } from '@/config/topics';
import DailyExerciseWrapper from '@/components/ui/DailyExerciseWrapper';

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

  const topic = TOPIC_CONFIG.DANCING_HIGH_LOW;

  const tips = [
    t('exercises.dancingHighLow.tip1' as any),
    t('exercises.dancingHighLow.tip2' as any), 
    t('exercises.dancingHighLow.tip3' as any)
  ];

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
            topicKey={topic.key}
            topicIndex={topic.index}
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
        <StorySection title="">
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
                  src="https://www.youtube.com/embed/UiAic0aBKdk?si=0TlLs7TSAb4eYGoc"
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
            topicName={topic.key}
            topicIndex={topic.index}
          />
        </StorySection>

        {/* Practice Playlist Section */}
        <PracticePlaylistSection 
          title={practicePlaylistData.title}
          description={practicePlaylistData.description}
          spotifySrc={practicePlaylistData.spotifySrc}
        />
      </div>

        <DailyExerciseWrapper
          topicKey={topic.key}
          completedTasks={completedTasks}
          onTaskLevelChange={handleTaskLevelChange}
        />
    </div>
  );
};

export default DancingHighLow;
