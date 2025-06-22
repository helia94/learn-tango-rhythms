
import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAssignmentReporting } from '@/hooks/useAssignmentReporting';
import SimpleRhythmPlayer from '@/components/SimpleRhythmPlayer';
import AudioPlayer from '@/components/AudioPlayer';
import FastAndSlowDaily1to7 from '@/components/FastAndSlowDaily1to7';
import AssignmentList from '@/components/AssignmentList';
import Assignment from '@/components/Assignment';
import PageHeader from '@/components/ui/PageHeader';
import StorySection from '@/components/ui/StorySection';
import SpeedCards from '@/components/ui/SpeedCards';
import SpotifyEmbed from '@/components/ui/SpotifyEmbed';
import CommentSection from '@/components/ui/CommentSection';
import RatingSection from '@/components/ui/RatingSection';
import InteractiveRhythmPlayer from '@/components/ui/InteractiveRhythmPlayer';
import TextContent from '@/components/ui/TextContent';
import SeeAllAssignmentsButton from '@/components/ui/SeeAllAssignmentsButton';
import TopicStartButton from '@/components/ui/TopicStartButton';
import BeatIllustration from '@/components/ui/BeatIllustration';
import LegatoStaccatoSamples from '@/components/music_samples/legatoStaccato';
import { getWeeklyAssignments, getAssignment } from '@/data/assignments/fastAndSlow';
import PracticePlaylistSection from '@/components/ui/PracticePlaylistSection';

// Audio players list for tracking purposes
export const audioPlayers = [
  {
    key: 'typical-strong-beat',
    title: 'exercises.dancingFastSlow.typicalStrongBeat',
    audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749836334/SimpleMercato2-16Sec-CarlosDiSarli-La_vida_me_enga%C3%B1o_oxc9vb.mp3'
  },
  {
    key: 'from-2-to-4-beats',
    title: 'exercises.dancingFastSlow.from2To4Beats',
    audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/mercato_2_to_4_Me_quede_mirandola_widbtv.mp3',
    colorChanges: [{ timestamp: 7500, color: 'bg-dusty-rose' }]
  },
  {
    key: 'from-4-to-2-beats',
    title: 'exercises.dancingFastSlow.from4To2Beats',
    audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/mercato4_to_2Me_quede_mirandola_n189ki.mp3',
    colorChanges: [{ timestamp: 6500, color: 'bg-dusty-rose' }]
  },
  {
    key: 'legato-to-staccato',
    title: 'exercises.dancingFastSlow.legatoToStaccato',
    audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/legato_to_Stacatto_Invierno_-_Francisco_Canaro-_gcc7qs.mp3',
    colorChanges: [{ timestamp: 6500, color: 'bg-dusty-rose' }]
  },
  {
    key: 'staccato-to-legato',
    title: 'exercises.dancingFastSlow.staccatoToLegato',
    audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/Stacatto_to_legato_Invierno_-_Francisco_Canaro-_ho4nwj.mp3',
    colorChanges: [{ timestamp: 6500, color: 'bg-dusty-rose' }]
  }
];

const DancingFastSlow = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});
  const { getAllLatestAssignmentLevelByTopic } = useAssignmentReporting();

  const weeklyAssignments = getWeeklyAssignments();
  const walkingPracticeAssignment = getAssignment('walking-practice');

  // Fetch assignment levels on component mount
  useEffect(() => {
    const fetchAssignmentLevels = async () => {
      if (!user) return;

      try {
        const assignmentLevels = await getAllLatestAssignmentLevelByTopic('dancing-fast-slow', 0);
        console.log('Fetched assignment levels:', assignmentLevels);
        
        // Convert to completedTasks format
        const tasksMap: Record<string, number> = {};
        assignmentLevels.forEach(assignment => {
          tasksMap[assignment.assignment_key] = assignment.level;
        });
        
        setCompletedTasks(tasksMap);
      } catch (error) {
        console.error('Error fetching assignment levels:', error);
      }
    };

    fetchAssignmentLevels();
  }, [user, getAllLatestAssignmentLevelByTopic]);

  const handleTaskLevelChange = (taskId: string, level: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
    }));
  };

  const handleTopicAction = () => {
    if (!user) {
      navigate('/auth');
    } else {
      // Do nothing for now as requested
      console.log('Start this topic clicked - no action implemented yet');
    }
  };

  const speedCards = [
    {
      number: '1',
      label: t('exercises.dancingFastSlow.halfSpeed'),
      theme: 'terracotta' as const
    },
    {
      number: '2',
      label: t('exercises.dancingFastSlow.normalSpeed'),
      theme: 'golden' as const
    },
    {
      number: '4',
      label: t('exercises.dancingFastSlow.doubleSpeed'),
      theme: 'dusty-rose' as const
    }
  ];

  // Practice playlist data
  const practicePlaylistData = {
    title: t('exercises.dancingFastSlow.practiceSongs'),
    description: t('exercises.dancingFastSlow.practiceSongsText'),
    spotifySrc: "https://open.spotify.com/embed/playlist/1wZ0CPVIgn7Ry41Kmwzh9k?utm_source=generator&theme=0",
    infoBoxes: [
      {
        title: t('exercises.dancingFastSlow.songs1And2'),
        subtitle: 'From Canaro Orquestra',
        description: t('exercises.dancingFastSlow.songs1And2Text'),
        theme: 'terracotta' as const
      },
      {
        title: t('exercises.dancingFastSlow.songs3And4'),
        subtitle: 'From early Di Sarli Orquestra',
        description: t('exercises.dancingFastSlow.songs3And4Text'),
        theme: 'golden' as const
      },
      {
        title: t('exercises.dancingFastSlow.songs5And6'),
        subtitle: 'From Troilo Orquestra',
        description: t('exercises.dancingFastSlow.songs5And6Text'),
        theme: 'dusty-rose' as const
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader title={t('exercises.dancingFastSlow.title')} />

      {/* Topic Action Button */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="text-center">
          <TopicStartButton />
        </div>
      </div>

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Introduction Story */}
        <StorySection>
          <TextContent variant="lead" align="center" className="mb-6">
            {t('exercises.dancingFastSlow.introText1')}
          </TextContent>
          <TextContent variant="body" align="center">
            {t('exercises.dancingFastSlow.introText2')}
          </TextContent>
        </StorySection>

        {/* Simple Start Section */}
        <StorySection title={t('exercises.dancingFastSlow.letStartSimple')}>
          <div className="flex flex-col items-center gap-4 mb-8">
            <TextContent variant="body" align="center">
              {t('exercises.dancingFastSlow.simpleText1')}
            </TextContent>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 text-lg">Good beginners dance on the down beat [also known as the strong beat] [numbers 1 and 3 if we count to 4]</span>
              <BeatIllustration />
            </div>
          </div>
          
          <div className="mb-8">
            <AudioPlayer 
              key="typical-strong-beat"
              title={t('exercises.dancingFastSlow.typicalStrongBeat')}
              audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1749836334/SimpleMercato2-16Sec-CarlosDiSarli-La_vida_me_enga%C3%B1o_oxc9vb.mp3"
            />
          </div>

          <TextContent variant="body" align="center" className="mb-8 italic">
            {t('exercises.dancingFastSlow.couldNotFindBeat')}
          </TextContent>

          {/* Simple Rhythm Player */}
          <div className="mb-8">
            <SimpleRhythmPlayer 
              pattern={[true, false, true, false]} 
              label=""
            />
          </div>
        </StorySection>

        {/* Three Speeds Section */}
        <StorySection title={t('exercises.dancingFastSlow.threeSpeeds')}>
          <TextContent variant="body" align="center" className="mb-8">
            {t('exercises.dancingFastSlow.threeSpeedsText')}
          </TextContent>
          
          <SpeedCards cards={speedCards} />

          <div className="mb-8">
            <TextContent variant="body" align="center" className="mb-6">
              {t('exercises.dancingFastSlow.fullSongText')}
            </TextContent>
            <SpotifyEmbed src="https://open.spotify.com/embed/track/4FMWYCgSUTyLXCoX3GK8We?utm_source=generator&theme=0" />
          </div>

          {/* Interactive Rhythm Player */}
          <InteractiveRhythmPlayer />

          {walkingPracticeAssignment && (
            <Assignment
              assignment={walkingPracticeAssignment}
              taskId="task-1"
              level={completedTasks['task-1'] || 0}
              onLevelChange={handleTaskLevelChange}
              variant="sage"
              topicName="dancing-fast-slow"
              topicIndex={0}
            />
          )}
        </StorySection>

        {/* Music Speed Changes Section */}
        <StorySection title={t('exercises.dancingFastSlow.musicSpeedChanges')}>
          <TextContent variant="body" align="center" className="mb-12">
            {t('exercises.dancingFastSlow.musicSpeedChangesText')}
          </TextContent>

          {/* Rhythm Changes */}
          <div className="mb-12">
            <h3 className="text-2xl font-display text-gray-700 mb-6 text-center">{t('exercises.dancingFastSlow.rhythmChanges')}</h3>
            <TextContent variant="body" align="center" className="mb-8">
              {t('exercises.dancingFastSlow.rhythmChangesText')}
            </TextContent>
            
            <div className="space-y-4">
              <AudioPlayer 
                key="from-2-to-4-beats"
                title={t('exercises.dancingFastSlow.from2To4Beats')}
                audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/mercato_2_to_4_Me_quede_mirandola_widbtv.mp3"
                colorChanges={[
                  { timestamp: 7500, color: 'bg-dusty-rose' }
                ]}
              />
              
              <AudioPlayer 
                key="from-4-to-2-beats"
                title={t('exercises.dancingFastSlow.from4To2Beats')}
                audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/mercato4_to_2Me_quede_mirandola_n189ki.mp3"
                colorChanges={[
                  { timestamp: 6500, color: 'bg-dusty-rose' }
                ]}
              />
            </div>
          </div>

          {/* Melody Changes */}
          <div className="mb-12">
            <h3 className="text-2xl font-display text-gray-700 mb-6 text-center">{t('exercises.dancingFastSlow.melodyChanges')}</h3>
            <TextContent variant="body" align="center" className="mb-8">
              {t('exercises.dancingFastSlow.melodyChangesText')}
            </TextContent>
            
            <LegatoStaccatoSamples />
          </div>
        </StorySection>

        {/* Weekly Assignment Section */}
        <StorySection>
          <div className="text-center mb-8">
            <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
            <h2 className="text-3xl font-display text-gray-800 mb-6">{t('exercises.dancingFastSlow.weeklyAssignment')}</h2>
            
            {/* Prominent "See All Assignments" Button - Now using reusable component */}
            <div className="mb-6">
              <SeeAllAssignmentsButton to="/exercises/dancing-fast-slow/assignments" />
            </div>
          </div>
          
          <AssignmentList
            assignments={weeklyAssignments}
            completedTasks={completedTasks}
            onTaskLevelChange={handleTaskLevelChange}
            keyPrefix="assignment"
            topicName="dancing-fast-slow"
            topicIndex={0}
          />
        </StorySection>

        {/* Practice Playlist Section - Now using the templated component */}
        <PracticePlaylistSection 
          title={practicePlaylistData.title}
          description={practicePlaylistData.description}
          spotifySrc={practicePlaylistData.spotifySrc}
          infoBoxes={practicePlaylistData.infoBoxes}
        />

        {/* Progress Note Section */}
        <StorySection variant="note">
          <TextContent variant="body" align="center">
            {t('exercises.dancingFastSlow.progressNote')}
          </TextContent>
        </StorySection>

        {/* Daily Assignments Section */}
        <FastAndSlowDaily1to7 
          completedTasks={completedTasks}
          onTaskLevelChange={handleTaskLevelChange}
        />

        {/* Comment Section */}
        <CommentSection 
          title={t('exercises.dancingFastSlow.commentsTitle')}
          placeholder={t('exercises.dancingFastSlow.commentsPlaceholder')}
        />

        {/* Review Section */}
        <RatingSection 
          title={t('exercises.dancingFastSlow.rateTitle')}
          placeholder={t('exercises.dancingFastSlow.ratePlaceholder')}
        />
      </div>
    </div>
  );
};

export default DancingFastSlow;
