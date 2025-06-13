
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Music, Star, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { CircularAudioPlayer } from '@/components/ui/circular-audio-player';
import { StorySection } from '@/components/ui/story-section';
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
    <div className="min-h-screen bg-gradient-to-br from-cream via-sandy-beige to-dusty-rose relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-golden-yellow/10 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-20 h-20 bg-terracotta/15 rounded-full animate-bounce" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-sage-green/10 rounded-full animate-pulse"
             style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-40 w-16 h-16 bg-dusty-rose/20 rounded-full animate-bounce"
             style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Navigation */}
      <div className="relative z-20 p-6 flex justify-between items-center">
        <Link 
          to="/roadmap" 
          className="group inline-flex items-center gap-3 text-warm-brown bg-cream/80 px-6 py-3 rounded-full 
                     hover:bg-cream hover:scale-105 transition-all duration-300 shadow-xl backdrop-blur-sm
                     border-2 border-warm-brown/20 hover:border-warm-brown/40"
        >
          <ArrowLeft className="w-5 h-5 group-hover:animate-bounce" />
          <span className="font-medium">{t('common.backToRoadmap')}</span>
        </Link>
        
        <LanguageSelector />
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 pb-12 relative z-10">
        {/* Magical Title */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-display text-transparent bg-gradient-to-r 
                           from-terracotta via-burnt-orange to-golden-yellow bg-clip-text 
                           drop-shadow-2xl tracking-wider mb-6 animate-scale-in">
              Dancing Fast and Slow
            </h1>
            <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-golden-yellow animate-spin" 
                     style={{ animationDuration: '3s' }} />
            <Star className="absolute -bottom-2 -left-6 w-6 h-6 text-terracotta animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-3 text-warm-brown/80 animate-slide-in-right"
               style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <Music className="w-6 h-6 animate-bounce" />
            <span className="text-xl font-body font-medium">Chapter 1 • Exercise 1 of 7</span>
            <Music className="w-6 h-6 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>

        {/* Story Introduction */}
        <StorySection variant="floating" delay={200}>
          <div className="text-center">
            <h2 className="text-3xl font-display text-warm-brown mb-6 flex items-center justify-center gap-3">
              <span className="w-2 h-2 bg-terracotta rounded-full animate-pulse" />
              Once Upon a Rhythm
              <span className="w-2 h-2 bg-golden-yellow rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </h2>
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
        </StorySection>

        {/* Interactive Audio Story */}
        <StorySection variant="flowing" delay={400}>
          <div className="text-center">
            <h3 className="text-2xl font-display text-warm-brown mb-8 flex items-center justify-center gap-2">
              <span className="text-sage-green">✦</span>
              Let's start simple
              <span className="text-terracotta">✦</span>
            </h3>
            <p className="text-warm-brown mb-8 text-lg font-light">
              That means without a partner. Do the normal walk and step on 1 and 3 in this song.
            </p>
            
            <div className="flex justify-center">
              <CircularAudioPlayer
                src="https://res.cloudinary.com/dl9xg597r/video/upload/v1749836334/SimpleMercato2-16Sec-CarlosDiSarli-La_vida_me_enga%C3%B1o_oxc9vb.mp3"
                title="Di Sarli - La vida me engañó"
                duration="0:16"
                size={150}
              />
            </div>
            
            <p className="text-warm-brown/70 text-sm italic mt-6 max-w-md mx-auto">
              If you could not find the downbeat, use this simple version instead.
            </p>
          </div>
        </StorySection>

        {/* Three Speeds Story */}
        <StorySection variant="mystical" delay={600}>
          <div className="text-center">
            <h3 className="text-3xl font-display text-warm-brown mb-8 flex items-center justify-center gap-3">
              <span className="text-2xl">🎭</span>
              Three Magical Speeds
              <span className="text-2xl">🎭</span>
            </h3>
            <p className="text-warm-brown mb-12 text-lg font-light max-w-2xl mx-auto">
              Ok, now two simple things you can do:
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { speed: '1/2', name: 'Floating', color: 'from-dusty-rose/30 to-sage-green/20', emoji: '🦋' },
                { speed: '1', name: 'Walking', color: 'from-terracotta/30 to-burnt-orange/20', emoji: '🚶' },
                { speed: '2', name: 'Dancing', color: 'from-golden-yellow/30 to-paprika/20', emoji: '💃' }
              ].map((item, index) => (
                <div 
                  key={item.speed}
                  className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 transform hover:scale-105 
                             transition-all duration-300 border border-warm-brown/20 shadow-lg hover:shadow-xl
                             animate-fade-in hover:rotate-1`}
                  style={{ 
                    animationDelay: `${800 + index * 200}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <div className="text-3xl font-bold text-warm-brown mb-2">{item.speed}</div>
                  <div className="text-warm-brown font-medium">{item.name} Speed</div>
                </div>
              ))}
            </div>

            {/* Spotify Embed with decorative frame */}
            <div className="relative max-w-md mx-auto mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-golden-yellow/20 to-terracotta/20 rounded-3xl blur-xl" />
              <div className="relative bg-cream/90 rounded-2xl p-4 border-2 border-warm-brown/20 shadow-xl">
                <p className="text-warm-brown mb-4 font-medium">
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
            </div>

            <div className="flex items-center gap-4 bg-gradient-to-r from-sage-green/20 to-dusty-rose/20 
                           rounded-2xl p-6 max-w-md mx-auto border border-sage-green/30">
              <Checkbox 
                id="task-1"
                checked={completedTasks['task-1'] || false}
                onCheckedChange={() => handleTaskComplete('task-1')}
                className="scale-125"
              />
              <label htmlFor="task-1" className="text-warm-brown font-medium cursor-pointer flex-1">
                I practiced walking at all three speeds
              </label>
              <CheckCircle className="w-6 h-6 text-sage-green animate-pulse" />
            </div>
          </div>
        </StorySection>

        {/* Music Changes Story */}
        <StorySection variant="warm" delay={800}>
          <div>
            <h3 className="text-3xl font-display text-warm-brown mb-8 text-center flex items-center justify-center gap-3">
              <span className="text-2xl">🎵</span>
              When Music Tells Stories
              <span className="text-2xl">🎵</span>
            </h3>
            <p className="text-warm-brown mb-12 text-lg font-light text-center max-w-3xl mx-auto">
              Now you can move at three speeds, time to also use the music. Two simple ways to use music for a change of speed:
            </p>

            {/* Rhythm Changes */}
            <div className="mb-12">
              <h4 className="text-xl font-semibold text-warm-brown mb-6 flex items-center justify-center gap-2">
                <span className="w-3 h-3 bg-terracotta rounded-full animate-bounce" />
                When the rhythm changes
                <span className="w-3 h-3 bg-golden-yellow rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              </h4>
              <p className="text-warm-brown mb-8 text-center max-w-2xl mx-auto font-light">
                Sometimes the music changes from playing all beats loud and the same to playing 2 strong beat and 2 weak beats. 
                This is a clear opportunity to adjust your speed.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-dusty-rose/30 to-sage-green/20 
                                   rounded-full text-warm-brown font-medium border border-warm-brown/20">
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
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-golden-yellow/30 to-terracotta/20 
                                   rounded-full text-warm-brown font-medium border border-warm-brown/20">
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
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-warm-brown mb-6 flex items-center justify-center gap-2">
                <span className="w-3 h-3 bg-sage-green rounded-full animate-bounce" />
                When the melody changes
                <span className="w-3 h-3 bg-dusty-rose rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
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
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-sage-green/30 to-deep-teal/20 
                                   rounded-full text-warm-brown font-medium border border-warm-brown/20">
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
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-terracotta/30 to-paprika/20 
                                   rounded-full text-warm-brown font-medium border border-warm-brown/20">
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
        </StorySection>

        {/* Weekly Assignment Story */}
        <StorySection variant="floating" delay={1000}>
          <div className="text-center">
            <h3 className="text-3xl font-display text-warm-brown mb-8 flex items-center justify-center gap-3">
              <CheckCircle className="w-8 h-8 text-sage-green animate-pulse" />
              Your Weekly Adventure
              <Star className="w-8 h-8 text-golden-yellow animate-spin" style={{ animationDuration: '3s' }} />
            </h3>
            <div className="space-y-6">
              {[
                "Walk alone at speeds 1, 2, and 4, without music, just counting, or use the rhythm lab in the app.",
                "Walk alone with music.",
                "When dancing in milonga or practice, listen to the change in rhythm from 2 to 4 and back, and try to use a different speed.",
                "When dancing in milonga or practice, listen to the change in melody from legato to staccato and back, and try to use a different speed."
              ].map((assignment, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 bg-gradient-to-r from-cream/60 to-sandy-beige/40 
                           rounded-2xl p-6 border border-warm-brown/20 shadow-lg hover:shadow-xl
                           transition-all duration-300 hover:scale-102 animate-fade-in"
                  style={{ 
                    animationDelay: `${1200 + index * 150}ms`,
                    animationFillMode: 'both'
                  }}
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
        </StorySection>

        {/* Epilogue */}
        <StorySection variant="mystical" delay={1200}>
          <div className="text-center">
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
        </StorySection>

        {/* Coming Soon Sections */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <StorySection variant="flowing" delay={1400}>
            <div className="text-center py-12">
              <div className="text-4xl mb-4">💬</div>
              <h4 className="text-xl font-display text-warm-brown mb-4">Community Stories</h4>
              <p className="text-warm-brown/60">
                Share your dance discoveries with fellow adventurers...
              </p>
            </div>
          </StorySection>

          <StorySection variant="warm" delay={1600}>
            <div className="text-center py-12">
              <div className="text-4xl mb-4">⭐</div>
              <h4 className="text-xl font-display text-warm-brown mb-4">Rate this Chapter</h4>
              <p className="text-warm-brown/60">
                Tell us how this story touched your dance journey...
              </p>
            </div>
          </StorySection>
        </div>
      </div>
    </div>
  );
};

export default DancingFastSlow;
