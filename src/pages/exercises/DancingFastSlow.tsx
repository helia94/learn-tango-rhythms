
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Music } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Checkbox } from '@/components/ui/checkbox';
import { CircularAudioPlayer } from '@/components/ui/circular-audio-player';
import LanguageSelector from '@/components/LanguageSelector';

const DancingFastSlow = () => {
  const { t } = useTranslation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sandy-beige to-dusty-rose">
      {/* Navigation */}
      <div className="p-6 flex justify-between items-center">
        <Link 
          to="/roadmap" 
          className="inline-flex items-center gap-3 text-warm-brown bg-cream/80 px-6 py-3 rounded-full 
                     hover:bg-cream transition-all duration-300 shadow-lg backdrop-blur-sm
                     border-2 border-warm-brown/20 hover:border-warm-brown/40"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t('common.backToRoadmap')}</span>
        </Link>
        
        <LanguageSelector />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display text-transparent bg-gradient-to-r 
                         from-terracotta via-burnt-orange to-golden-yellow bg-clip-text 
                         drop-shadow-lg tracking-wide mb-6">
            Dancing Fast and Slow
          </h1>
          <div className="flex items-center justify-center gap-3 text-warm-brown/80">
            <Music className="w-6 h-6" />
            <span className="text-xl font-body font-medium">Chapter 1 • Exercise 1 of 7</span>
            <Music className="w-6 h-6" />
          </div>
        </div>

        {/* Story Introduction */}
        <div className="mb-16">
          <h2 className="text-3xl font-display text-warm-brown mb-8 text-center">
            Once Upon a Rhythm
          </h2>
          <div className="bg-cream/60 rounded-2xl p-8 border border-warm-brown/20 shadow-lg mb-8">
            <div className="text-warm-brown text-lg leading-relaxed space-y-4 font-light">
              <p className="italic">
                Most dancers always dance with the same tempo, but forcing yourself to dance at different speeds 
                is one of the easiest ways to add diversity to your tango life.
              </p>
              <p>
                If you are a good beginner, you are most likely dancing always on the down beat 
                <span className="inline-block mx-2 px-3 py-1 bg-golden-yellow/20 rounded-full text-sm font-medium">
                  also known as the strong beat
                </span> 
                This is the speed you are dancing all the songs, almost every second of it.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Audio Story */}
        <div className="mb-16">
          <h3 className="text-2xl font-display text-warm-brown mb-8 text-center">
            Let's start simple
          </h3>
          <div className="bg-sage-green/10 rounded-2xl p-8 border border-sage-green/30 shadow-lg">
            <p className="text-warm-brown mb-8 text-lg font-light text-center">
              That means without a partner. Do the normal walk and step on 1 and 3 in this song.
            </p>
            
            <div className="flex justify-center mb-6">
              <CircularAudioPlayer
                src="https://res.cloudinary.com/dl9xg597r/video/upload/v1749836334/SimpleMercato2-16Sec-CarlosDiSarli-La_vida_me_enga%C3%B1o_oxc9vb.mp3"
                title="Di Sarli - La vida me engañó"
                duration="0:16"
                size={150}
              />
            </div>
            
            <p className="text-warm-brown/70 text-sm italic text-center">
              If you could not find the downbeat, use this simple version instead.
            </p>
          </div>
        </div>

        {/* Three Speeds Story */}
        <div className="mb-16">
          <h3 className="text-3xl font-display text-warm-brown mb-8 text-center">
            Three Magical Speeds
          </h3>
          <div className="bg-deep-teal/10 rounded-2xl p-8 border border-deep-teal/30 shadow-lg">
            <p className="text-warm-brown mb-12 text-lg font-light text-center max-w-2xl mx-auto">
              Ok, now two simple things you can do:
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { speed: '1/2', name: 'Floating', color: 'from-dusty-rose/30 to-sage-green/20', emoji: '🦋' },
                { speed: '1', name: 'Walking', color: 'from-terracotta/30 to-burnt-orange/20', emoji: '🚶' },
                { speed: '2', name: 'Dancing', color: 'from-golden-yellow/30 to-paprika/20', emoji: '💃' }
              ].map((item) => (
                <div 
                  key={item.speed}
                  className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 border border-warm-brown/20 shadow-lg`}
                >
                  <div className="text-4xl mb-2 text-center">{item.emoji}</div>
                  <div className="text-3xl font-bold text-warm-brown mb-2 text-center">{item.speed}</div>
                  <div className="text-warm-brown font-medium text-center">{item.name} Speed</div>
                </div>
              ))}
            </div>

            {/* Spotify Embed */}
            <div className="max-w-md mx-auto mb-8">
              <p className="text-warm-brown mb-4 font-medium text-center">
                Do one full song at all three speeds, just walking on your own:
              </p>
              <iframe 
                style={{borderRadius: '12px'}} 
                src="https://open.spotify.com/embed/track/4FMWYCgSUTyLXCoX3GK8We?utm_source=generator&theme=0" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="shadow-lg rounded-xl"
              />
            </div>

            <div className="flex items-center gap-4 bg-sage-green/20 rounded-2xl p-6 max-w-md mx-auto border border-sage-green/30">
              <Checkbox 
                id="task-1"
                checked={completedTasks['task-1'] || false}
                onCheckedChange={() => handleTaskComplete('task-1')}
                className="scale-125"
              />
              <label htmlFor="task-1" className="text-warm-brown font-medium cursor-pointer flex-1">
                I practiced walking at all three speeds
              </label>
              <CheckCircle className="w-6 h-6 text-sage-green" />
            </div>
          </div>
        </div>

        {/* Music Changes Story */}
        <div className="mb-16">
          <h3 className="text-3xl font-display text-warm-brown mb-8 text-center">
            When Music Tells Stories
          </h3>
          <div className="bg-terracotta/10 rounded-2xl p-8 border border-terracotta/30 shadow-lg">
            <p className="text-warm-brown mb-12 text-lg font-light text-center max-w-3xl mx-auto">
              Now you can move at three speeds, time to also use the music. Two simple ways to use music for a change of speed:
            </p>

            {/* Rhythm Changes */}
            <div className="mb-12">
              <h4 className="text-xl font-semibold text-warm-brown mb-6 text-center">
                When the rhythm changes
              </h4>
              <p className="text-warm-brown mb-8 text-center max-w-2xl mx-auto font-light">
                Sometimes the music changes from playing all beats loud and the same to playing 2 strong beat and 2 weak beats. 
                This is a clear opportunity to adjust your speed.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-dusty-rose/30 rounded-full text-warm-brown font-medium border border-warm-brown/20">
                      From 2 beats to 4 beats
                    </span>
                  </div>
                  <CircularAudioPlayer
                    src="https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/mercato_2_to_4_Me_quede_mirandola_widbtv.mp3"
                    title="Me quedé mirándola"
                    duration="0:30"
                  />
                </div>
                
                <div className="text-center">
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-golden-yellow/30 rounded-full text-warm-brown font-medium border border-warm-brown/20">
                      From 4 beats to 2 beats
                    </span>
                  </div>
                  <CircularAudioPlayer
                    src="https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/mercato4_to_2Me_quede_mirandola_n189ki.mp3"
                    title="Me quedé mirándola"
                    duration="0:30"
                  />
                </div>
              </div>
            </div>

            {/* Melody Changes */}
            <div>
              <h4 className="text-xl font-semibold text-warm-brown mb-6 text-center">
                When the melody changes
              </h4>
              <p className="text-warm-brown mb-8 text-center max-w-2xl mx-auto font-light">
                Old tango songs mostly have a fixed beat system all the time, so a good option is to change it according to the melody. 
                <span className="inline-block mx-2 px-3 py-1 bg-sage-green/20 rounded-full text-sm">Legato (melody that sounds like singing)</span> 
                for slower speed and 
                <span className="inline-block mx-2 px-3 py-1 bg-terracotta/20 rounded-full text-sm">Staccato (rhythmic melody)</span> 
                for higher speed.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-sage-green/30 rounded-full text-warm-brown font-medium border border-warm-brown/20">
                      From Legato to Staccato
                    </span>
                  </div>
                  <CircularAudioPlayer
                    src="https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/legato_to_Stacatto_Invierno_-_Francisco_Canaro-_gcc7qs.mp3"
                    title="Invierno - Francisco Canaro"
                    duration="0:45"
                  />
                </div>
                
                <div className="text-center">
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-terracotta/30 rounded-full text-warm-brown font-medium border border-warm-brown/20">
                      From Staccato to Legato
                    </span>
                  </div>
                  <CircularAudioPlayer
                    src="https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/Stacatto_to_legato_Invierno_-_Francisco_Canaro-_ho4nwj.mp3"
                    title="Invierno - Francisco Canaro"
                    duration="0:45"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Assignment */}
        <div className="mb-16">
          <h3 className="text-3xl font-display text-warm-brown mb-8 text-center">
            Your Weekly Adventure
          </h3>
          <div className="bg-cream/60 rounded-2xl p-8 border border-warm-brown/20 shadow-lg">
            <div className="space-y-6">
              {[
                "Walk alone at speeds 1, 2, and 4, without music, just counting, or use the rhythm lab in the app.",
                "Walk alone with music.",
                "When dancing in milonga or practice, listen to the change in rhythm from 2 to 4 and back, and try to use a different speed.",
                "When dancing in milonga or practice, listen to the change in melody from legato to staccato and back, and try to use a different speed."
              ].map((assignment, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 bg-sandy-beige/40 rounded-2xl p-6 border border-warm-brown/20 shadow-md"
                >
                  <Checkbox 
                    id={`assignment-${index}`}
                    checked={completedTasks[`assignment-${index}`] || false}
                    onCheckedChange={() => handleTaskComplete(`assignment-${index}`)}
                    className="scale-125 mt-1"
                  />
                  <label htmlFor={`assignment-${index}`} className="text-warm-brown cursor-pointer leading-relaxed flex-1 font-light">
                    {assignment}
                  </label>
                  <div className="text-2xl opacity-60">
                    {['🎯', '🎵', '💫', '✨'][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Epilogue */}
        <div className="text-center">
          <div className="bg-deep-teal/10 rounded-2xl p-8 border border-deep-teal/30 shadow-lg">
            <div className="text-6xl mb-6">📖</div>
            <p className="text-warm-brown leading-relaxed text-lg italic max-w-2xl mx-auto font-light">
              At the end of the week, you will be asked how many times you did each assignment. 
              The goal of 5min tango is three things: repeat, repeat, and repeat. 
              More ideas and assignments will unfold on the same topic during the week.
            </p>
            <div className="mt-8 text-sm text-warm-brown/60">
              ✦ End of Chapter 1 ✦
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DancingFastSlow;
