import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Music, Play, Pause } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import LanguageSelector from '@/components/LanguageSelector';
import SimpleRhythmPlayer from '@/components/SimpleRhythmPlayer';

const DancingFastSlow = () => {
  const { t } = useTranslation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [rhythmSpeed, setRhythmSpeed] = useState<string>('1');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const playAudio = (audioId: string, url: string) => {
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (currentlyPlaying === audioId) {
      setCurrentlyPlaying(null);
      return;
    }

    // Create new audio element
    const audio = new Audio(url);
    audioRef.current = audio;
    
    audio.onloadstart = () => {
      console.log(`Loading audio: ${url}`);
    };
    
    audio.oncanplay = () => {
      console.log(`Audio ready to play: ${url}`);
    };
    
    audio.onplay = () => {
      console.log(`Audio started playing: ${url}`);
      setCurrentlyPlaying(audioId);
    };
    
    audio.onpause = () => {
      console.log(`Audio paused: ${url}`);
      setCurrentlyPlaying(null);
    };
    
    audio.onended = () => {
      console.log(`Audio ended: ${url}`);
      setCurrentlyPlaying(null);
    };
    
    audio.onerror = (e) => {
      console.error(`Audio error for ${url}:`, e);
      setCurrentlyPlaying(null);
    };

    // Play the audio
    audio.play().catch(error => {
      console.error(`Failed to play audio ${url}:`, error);
      setCurrentlyPlaying(null);
    });
  };

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const getRhythmPattern = (speed: string) => {
    switch (speed) {
      case '1': return [true, false, false, false]; // Beat 1 only
      case '2': return [true, false, true, false];  // Beats 1 and 3
      case '4': return [true, true, true, true];    // All beats
      default: return [true, false, true, false];
    }
  };

  const getSpeedLevel = (speed: string) => {
    switch (speed) {
      case '1': return 0; // SLOW
      case '2': return 1; // MID
      case '4': return 2; // FAST
      default: return 1;
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
          <h1 className="text-4xl md:text-6xl font-display text-cream drop-shadow-2xl tracking-wider mb-4">
            Dancing Fast and Slow
          </h1>
          <div className="flex items-center justify-center gap-2 text-golden-yellow">
            <Music className="w-6 h-6" />
            <span className="text-lg font-body">Exercise 1 of 7</span>
          </div>
        </div>

        {/* Introduction Story */}
        <div className="mb-16">
          <p className="text-cream text-xl leading-relaxed mb-6 text-center">
            Most dancers always dance with the same tempo, but forcing yourself to dance at different speeds is one of the easiest ways to add diversity to your tango life.
          </p>
          <p className="text-cream/90 text-lg leading-relaxed text-center">
            If you are a good beginner, you are most likely dancing always on the down beat [also known as the strong beat] [numbers 1 and 3 if we count to 4]. This is the speed you are dancing all the songs, almost every second of it.
          </p>
        </div>

        {/* Simple Start Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display text-golden-yellow mb-8 text-center">Let's start simple</h2>
          
          <p className="text-cream text-lg mb-8 text-center">
            That means without a partner. Do the normal walk and step on 1 and 3 in this song.
          </p>
          
          <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-cream/20">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-cream text-lg">Di Sarli - 16 seconds</span>
              <Button
                onClick={() => playAudio('disarli-16', 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749836334/SimpleMercato2-16Sec-CarlosDiSarli-La_vida_me_enga%C3%B1o_oxc9vb.mp3')}
                className="bg-golden-yellow/80 hover:bg-golden-yellow text-warm-brown border-none"
                size="sm"
              >
                {currentlyPlaying === 'disarli-16' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            </div>
            <div className="w-full bg-cream/20 rounded-full h-3">
              <div className="bg-golden-yellow h-3 rounded-full w-0 transition-all duration-300"></div>
            </div>
          </div>

          <p className="text-cream/80 text-center italic mb-8">
            If you could not find the downbeat, use this simple version instead.
          </p>

          {/* Simple Rhythm Player */}
          <div className="mb-8">
            <SimpleRhythmPlayer 
              pattern={[true, false, true, false]} 
              label="Mercato 2 - Practice Rhythm"
            />
          </div>
        </div>

        {/* Three Speeds Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display text-golden-yellow mb-8 text-center">Three Simple Speeds</h2>
          
          <p className="text-cream text-lg mb-8 text-center">Ok, now two simple things you can do:</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-terracotta/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-terracotta/40">
              <div className="text-4xl font-bold text-cream mb-3">1/2</div>
              <div className="text-cream text-lg">Half Speed</div>
            </div>
            <div className="bg-golden-yellow/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-golden-yellow/40">
              <div className="text-4xl font-bold text-cream mb-3">1</div>
              <div className="text-cream text-lg">Normal Speed</div>
            </div>
            <div className="bg-dusty-rose/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-dusty-rose/40">
              <div className="text-4xl font-bold text-cream mb-3">2</div>
              <div className="text-cream text-lg">Double Speed</div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-cream text-lg mb-6 text-center">
              Do one full song at all three speeds, just walking on your own. Here is a song to do it:
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
              <h3 className="text-xl font-display text-cream mb-4 text-center">Practice with Interactive Rhythm</h3>
              
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
                    className="data-[state=on]:bg-terracotta data-[state=on]:text-cream text-cream/70 hover:text-cream"
                  >
                    Speed 1
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="2" 
                    className="data-[state=on]:bg-golden-yellow data-[state=on]:text-warm-brown text-cream/70 hover:text-cream"
                  >
                    Speed 2
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="4" 
                    className="data-[state=on]:bg-dusty-rose data-[state=on]:text-cream text-cream/70 hover:text-cream"
                  >
                    Speed 4
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Rhythm Player */}
              <SimpleRhythmPlayer 
                pattern={getRhythmPattern(rhythmSpeed)} 
                label={`Practice Rhythm - Speed ${rhythmSpeed}`}
                speedLevel={getSpeedLevel(rhythmSpeed)}
              />
              
              <p className="text-cream/70 text-sm text-center mt-4">
                Toggle between different speeds to practice walking at various tempos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-sage-green/20 backdrop-blur-sm rounded-2xl p-6 border border-sage-green/30">
            <Checkbox 
              id="task-1"
              checked={completedTasks['task-1'] || false}
              onCheckedChange={() => handleTaskComplete('task-1')}
            />
            <label htmlFor="task-1" className="text-cream text-lg font-medium cursor-pointer">
              I practiced walking at all three speeds
            </label>
          </div>
        </div>

        {/* Music Speed Changes Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display text-golden-yellow mb-8 text-center">Using Music for Speed Changes</h2>
          
          <p className="text-cream text-lg mb-12 text-center">
            Ok, now you can move at three speeds, time to also use the music. Two simple ways to use music for a change of speed:
          </p>

          {/* Rhythm Changes */}
          <div className="mb-12">
            <h3 className="text-2xl font-display text-dusty-rose mb-6 text-center">When the rhythm changes</h3>
            <p className="text-cream/90 mb-8 text-center leading-relaxed">
              Sometimes the music changes from playing all beats loud and the same to playing 2 strong beat and 2 weak beats. This is a clear opportunity to adjust your speed.
            </p>
            
            <div className="space-y-4">
              <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-6 border border-cream/20">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-cream text-lg">From 2 beats to 4 beats</span>
                  <Button
                    onClick={() => playAudio('2to4', 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/mercato_2_to_4_Me_quede_mirandola_widbtv.mp3')}
                    className="bg-terracotta/80 hover:bg-terracotta text-cream border-none"
                    size="sm"
                  >
                    {currentlyPlaying === '2to4' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-6 border border-cream/20">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-cream text-lg">From 4 beats to 2 beats</span>
                  <Button
                    onClick={() => playAudio('4to2', 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/mercato4_to_2Me_quede_mirandola_n189ki.mp3')}
                    className="bg-terracotta/80 hover:bg-terracotta text-cream border-none"
                    size="sm"
                  >
                    {currentlyPlaying === '4to2' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Melody Changes */}
          <div className="mb-12">
            <h3 className="text-2xl font-display text-dusty-rose mb-6 text-center">When the melody changes</h3>
            <p className="text-cream/90 mb-8 text-center leading-relaxed">
              Old tango songs mostly have a fixed beat system all the time, so a good option is to change it according to the melody. Legato (melody that sounds like singing) for slower speed and Staccato (rhythmic melody) for higher speed.
            </p>
            
            <div className="space-y-4">
              <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-6 border border-cream/20">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-cream text-lg">From Legato to Staccato</span>
                  <Button
                    onClick={() => playAudio('legato-staccato', 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/legato_to_Stacatto_Invierno_-_Francisco_Canaro-_gcc7qs.mp3')}
                    className="bg-sage-green/80 hover:bg-sage-green text-cream border-none"
                    size="sm"
                  >
                    {currentlyPlaying === 'legato-staccato' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-6 border border-cream/20">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-cream text-lg">From Staccato to Legato</span>
                  <Button
                    onClick={() => playAudio('staccato-legato', 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/Stacatto_to_legato_Invierno_-_Francisco_Canaro-_ho4nwj.mp3')}
                    className="bg-sage-green/80 hover:bg-sage-green text-cream border-none"
                    size="sm"
                  >
                    {currentlyPlaying === 'staccato-legato' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Assignment Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
            <h2 className="text-3xl font-display text-golden-yellow">Assignment for the Week</h2>
          </div>
          
          <div className="space-y-6">
            {[
              "Walk alone at speeds 1, 2, and 4, without music, just counting, or use the rhythm lab in the app.",
              "Walk alone with music.",
              "When dancing in milonga or practice, listen to the change in rhythm from 2 to 4 and back, and try to use a different speed.",
              "When dancing in milonga or practice, listen to the change in melody from legato to staccato and back, and try to use a different speed."
            ].map((assignment, index) => (
              <div key={index} className="flex items-start gap-4 bg-golden-yellow/20 backdrop-blur-sm rounded-2xl p-6 border border-golden-yellow/30">
                <Checkbox 
                  id={`assignment-${index}`}
                  checked={completedTasks[`assignment-${index}`] || false}
                  onCheckedChange={() => handleTaskComplete(`assignment-${index}`)}
                />
                <label htmlFor={`assignment-${index}`} className="text-cream text-lg cursor-pointer leading-relaxed">
                  {assignment}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Note Section */}
        <div className="mb-16">
          <p className="text-cream/90 text-lg leading-relaxed text-center italic bg-dusty-rose/20 backdrop-blur-sm rounded-2xl p-8 border border-dusty-rose/30">
            At the end of the week, you will be asked how many times you did each assignment. The goal of 5min tango is three things: repeat, repeat, and repeat. More ideas and assignments will unfold on the same topic during the week.
          </p>
        </div>

        {/* Comment Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-display text-golden-yellow mb-6 text-center">Comments & Discussion</h2>
          <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-12 border border-cream/20">
            <p className="text-cream/60 text-center text-lg">
              Comment section coming soon...
            </p>
          </div>
        </div>

        {/* Review Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-display text-golden-yellow mb-6 text-center">Rate this Exercise</h2>
          <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-12 border border-cream/20">
            <p className="text-cream/60 text-center text-lg">
              Review system coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DancingFastSlow;
