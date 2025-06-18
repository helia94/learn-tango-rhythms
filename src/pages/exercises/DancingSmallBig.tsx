
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

  const tips = [
    "You have to have more control and contact with the floor",
    "Push the floor more", 
    "Go a bit lower in your posture",
    "Your follower needs three times more patience than usual"
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
      <PageHeader title="Dancing Small and Big" />
      
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
            This is an option only when the milonga is not very crowded and you even have the option. Realize what is your normal stepping size, and also when you tend to change it.
          </TextContent>
          <TextContent variant="body" align="center">
            Now try with your partner to walk in your usual size. Then try going smaller and smaller to the tiniest walking step possible.
          </TextContent>
        </StorySection>

        {/* Simple Start Section */}
        <StorySection title="Let's Start Simple">
          <TextContent variant="body" align="center" className="mb-8">
            Then reset, start from your normal step and try making it bigger. If you have just started with tango, larger steps might not work at all - they need more control, technique and experience.
          </TextContent>
        </StorySection>

        {/* Tips for Larger Steps */}
        <StorySection>
          <TipsInfoBox
            title="Tips for Larger Steps"
            tips={tips}
          />
        </StorySection>

        {/* Musical Connection */}
        <StorySection title="Musical Connection">
          <TextContent variant="body" align="center" className="space-y-4">
            <p>Now let's connect to the music. Listen to melody being rhythmical (Staccato) or being like singing (Legato).</p>
            <p>Rhythmical melody is a good candidate for dancing smaller.</p>
            <p>Now try changing the size of your step - much smaller and much bigger - when the music changes.</p>
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
            All Assignments
          </SeeAllAssignmentsButton>
        </div>
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
