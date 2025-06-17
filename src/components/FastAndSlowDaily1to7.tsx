
import React, { useState } from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from '@/hooks/useTranslation';
import AudioPlayer from '@/components/AudioPlayer';
import TipsSection from '@/components/TipsSection';
import Assignment from '@/components/Assignment';

const FastAndSlowDaily1to7 = () => {
  const { t } = useTranslation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, number>>({});

  // Simulate user progress (0-7 days unlocked)
  const daysUnlocked = 7; // Updated to show Day 7 is now unlocked

  const handleTaskLevelChange = (taskId: string, level: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: level
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
      return <div className="flex items-center justify-center p-8 text-gray-600">
          <div className="text-center">
            <Lock className="w-8 h-8 mx-auto mb-3 text-golden-yellow" />
            <p className="text-lg">{t('daily.unlockTomorrow')}</p>
          </div>
        </div>;
    }
    if (status === 'locked') {
      return <div className="flex items-center justify-center p-8 text-gray-500">
          <div className="text-center">
            <Lock className="w-8 h-8 mx-auto mb-3" />
            <p className="text-lg">{t('daily.locked')}</p>
          </div>
        </div>;
    }

    // Day 1 content
    if (dayNumber === 1) {
      return <div className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            {t('daily.day1.content')}
          </p>
          
          <div>
            <p className="text-gray-600 mb-4 text-center">{t('daily.day1.audioDescription')}</p>
            <AudioPlayer title={t('daily.day1.audioTitle')} audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750080593/ALMA_DEL_BANDONEON_ORQUESTA_TIPICA_FRANCISCO_CANARO-30_sec_nrc3lj.mp3" colorChanges={[{
            timestamp: 7000,
            color: 'bg-dusty-rose'
          }, {
            timestamp: 15000,
            color: 'bg-golden-yellow'
          }, {
            timestamp: 23500,
            color: 'bg-terracotta'
          }]} />
          </div>

          <div>
            <p className="text-gray-600 mb-4 text-center">{t('daily.day1.fullSong')}</p>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe style={{
              borderRadius: '12px'
            }} src="https://open.spotify.com/embed/track/1WhutMc7bnEoTMdfvCyXit?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
            </div>
          </div>

          <Assignment
            assignment={{ content: 'daily.day1.task' }}
            taskId="day-1-task"
            level={completedTasks['day-1-task'] || 0}
            onLevelChange={handleTaskLevelChange}
            variant="sage"
          />
        </div>;
    }

    // Day 2 content
    if (dayNumber === 2) {
      return <div className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            {t('daily.day2.content')}
          </p>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            {t('daily.day2.description')}
          </p>

          <div className="space-y-4">
            <h4 className="text-xl font-display text-gray-700 text-center mb-4">{t('daily.day2.bandonionSolos')}</h4>
            
            <AudioPlayer title="El Africano - Aníbal Troilo (Bandonion Solo)" audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750083505/SOLO-El_africano-Troilo_jramon.mp3" />
            
            <AudioPlayer title="La Tablada - Aníbal Troilo (Bandonion Solo)" audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750083505/SOLO_La_Tablada_-_An%C3%ADbal_Troilo_pugych.mp3" />
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-display text-gray-700 text-center mb-4">{t('daily.day2.violinSolos')}</h4>
            
            <AudioPlayer title="Tierra Querida - Osvaldo Pugliese (Violin Solo)" audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750083505/SOLO_Tierra_Querida_-_Osvaldo_Pugliese_ccg0ce.mp3" />
            
            <AudioPlayer title="El Arranque - Osvaldo Pugliese (Violin Solo)" audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750083504/SOLO_-_El_Arranque_-_Osvaldo_Pugliese_thpsqh.mp3" />
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-display text-gray-700 text-center mb-4">{t('daily.day2.singerSolo')}</h4>
            
            <AudioPlayer title="Cotorrita de la Suerte (Singer Solo)" audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750083504/SOLO_Cotorrita_de_la_suerte_80706-1_TT_fbfz2t.mp3" />
          </div>

          <Assignment
            assignment={{ content: 'daily.day2.task' }}
            taskId="day-2-task"
            level={completedTasks['day-2-task'] || 0}
            onLevelChange={handleTaskLevelChange}
            variant="sage"
          />
        </div>;
    }

    // Day 3 content
    if (dayNumber === 3) {
      return <div className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            {t('daily.day3.content')}
          </p>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {t('daily.day3.description')}
          </p>

          <div>
            <AudioPlayer title="Fueye - Aníbal Troilo (Talking Singer Example)" audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750085206/Talking-_Fueye_-_An%C3%ADbal_Troilo-_raohxn.mp3" />
          </div>

          <Assignment
            assignment={{ content: 'daily.day3.task' }}
            taskId="day-3-task"
            level={completedTasks['day-3-task'] || 0}
            onLevelChange={handleTaskLevelChange}
            variant="sage"
          />
        </div>;
    }

    // Day 4 content
    if (dayNumber === 4) {
      return <div className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            {t('daily.day4.content')}
          </p>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {t('daily.day4.description')}
          </p>

          <TipsSection 
            title={t('tips.extremeSlowness')}
            tips={[
              t('tips.extremeSlownessTip1'),
              t('tips.extremeSlownessTip2'),
              t('tips.extremeSlownessTip3'),
              t('tips.extremeSlownessTip4')
            ]}
          />

          <Assignment
            assignment={{ content: 'daily.day4.task' }}
            taskId="day-4-task"
            level={completedTasks['day-4-task'] || 0}
            onLevelChange={handleTaskLevelChange}
            variant="sage"
          />
        </div>;
    }

    // Day 5 content
    if (dayNumber === 5) {
      return <div className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            {t('daily.day5.content')}
          </p>
          
          <TipsSection 
            title={t('tips.extremeSpeed')}
            tips={[
              t('tips.extremeSpeedTip1'),
              t('tips.extremeSpeedTip2')
            ]}
          />

          <Assignment
            assignment={{ content: 'daily.day5.task' }}
            taskId="day-5-task"
            level={completedTasks['day-5-task'] || 0}
            onLevelChange={handleTaskLevelChange}
            variant="sage"
          />
        </div>;
    }

    // Day 6 content
    if (dayNumber === 6) {
      return <div className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            {t('daily.day6.content')}
          </p>
          
          <TipsSection 
            title={t('tips.backOchoChallengeTitle')}
            tips={[
              t('tips.backOchoChallengeTip1'),
              t('tips.backOchoChallengeTip2'),
              t('tips.backOchoChallengeTip3'),
              t('tips.backOchoChallengeTip4')
            ]}
          />

          <Assignment
            assignment={{ content: 'daily.day6.task' }}
            taskId="day-6-task"
            level={completedTasks['day-6-task'] || 0}
            onLevelChange={handleTaskLevelChange}
            variant="sage"
          />
        </div>;
    }

    // Day 7 content
    if (dayNumber === 7) {
      return <div className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            {t('daily.day7.content')}
          </p>
          
          <TipsSection 
            title={t('tips.ochoCortadoChallengeTitle')}
            tips={[
              t('tips.ochoCortadoChallengeTip1'),
              t('tips.ochoCortadoChallengeTip2'),
              t('tips.ochoCortadoChallengeTip3'),
              t('tips.ochoCortadoChallengeTip4'),
              t('tips.ochoCortadoChallengeTip5')
            ]}
          />

          <Assignment
            assignment={{ content: 'daily.day7.task' }}
            taskId="day-7-task"
            level={completedTasks['day-7-task'] || 0}
            onLevelChange={handleTaskLevelChange}
            variant="sage"
          />
        </div>;
    }

    // Placeholder content for other days
    return <div className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          Day {dayNumber} {t('daily.placeholder')}
        </p>
        
        <Assignment
          assignment={{ content: 'daily.placeholderTask' }}
          taskId={`day-${dayNumber}-task`}
          level={completedTasks[`day-${dayNumber}-task`] || 0}
          onLevelChange={handleTaskLevelChange}
          variant="sage"
        />
      </div>;
  };

  return <div className="mb-16">
      <div className="text-center mb-8">
        <CheckCircle className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
        <h2 className="text-3xl font-display text-gray-800">{t('daily.title')}</h2>
        <p className="text-gray-600 mt-2">
          {t('daily.subtitle')} ({daysUnlocked}/7 days unlocked)
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7].map(dayNumber => {
        const status = getDayStatus(dayNumber);
        const isCompleted = completedTasks[`day-${dayNumber}-task`] > 0;
        return <AccordionItem key={dayNumber} value={`day-${dayNumber}`} className="bg-warm-brown/10 backdrop-blur-sm rounded-2xl border border-cream/20 overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  <div className="flex items-center gap-3">
                    {status === 'locked' || status === 'tomorrow' ? <Lock className={`w-5 h-5 ${status === 'tomorrow' ? 'text-golden-yellow' : 'text-gray-400'}`} /> : isCompleted ? <CheckCircle className="w-5 h-5 text-sage-green" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-400" />}
                    <span className="text-xl font-display text-gray-700">
                      Day {dayNumber}
                    </span>
                  </div>
                  
                  {status === 'tomorrow' && <span className="text-sm text-golden-yellow font-medium ml-auto mr-4">
                      {t('daily.availableTomorrow')}
                    </span>}
                  
                  {status === 'locked' && dayNumber > daysUnlocked + 1 && <span className="text-sm text-gray-400 font-medium ml-auto mr-4">
                      {t('daily.locked')}
                    </span>}
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                {renderDayContent(dayNumber)}
              </AccordionContent>
            </AccordionItem>;
      })}
      </Accordion>
    </div>;
};

export default FastAndSlowDaily1to7;
