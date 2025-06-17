
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Checkbox } from '@/components/ui/checkbox';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import LanguageSelector from '@/components/LanguageSelector';
import SimpleRhythmPlayer from '@/components/SimpleRhythmPlayer';
import AudioPlayer from '@/components/AudioPlayer';
import FastAndSlowDaily1to7 from '@/components/FastAndSlowDaily1to7';
import { getWeeklyAssignments } from '@/data/assignments';

const DancingFastSlow = () => {
  const { t } = useTranslation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [rhythmSpeed, setRhythmSpeed] = useState<string>('1');

  const weeklyAssignments = getWeeklyAssignments();

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige">
      {/* Navigation */}
      <div className="relative z-10 p-4 flex justify-between items-center">
        <Link to="/roadmap" className="inline-flex items-center gap-2 text-cream bg-warm-brown/80 px-4 py-2 rounded-full hover:bg-warm-brown transition-all duration-300 shadow-lg backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4" />
          {t('common.backToRoadmap')}
        </Link>
        
        <LanguageSelector />
      </div>

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display text-gray-700 drop-shadow-2xl tracking-wider mb-4">
            {t('exercises.dancingFastSlow.title')}
          </h1>
        </div>

        {/* Introduction Story */}
        <div className="mb-16">
          <p className="text-gray-700 text-xl leading-relaxed mb-6 text-center">
            {t('exercises.dancingFastSlow.introText1')}
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-center">
            {t('exercises.dancingFastSlow.introText2')}
          </p>
        </div>

        {/* Simple Start Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display text-gray-800 mb-8 text-center">{t('exercises.dancingFastSlow.letStartSimple')}</h2>
          
          <p className="text-gray-700 text-lg mb-8 text-center">
            {t('exercises.dancingFastSlow.simpleText1')}
          </p>
          
          <div className="mb-8">
            <AudioPlayer 
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
        </div>

        {/* Three Speeds Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display text-gray-800 mb-8 text-center">{t('exercises.dancingFastSlow.threeSpeeds')}</h2>
          
          <p className="text-gray-700 text-lg mb-8 text-center">{t('exercises.dancingFastSlow.threeSpeedsText')}</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-terracotta/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-terracotta/40">
              <div className="text-4xl font-bold text-gray-700 mb-3">1</div>
              <div className="text-gray-700 text-lg">{t('exercises.dancingFastSlow.halfSpeed')}</div>
            </div>
            <div className="bg-golden-yellow/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-golden-yellow/40">
              <div className="text-4xl font-bold text-gray-700 mb-3">2</div>
              <div className="text-gray-700 text-lg">{t('exercises.dancingFastSlow.normalSpeed')}</div>
            </div>
            <div className="bg-dusty-rose/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-dusty-rose/40">
              <div className="text-4xl font-bold text-gray-700 mb-3">4</div>
              <div className="text-gray-700 text-lg">{t('exercises.dancingFastSlow.doubleSpeed')}</div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-gray-700 text-lg mb-6 text-center">
              {t('exercises.dancingFastSlow.fullSongText')}
            </p>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                style={{borderRadius: '16px'}} 
                src="https://open.spotify.com/embed/track/4FMWYCgSUTyLXCoX3GK8We?utm_source=generator&theme=0" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
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

          <div className="flex items-center gap-4 bg-sage-green/20 backdrop-blur-sm rounded-2xl p-6 border border-sage-green/30">
            <Checkbox 
              id="task-1"
              checked={completedTasks['task-1'] || false}
              onCheckedChange={() => handleTaskComplete('task-1')}
            />
            <label htmlFor="task-1" className="text-gray-700 text-lg font-medium cursor-pointer">
              {t('exercises.dancingFastSlow.practicedWalking')}
            </label>
          </div>
        </div>

        {/* Music Speed Changes Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display text-gray-800 mb-8 text-center">{t('exercises.dancingFastSlow.musicSpeedChanges')}</h2>
          
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
                title={t('exercises.dancingFastSlow.from2To4Beats')}
                audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/mercato_2_to_4_Me_quede_mirandola_widbtv.mp3"
                colorChanges={[
                  { timestamp: 7500, color: 'bg-dusty-rose' }
                ]}
              />
              
              <AudioPlayer 
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
                title={t('exercises.dancingFastSlow.legatoToStaccato')}
                audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/legato_to_Stacatto_Invierno_-_Francisco_Canaro-_gcc7qs.mp3"
                colorChanges={[
                  { timestamp: 6500, color: 'bg-dusty-rose' }
                ]}
              />
              
              <AudioPlayer 
                title={t('exercises.dancingFastSlow.staccatoToLegato')}
                audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/Stacatto_to_legato_Invierno_-_Francisco_Canaro-_ho4nwj.mp3"
                colorChanges={[
                  { timestamp: 6500, color: 'bg-dusty-rose' }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Weekly Assignment Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
            <h2 className="text-3xl font-display text-gray-800">{t('exercises.dancingFastSlow.weeklyAssignment')}</h2>
          </div>
          
          <div className="space-y-6">
            {weeklyAssignments.map((assignment, index) => (
              <div key={index} className="flex items-start gap-4 bg-golden-yellow/20 backdrop-blur-sm rounded-2xl p-6 border border-golden-yellow/30">
                <Checkbox 
                  id={`assignment-${index}`}
                  checked={completedTasks[`assignment-${index}`] || false}
                  onCheckedChange={() => handleTaskComplete(`assignment-${index}`)}
                />
                <label htmlFor={`assignment-${index}`} className="text-gray-700 text-lg cursor-pointer leading-relaxed">
                  {t(assignment.content)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Playlist Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display text-gray-800 mb-8 text-center">{t('exercises.dancingFastSlow.practiceSongs')}</h2>
          
          <p className="text-gray-700 text-lg mb-6 text-center">
            {t('exercises.dancingFastSlow.practiceSongsText')}
          </p>
          
          <div className="rounded-2xl overflow-hidden shadow-2xl mb-8">
            <iframe 
              style={{borderRadius: '12px'}} 
              src="https://open.spotify.com/embed/playlist/1wZ0CPVIgn7Ry41Kmwzh9k?utm_source=generator&theme=0" 
              width="100%" 
              height="352" 
              frameBorder="0" 
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          </div>

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
        </div>

        {/* Progress Note Section */}
        <div className="mb-16">
          <p className="text-gray-600 text-lg leading-relaxed text-center italic bg-dusty-rose/20 backdrop-blur-sm rounded-2xl p-8 border border-dusty-rose/30">
            {t('exercises.dancingFastSlow.progressNote')}
          </p>
        </div>

        {/* Daily Assignments Section */}
        <FastAndSlowDaily1to7 />

        {/* Comment Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-display text-gray-800 mb-6 text-center">{t('exercises.dancingFastSlow.commentsTitle')}</h2>
          <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-12 border border-cream/20">
            <p className="text-gray-500 text-center text-lg">
              {t('exercises.dancingFastSlow.commentsPlaceholder')}
            </p>
          </div>
        </div>

        {/* Review Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-display text-gray-800 mb-6 text-center">{t('exercises.dancingFastSlow.rateTitle')}</h2>
          <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-12 border border-cream/20">
            <p className="text-gray-500 text-center text-lg">
              {t('exercises.dancingFastSlow.ratePlaceholder')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DancingFastSlow;
