
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
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
import { getWeeklyAssignments, getAssignment } from '@/data/assignments';

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
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});
  const [rhythmSpeed, setRhythmSpeed] = useState<string>('1');

  const weeklyAssignments = getWeeklyAssignments();
  const walkingPracticeAssignment = getAssignment('walking-practice');

  const handleTaskLevelChange = (taskId: string, level: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
    }));
  };

  const getRhythmPattern = (speed: string) => {
    switch (speed) {
      case '1': return [true, false, false, false]; // Beat 1 only
      case '2': return [true, false, true, false];  // Beats 1 and 3
      case '4': return [true, true, true, true];    // All beats
      default: return [true, false, true, false];
    }
  };

  const speedCards = [
    {
      number: '1',
      label: t('exercises.dancingFastSlow.halfSpeed'),
      bgColor: 'bg-terracotta/30',
      borderColor: 'border-terracotta/40'
    },
    {
      number: '2',
      label: t('exercises.dancingFastSlow.normalSpeed'),
      bgColor: 'bg-golden-yellow/30',
      borderColor: 'border-golden-yellow/40'
    },
    {
      number: '4',
      label: t('exercises.dancingFastSlow.doubleSpeed'),
      bgColor: 'bg-dusty-rose/30',
      borderColor: 'border-dusty-rose/40'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      <PageHeader title={t('exercises.dancingFastSlow.title')} />

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Introduction Story */}
        <StorySection>
          <p className="text-gray-700 text-xl leading-relaxed mb-6 text-center">
            {t('exercises.dancingFastSlow.introText1')}
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-center">
            {t('exercises.dancingFastSlow.introText2')}
          </p>
        </StorySection>

        {/* Simple Start Section */}
        <StorySection title={t('exercises.dancingFastSlow.letStartSimple')}>
          <p className="text-gray-700 text-lg mb-8 text-center">
            {t('exercises.dancingFastSlow.simpleText1')}
          </p>
          
          <div className="mb-8">
            <AudioPlayer 
              key="typical-strong-beat"
              title={t('exercises.dancingFastSlow.typicalStrongBeat')}
              audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1749836334/SimpleMercato2-16Sec-CarlosDiSarli-La_vida_me_enga%C3%B1o_oxc9vb.mp3"
            />
          </div>

          <p className="text-gray-600 text-center italic mb-8">
            {t('exercises.dancingFastSlow.couldNotFindBeat')}
          </p>

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
          <p className="text-gray-700 text-lg mb-8 text-center">{t('exercises.dancingFastSlow.threeSpeedsText')}</p>
          
          <SpeedCards cards={speedCards} />

          <div className="mb-8">
            <p className="text-gray-700 text-lg mb-6 text-center">
              {t('exercises.dancingFastSlow.fullSongText')}
            </p>
            <SpotifyEmbed src="https://open.spotify.com/embed/track/4FMWYCgSUTyLXCoX3GK8We?utm_source=generator&theme=0" />
          </div>

          {/* Interactive Rhythm Player */}
          <div className="mb-8">
            <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-6 border border-cream/20">
              {/* Speed Toggle */}
              <div className="flex justify-center mb-6">
                <ToggleGroup 
                  type="single" 
                  value={rhythmSpeed} 
                  onValueChange={(value) => value && setRhythmSpeed(value)}
                  className="bg-warm-brown/40 rounded-lg p-1"
                >
                  <ToggleGroupItem 
                    value="1" 
                    className="data-[state=on]:bg-terracotta data-[state=on]:text-cream text-gray-600 hover:text-gray-700"
                  >
                    1
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="2" 
                    className="data-[state=on]:bg-golden-yellow data-[state=on]:text-warm-brown text-gray-600 hover:text-gray-700"
                  >
                    2
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="4" 
                    className="data-[state=on]:bg-dusty-rose data-[state=on]:text-cream text-gray-600 hover:text-gray-700"
                  >
                    4
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Rhythm Player */}
              <SimpleRhythmPlayer 
                pattern={getRhythmPattern(rhythmSpeed)} 
                label=""
                speedLevel={1}
              />
            </div>
          </div>

          {walkingPracticeAssignment && (
            <Assignment
              assignment={walkingPracticeAssignment}
              taskId="task-1"
              level={completedTasks['task-1'] || 0}
              onLevelChange={handleTaskLevelChange}
              variant="sage"
            />
          )}
        </StorySection>

        {/* Music Speed Changes Section */}
        <StorySection title={t('exercises.dancingFastSlow.musicSpeedChanges')}>
          <p className="text-gray-700 text-lg mb-12 text-center">
            {t('exercises.dancingFastSlow.musicSpeedChangesText')}
          </p>

          {/* Rhythm Changes */}
          <div className="mb-12">
            <h3 className="text-2xl font-display text-gray-700 mb-6 text-center">{t('exercises.dancingFastSlow.rhythmChanges')}</h3>
            <p className="text-gray-600 mb-8 text-center leading-relaxed">
              {t('exercises.dancingFastSlow.rhythmChangesText')}
            </p>
            
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
            <p className="text-gray-600 mb-8 text-center leading-relaxed">
              {t('exercises.dancingFastSlow.melodyChangesText')}
            </p>
            
            <div className="space-y-4">
              <AudioPlayer 
                key="legato-to-staccato"
                title={t('exercises.dancingFastSlow.legatoToStaccato')}
                audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/legato_to_Stacatto_Invierno_-_Francisco_Canaro-_gcc7qs.mp3"
                colorChanges={[
                  { timestamp: 6500, color: 'bg-dusty-rose' }
                ]}
              />
              
              <AudioPlayer 
                key="staccato-to-legato"
                title={t('exercises.dancingFastSlow.staccatoToLegato')}
                audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/Stacatto_to_legato_Invierno_-_Francisco_Canaro-_ho4nwj.mp3"
                colorChanges={[
                  { timestamp: 6500, color: 'bg-dusty-rose' }
                ]}
              />
            </div>
          </div>
        </StorySection>

        {/* Weekly Assignment Section */}
        <StorySection>
          <div className="text-center mb-8">
            <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
            <h2 className="text-3xl font-display text-gray-800">{t('exercises.dancingFastSlow.weeklyAssignment')}</h2>
          </div>
          
          <AssignmentList
            assignments={weeklyAssignments}
            completedTasks={completedTasks}
            onTaskLevelChange={handleTaskLevelChange}
            keyPrefix="assignment"
          />
        </StorySection>

        {/* Practice Playlist Section */}
        <StorySection title={t('exercises.dancingFastSlow.practiceSongs')}>
          <p className="text-gray-700 text-lg mb-6 text-center">
            {t('exercises.dancingFastSlow.practiceSongsText')}
          </p>
          
          <SpotifyEmbed 
            src="https://open.spotify.com/embed/playlist/1wZ0CPVIgn7Ry41Kmwzh9k?utm_source=generator&theme=0"
            className="rounded-2xl overflow-hidden shadow-2xl mb-8"
          />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-terracotta/20 backdrop-blur-sm rounded-2xl p-6 border border-terracotta/30">
              <h3 className="text-xl font-display text-gray-700 mb-4 text-center">{t('exercises.dancingFastSlow.songs1And2')}</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                <strong>From Canaro Orquestra</strong> - {t('exercises.dancingFastSlow.songs1And2Text')}
              </p>
            </div>
            
            <div className="bg-golden-yellow/20 backdrop-blur-sm rounded-2xl p-6 border border-golden-yellow/30">
              <h3 className="text-xl font-display text-gray-700 mb-4 text-center">{t('exercises.dancingFastSlow.songs3And4')}</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                <strong>From early Di Sarli Orquestra</strong> - {t('exercises.dancingFastSlow.songs3And4Text')}
              </p>
            </div>
            
            <div className="bg-dusty-rose/20 backdrop-blur-sm rounded-2xl p-6 border border-dusty-rose/30">
              <h3 className="text-xl font-display text-gray-700 mb-4 text-center">{t('exercises.dancingFastSlow.songs5And6')}</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                <strong>From Troilo Orquestra</strong> - {t('exercises.dancingFastSlow.songs5And6Text')}
              </p>
            </div>
          </div>
        </StorySection>

        {/* Progress Note Section */}
        <StorySection>
          <p className="text-gray-600 text-lg leading-relaxed text-center italic bg-dusty-rose/20 backdrop-blur-sm rounded-2xl p-8 border border-dusty-rose/30">
            {t('exercises.dancingFastSlow.progressNote')}
          </p>
        </StorySection>

        {/* Daily Assignments Section */}
        <FastAndSlowDaily1to7 />

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
