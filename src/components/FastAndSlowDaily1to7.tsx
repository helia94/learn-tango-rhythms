
import React, { useState } from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import AudioPlayer from '@/components/AudioPlayer';

const FastAndSlowDaily1to7 = () => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  
  // Simulate user progress (0-7 days unlocked)
  const daysUnlocked = 3; // This would come from user's actual progress later

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const getDayStatus = (dayNumber: number) => {
    if (dayNumber <= daysUnlocked) {
      return 'unlocked';
    } else if (dayNumber === daysUnlocked + 1) {
      return 'tomorrow';
    } else {
      return 'locked';
    }
  };

  const renderDayContent = (dayNumber: number) => {
    const status = getDayStatus(dayNumber);
    
    if (status === 'tomorrow') {
      return (
        <div className="flex items-center justify-center p-8 text-gray-600">
          <div className="text-center">
            <Lock className="w-8 h-8 mx-auto mb-3 text-golden-yellow" />
            <p className="text-lg">You can unlock this tomorrow</p>
          </div>
        </div>
      );
    }

    if (status === 'locked') {
      return (
        <div className="flex items-center justify-center p-8 text-gray-500">
          <div className="text-center">
            <Lock className="w-8 h-8 mx-auto mb-3" />
            <p className="text-lg">Locked</p>
          </div>
        </div>
      );
    }

    // Day 1 content
    if (dayNumber === 1) {
      return (
        <div className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            Make a fixed plan to change your speed every 8 beats. For example, 4,1,2,4 or 2,1,4,1 or whatever you wish, just plan in your head and then dance it. If you do it on your own choose older tango music, if you do it in a milonga do it when music is more monotonous, this way all four speed fit well to all part of the music. Make your change is very clear, and at the end of the phrase.
          </p>
          
          <div>
            <p className="text-gray-600 mb-4 text-center">Here is an example with 4 sections:</p>
            <AudioPlayer 
              title="Alma del Bandoneon - Francisco Canaro (30 sec)"
              audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750080593/ALMA_DEL_BANDONEON_ORQUESTA_TIPICA_FRANCISCO_CANARO-30_sec_nrc3lj.mp3"
              colorChanges={[
                { timestamp: 7000, color: 'bg-dusty-rose' },
                { timestamp: 15000, color: 'bg-golden-yellow' },
                { timestamp: 23500, color: 'bg-terracotta' }
              ]}
            />
          </div>

          <div>
            <p className="text-gray-600 mb-4 text-center">Full song:</p>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                style={{borderRadius: '12px'}} 
                src="https://open.spotify.com/embed/track/1WhutMc7bnEoTMdfvCyXit?utm_source=generator" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 bg-sage-green/20 backdrop-blur-sm rounded-2xl p-6 border border-sage-green/30">
            <Checkbox 
              id="day-1-task"
              checked={completedTasks['day-1-task'] || false}
              onCheckedChange={() => handleTaskComplete('day-1-task')}
            />
            <label htmlFor="day-1-task" className="text-gray-700 text-lg font-medium cursor-pointer">
              I practiced fixed speed changes every 8 beats
            </label>
          </div>
        </div>
      );
    }

    // Day 2 content
    if (dayNumber === 2) {
      return (
        <div className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            Identify solo pieces and slow down on them. Soft solos from singer, violin and Bandonion are a good chance to reduce your speed. A solo in tango is when only one instrument is playing the main melody, there could be still a soft contra bass or piano playing the beat.
          </p>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            There are two tango orchestras who very often have a Solo section in their songs. Let's listen to two bandonion and two violin solos, and finally a singer solo to familiarize the ears, then we can also find them when dancing in the milongas.
          </p>

          <div className="space-y-4">
            <h4 className="text-xl font-display text-gray-700 text-center mb-4">Bandonion Solos</h4>
            
            <AudioPlayer 
              title="El Africano - Aníbal Troilo (Bandonion Solo)"
              audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750083505/SOLO-El_africano-Troilo_jramon.mp3"
            />
            
            <AudioPlayer 
              title="La Tablada - Aníbal Troilo (Bandonion Solo)"
              audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750083505/SOLO_La_Tablada_-_An%C3%ADbal_Troilo_pugych.mp3"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-display text-gray-700 text-center mb-4">Violin Solos</h4>
            
            <AudioPlayer 
              title="Tierra Querida - Osvaldo Pugliese (Violin Solo)"
              audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750083505/SOLO_Tierra_Querida_-_Osvaldo_Pugliese_ccg0ce.mp3"
            />
            
            <AudioPlayer 
              title="El Arranque - Osvaldo Pugliese (Violin Solo)"
              audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750083504/SOLO_-_El_Arranque_-_Osvaldo_Pugliese_thpsqh.mp3"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-display text-gray-700 text-center mb-4">Singer Solo</h4>
            
            <AudioPlayer 
              title="Cotorrita de la Suerte (Singer Solo)"
              audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750083504/SOLO_Cotorrita_de_la_suerte_80706-1_TT_fbfz2t.mp3"
            />
          </div>

          <div className="flex items-center gap-4 bg-sage-green/20 backdrop-blur-sm rounded-2xl p-6 border border-sage-green/30">
            <Checkbox 
              id="day-2-task"
              checked={completedTasks['day-2-task'] || false}
              onCheckedChange={() => handleTaskComplete('day-2-task')}
            />
            <label htmlFor="day-2-task" className="text-gray-700 text-lg font-medium cursor-pointer">
              I practiced identifying solos and slowing down during them
            </label>
          </div>
        </div>
      );
    }

    // Placeholder content for other days
    return (
      <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          Day {dayNumber} assignment content will be added here...
        </p>
        
        <div className="flex items-center gap-4 bg-sage-green/20 backdrop-blur-sm rounded-2xl p-6 border border-sage-green/30">
          <Checkbox 
            id={`day-${dayNumber}-task`}
            checked={completedTasks[`day-${dayNumber}-task`] || false}
            onCheckedChange={() => handleTaskComplete(`day-${dayNumber}-task`)}
          />
          <label htmlFor={`day-${dayNumber}-task`} className="text-gray-700 text-lg font-medium cursor-pointer">
            Day {dayNumber} practice completed
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
        <h2 className="text-3xl font-display text-gray-800">Daily Assignments</h2>
        <p className="text-gray-600 mt-2">
          Progress through 7 days of focused practice ({daysUnlocked}/7 days unlocked)
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7].map((dayNumber) => {
          const status = getDayStatus(dayNumber);
          const isCompleted = completedTasks[`day-${dayNumber}-task`];
          
          return (
            <AccordionItem 
              key={dayNumber} 
              value={`day-${dayNumber}`}
              className="bg-warm-brown/10 backdrop-blur-sm rounded-2xl border border-cream/20 overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  <div className="flex items-center gap-3">
                    {status === 'locked' || status === 'tomorrow' ? (
                      <Lock className={`w-5 h-5 ${status === 'tomorrow' ? 'text-golden-yellow' : 'text-gray-400'}`} />
                    ) : isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-sage-green" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
                    )}
                    <span className="text-xl font-display text-gray-700">
                      Day {dayNumber}
                    </span>
                  </div>
                  
                  {status === 'tomorrow' && (
                    <span className="text-sm text-golden-yellow font-medium ml-auto mr-4">
                      Available Tomorrow
                    </span>
                  )}
                  
                  {status === 'locked' && dayNumber > daysUnlocked + 1 && (
                    <span className="text-sm text-gray-400 font-medium ml-auto mr-4">
                      Locked
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                {renderDayContent(dayNumber)}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default FastAndSlowDaily1to7;
