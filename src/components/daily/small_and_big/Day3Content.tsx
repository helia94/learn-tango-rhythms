
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import AudioPlayer from '@/components/AudioPlayer';

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
      description: 'Classic syncopation, easy to listen to, in the beginning of the song.',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750277191/SYNCOPA_2_-_Don_Juan_-_Carlos_Di_Sarli-_AudioTrimmer.com_tnqc5f.mp3',
      colorEvents: [3595, 7648, 11296]
    },
    {
      title: 'Seguime, Si Podes - Osvaldo Pugliese',
      description: 'Strong syncopation, typical for Pugliese.',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750277190/SYNCOPA_4_-_Seguime_Si_Podes_-_Osvaldo_Pugliese-_AudioTrimmer.com_hnx50k.mp3',
      colorEvents: [4256]
    },
    {
      title: 'La Rayuela - Osvaldo Pugliese Orquesta',
      description: 'Single strong syncopation in Pugliese style.',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750277189/SYNCOPA_5_-_La_Rayuela_-_Osvaldo_Pugliese-_AudioTrimmer.com_xvpc2s.mp3',
      colorEvents: [7605]
    },
    {
      title: 'Torrente - Aníbal Troilo',
      description: 'A series of syncopations.',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750277189/SYNCOPA_7_-_Torrente_-_An%C3%ADbal_Troilo-_AudioTrimmer.com_uxkgv0.mp3',
      colorEvents: [7500, 8500, 9600, 11500, 13500, 16000]
    },
    {
      title: 'Tres amigos - Aníbal Troilo',
      description: 'Three syncopations, typical in Troilo Orquesta.',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750277189/SYNCOPA_8_-_Tres_amigos_-_An%C3%ADbal_Troilo-_AudioTrimmer.com_w8hwq5.mp3',
      colorEvents: [6500, 8500, 10500]
    }
  ];

  // Define different timing syncopation examples
  const differentTimingExamples = [
    {
      title: 'El choclo - Juan D\'Arienzo',
      description: 'Syncopation with different timing - do you feel any different impulse to dance them?',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750277188/SYNCOPA_10_-_El_choclo_-_Juan_D_Arienzo-_AudioTrimmer.com_tt705r.mp3',
      colorEvents: [3000, 5000]
    },
    {
      title: 'La Cachila - Osvaldo Pugliese',
      description: 'Single syncopation with unique timing.',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750277191/SYNCOPA_3_-_La_Cachila_-_Osvaldo_Pugliese-_AudioTrimmer.com_mfmiw4.mp3',
      colorEvents: [9120]
    }
  ];

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('exercises.dancingSmallBig.daily.day3.content' as any)}
      </p>

      {/* Audio Examples Section */}
      <div className="space-y-6 mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Syncopation Examples
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
            Different Timing Syncopations
          </h4>
          <p className="text-gray-600 text-sm mb-4">
            Syncopation, but it has another timing, do you feel any different in your impulse to dance them?
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
          content: 'exercises.dancingSmallBig.daily.day3.task' as any, 
          task: 'exercises.dancingSmallBig.daily.day3.task' as any 
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
