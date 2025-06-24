
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import AudioPlayer from '@/components/AudioPlayer';
import VideoGuideNotice from '@/components/ui/VideoGuideNotice';

interface Day3ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day3Content: React.FC<Day3ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();

  // Define syncopation examples with their event timestamps (in milliseconds) and actual song names
  const syncopationExamples = [
    {
      title: 'Don Juan - Carlos Di Sarli',
      description: t('exercises.dancingSmallBig.daily.day3.exampleDescriptions.donJuan' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750277191/SYNCOPA_2_-_Don_Juan_-_Carlos_Di_Sarli-_AudioTrimmer.com_tnqc5f.mp3',
      colorEvents: [3400, 7648, 11296]
    },
    {
      title: 'La Rayuela - Osvaldo Pugliese Orquesta',
      description: t('exercises.dancingSmallBig.daily.day3.exampleDescriptions.laRayuela' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750277189/SYNCOPA_5_-_La_Rayuela_-_Osvaldo_Pugliese-_AudioTrimmer.com_xvpc2s.mp3',
      colorEvents: [7000]
    },
    {
      title: 'Torrente - Aníbal Troilo',
      description: t('exercises.dancingSmallBig.daily.day3.exampleDescriptions.torrente' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750277189/SYNCOPA_7_-_Torrente_-_An%C3%ADbal_Troilo-_AudioTrimmer.com_uxkgv0.mp3',
      colorEvents: [7500, 9600, 11500, 13500, 16000]
    },
    {
      title: 'Tres amigos - Aníbal Troilo',
      description: t('exercises.dancingSmallBig.daily.day3.exampleDescriptions.tresAmigos' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750277189/SYNCOPA_8_-_Tres_amigos_-_An%C3%ADbal_Troilo-_AudioTrimmer.com_w8hwq5.mp3',
      colorEvents: [6500, 8500, 10500]
    }
  ];

  // Define different timing syncopation examples
  const differentTimingExamples = [
    {
      title: 'El choclo - Juan D\'Arienzo',
      description: t('exercises.dancingSmallBig.daily.day3.exampleDescriptions.elChoclo' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750277188/SYNCOPA_10_-_El_choclo_-_Juan_D_Arienzo-_AudioTrimmer.com_tt705r.mp3',
      colorEvents: [3000, 5000]
    },
    {
      title: 'La Cachila - Osvaldo Pugliese',
      description: t('exercises.dancingSmallBig.daily.day3.exampleDescriptions.laCachila' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750277191/SYNCOPA_3_-_La_Cachila_-_Osvaldo_Pugliese-_AudioTrimmer.com_mfmiw4.mp3',
      colorEvents: [9120]
    }
  ];

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('exercises.dancingSmallBig.daily.day3.content' as any)}
      </p>

      <VideoGuideNotice className="mb-6" />

      {/* Audio Examples Section */}
      <div className="space-y-6 mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {t('exercises.dancingSmallBig.daily.day3.syncopationExamplesTitle' as any)}
        </h3>
        
        {syncopationExamples.map((example, index) => (
          <div key={index} className="space-y-3">
            <div className="bg-warm-brown/10 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-3">{example.description}</p>
              <AudioPlayer
                title={example.title}
                audioUrl={example.audioUrl}
                colorEvents={example.colorEvents}
                className="w-full"
              />
            </div>
          </div>
        ))}

        <div className="border-t border-gray-200 pt-6 mt-8">
          <h4 className="text-lg font-medium text-gray-800 mb-4">
            {t('exercises.dancingSmallBig.daily.day3.differentTimingTitle' as any)}
          </h4>
          <p className="text-gray-600 text-sm mb-4">
            {t('exercises.dancingSmallBig.daily.day3.differentTimingDescription' as any)}
          </p>
          
          {differentTimingExamples.map((example, index) => (
            <div key={index} className="space-y-3 mb-4">
              <div className="bg-sage/10 rounded-lg p-4">
                <p className="text-gray-600 text-sm mb-3">{example.description}</p>
                <AudioPlayer
                  title={example.title}
                  audioUrl={example.audioUrl}
                  colorEvents={example.colorEvents}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Assignment
        assignment={{ 
          content: 'exercises.dancingSmallBig.daily.day3.task' as any
        }}
        taskId="day-3-task"
        level={completedTasks['day-3-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day3Content;
