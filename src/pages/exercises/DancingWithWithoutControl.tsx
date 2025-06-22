
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import TextContent from '@/components/ui/TextContent';
import TopicStartButton from '@/components/ui/TopicStartButton';
import SeeAllAssignmentsButton from '@/components/ui/SeeAllAssignmentsButton';
import AssignmentList from '@/components/AssignmentList';
import DancingWithWithoutControlDaily1to4 from '@/components/DancingWithWithoutControlDaily1to4';
import { getWeeklyAssignments } from '@/data/assignments/dancing_with_without_control';
import PracticePlaylistSection from '@/components/ui/PracticePlaylistSection';

const DancingWithWithoutControl = () => {
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

  // Practice playlist data for control/freedom movements - Updated with correct Spotify URL
  const practicePlaylistData = {
    title: t('exercises.dancingWithWithoutControl.practiceSongs' as any),
    description: t('exercises.dancingWithWithoutControl.practiceSongsText' as any),
    spotifySrc: "https://open.spotify.com/embed/playlist/1WgzC5smCEn5obaBK9h8Tn?utm_source=generator&theme=0"
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader title={t('exercises.dancingWithWithoutControl.title' as any)} />
      
      {/* Topic Action Button */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="text-center">
          <TopicStartButton 
            topicKey="dancing-with-without-control"
            topicIndex={4}
          />
        </div>
      </div>

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Introduction Story */}
        <StorySection>
          <TextContent variant="lead" align="center" className="mb-6">
            {t('exercises.dancingWithWithoutControl.introText1' as any)}
          </TextContent>
          <TextContent variant="body" align="center">
            {t('exercises.dancingWithWithoutControl.introText2' as any)}
          </TextContent>
          <TextContent variant="body" align="center" className="mb-8">
            {t('exercises.dancingWithWithoutControl.introText3' as any)}
          </TextContent>
        </StorySection>

        {/* Weekly Assignment Section */}
        <StorySection>
          <div className="text-center mb-8">
            <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
            <h2 className="text-3xl font-display text-gray-800 mb-6">{t('exercises.dancingWithWithoutControl.allAssignments' as any)}</h2>
            
            {/* Prominent "See All Assignments" Button */}
            <div className="mb-6">
              <SeeAllAssignmentsButton to="/exercises/dancing-with-without-control/assignments" />
            </div>
          </div>
          
          <AssignmentList
            assignments={weeklyAssignments}
            completedTasks={completedTasks}
            onTaskLevelChange={handleTaskLevelChange}
            keyPrefix="assignment"
            topicName="dancing-with-without-control"
            topicIndex={4}
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
        <DancingWithWithoutControlDaily1to4 
          completedTasks={completedTasks}
          onTaskLevelChange={handleTaskLevelChange}
        />
      </div>
    </div>
  );
};

export default DancingWithWithoutControl;
