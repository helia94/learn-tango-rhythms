
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Music, Play, Pause } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/LanguageSelector';

const DancingFastSlow = () => {
  const { t } = useTranslation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const playAudio = (audioId: string, url: string) => {
    if (currentlyPlaying === audioId) {
      setCurrentlyPlaying(null);
      // In a real implementation, you'd pause the audio here
    } else {
      setCurrentlyPlaying(audioId);
      // In a real implementation, you'd play the audio here
      console.log(`Playing audio: ${url}`);
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-display text-cream drop-shadow-2xl tracking-wider mb-4">
            Dancing Fast and Slow
          </h1>
          <div className="flex items-center justify-center gap-2 text-golden-yellow">
            <Music className="w-6 h-6" />
            <span className="text-lg font-body">Exercise 1 of 7</span>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-8 bg-cream/95 border-warm-brown shadow-xl">
          <CardContent className="p-6">
            <p className="text-warm-brown text-lg leading-relaxed mb-4">
              Most dancers always dance with the same tempo, but forcing yourself to dance at different speeds is one of the easiest ways to add diversity to your tango life.
            </p>
            <p className="text-warm-brown leading-relaxed">
              If you are a good beginner, you are most likely dancing always on the down beat [also known as the strong beat] [numbers 1 and 3 if we count to 4]. This is the speed you are dancing all the songs, almost every second of it.
            </p>
          </CardContent>
        </Card>

        {/* Audio Example */}
        <Card className="mb-8 bg-cream/95 border-warm-brown shadow-xl">
          <CardHeader>
            <CardTitle className="text-warm-brown text-xl">Let's start simple</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-warm-brown mb-4">
              That means without a partner. Do the normal walk and step on 1 and 3 in this song.
            </p>
            
            <div className="bg-sandy-beige rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-warm-brown">Di Sarli - 16 seconds</span>
                <Button
                  onClick={() => playAudio('disarli-16', 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749836334/SimpleMercato2-16Sec-CarlosDiSarli-La_vida_me_enga%C3%B1o_oxc9vb.mp3')}
                  variant="outline"
                  size="sm"
                  className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-cream"
                >
                  {currentlyPlaying === 'disarli-16' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
              <div className="w-full bg-warm-brown/20 rounded-full h-2">
                <div className="bg-warm-brown h-2 rounded-full w-0 transition-all duration-300"></div>
              </div>
            </div>

            <p className="text-warm-brown text-sm italic">
              If you could not find the downbeat, use this simple version instead.
            </p>
          </CardContent>
        </Card>

        {/* Three Speeds */}
        <Card className="mb-8 bg-cream/95 border-warm-brown shadow-xl">
          <CardHeader>
            <CardTitle className="text-warm-brown text-xl">Three Simple Speeds</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-warm-brown mb-6">Ok, now two simple things you can do:</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-golden-yellow/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-warm-brown mb-2">1/2</div>
                <div className="text-warm-brown">Half Speed</div>
              </div>
              <div className="bg-terracotta/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-warm-brown mb-2">1</div>
                <div className="text-warm-brown">Normal Speed</div>
              </div>
              <div className="bg-dusty-rose/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-warm-brown mb-2">2</div>
                <div className="text-warm-brown">Double Speed</div>
              </div>
            </div>

            {/* Spotify Embed */}
            <div className="mb-6">
              <p className="text-warm-brown mb-4">
                Do one full song at all three speeds, just walking on your own. Here is a song to do it:
              </p>
              <iframe 
                style={{borderRadius: '12px'}} 
                src="https://open.spotify.com/embed/track/4FMWYCgSUTyLXCoX3GK8We?utm_source=generator&theme=0" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="shadow-lg"
              />
            </div>

            <div className="flex items-center gap-3 bg-sage-green/20 rounded-lg p-4">
              <Checkbox 
                id="task-1"
                checked={completedTasks['task-1'] || false}
                onCheckedChange={() => handleTaskComplete('task-1')}
              />
              <label htmlFor="task-1" className="text-warm-brown font-medium cursor-pointer">
                I practiced walking at all three speeds
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Using Music for Speed Changes */}
        <Card className="mb-8 bg-cream/95 border-warm-brown shadow-xl">
          <CardHeader>
            <CardTitle className="text-warm-brown text-xl">Using Music for Speed Changes</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-warm-brown mb-6">
              Ok, now you can move at three speeds, time to also use the music. Two simple ways to use music for a change of speed:
            </p>

            {/* Rhythm Changes */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-warm-brown mb-4">When the rhythm changes</h3>
              <p className="text-warm-brown mb-4">
                Sometimes the music changes from playing all beats loud and the same to playing 2 strong beat and 2 weak beats. This is a clear opportunity to adjust your speed.
              </p>
              
              <div className="space-y-4">
                <div className="bg-sandy-beige rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-warm-brown">From 2 beats to 4 beats</span>
                    <Button
                      onClick={() => playAudio('2to4', 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/mercato_2_to_4_Me_quede_mirandola_widbtv.mp3')}
                      variant="outline"
                      size="sm"
                      className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-cream"
                    >
                      {currentlyPlaying === '2to4' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-sandy-beige rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-warm-brown">From 4 beats to 2 beats</span>
                    <Button
                      onClick={() => playAudio('4to2', 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/mercato4_to_2Me_quede_mirandola_n189ki.mp3')}
                      variant="outline"
                      size="sm"
                      className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-cream"
                    >
                      {currentlyPlaying === '4to2' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Melody Changes */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-warm-brown mb-4">When the melody changes</h3>
              <p className="text-warm-brown mb-4">
                Old tango songs mostly have a fixed beat system all the time, so a good option is to change it according to the melody. Legato (melody that sounds like singing) for slower speed and Staccato (rhythmic melody) for higher speed.
              </p>
              
              <div className="space-y-4">
                <div className="bg-sandy-beige rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-warm-brown">From Legato to Staccato</span>
                    <Button
                      onClick={() => playAudio('legato-staccato', 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/legato_to_Stacatto_Invierno_-_Francisco_Canaro-_gcc7qs.mp3')}
                      variant="outline"
                      size="sm"
                      className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-cream"
                    >
                      {currentlyPlaying === 'legato-staccato' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-sandy-beige rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-warm-brown">From Staccato to Legato</span>
                    <Button
                      onClick={() => playAudio('staccato-legato', 'https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/Stacatto_to_legato_Invierno_-_Francisco_Canaro-_ho4nwj.mp3')}
                      variant="outline"
                      size="sm"
                      className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-cream"
                    >
                      {currentlyPlaying === 'staccato-legato' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Assignment */}
        <Card className="mb-8 bg-gradient-to-r from-golden-yellow/20 to-terracotta/20 border-warm-brown shadow-xl">
          <CardHeader>
            <CardTitle className="text-warm-brown text-xl flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-sage-green" />
              Assignment for the Week
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                "Walk alone at speeds 1, 2, and 4, without music, just counting, or use the rhythm lab in the app.",
                "Walk alone with music.",
                "When dancing in milonga or practice, listen to the change in rhythm from 2 to 4 and back, and try to use a different speed.",
                "When dancing in milonga or practice, listen to the change in melody from legato to staccato and back, and try to use a different speed."
              ].map((assignment, index) => (
                <div key={index} className="flex items-start gap-3 bg-cream/60 rounded-lg p-4">
                  <Checkbox 
                    id={`assignment-${index}`}
                    checked={completedTasks[`assignment-${index}`] || false}
                    onCheckedChange={() => handleTaskComplete(`assignment-${index}`)}
                  />
                  <label htmlFor={`assignment-${index}`} className="text-warm-brown cursor-pointer leading-relaxed">
                    {assignment}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Note */}
        <Card className="mb-8 bg-dusty-rose/20 border-warm-brown shadow-xl">
          <CardContent className="p-6">
            <p className="text-warm-brown leading-relaxed text-center italic">
              At the end of the week, you will be asked how many times you did each assignment. The goal of 5min tango is three things: repeat, repeat, and repeat. More ideas and assignments will unfold on the same topic during the week.
            </p>
          </CardContent>
        </Card>

        {/* Comment Section Placeholder */}
        <Card className="mb-8 bg-cream/95 border-warm-brown shadow-xl">
          <CardHeader>
            <CardTitle className="text-warm-brown text-xl">Comments & Discussion</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-warm-brown/60 text-center py-8">
              Comment section coming soon...
            </p>
          </CardContent>
        </Card>

        {/* Review Section Placeholder */}
        <Card className="bg-cream/95 border-warm-brown shadow-xl">
          <CardHeader>
            <CardTitle className="text-warm-brown text-xl">Rate this Exercise</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-warm-brown/60 text-center py-8">
              Review system coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DancingFastSlow;
