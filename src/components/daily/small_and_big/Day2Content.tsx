
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import AudioPlayer from '@/components/AudioPlayer';

interface Day2ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day2Content: React.FC<Day2ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();

  // Define accent examples with their event timestamps (in milliseconds)
  const accentExamples = [
    {
      description: t('exercises.dancingSmallBig.daily.day2.accent1Description' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750265058/ACCENT-1-_Recuerdo_-_Instrumental_-_Osvaldo_Pugliese_zmwbbr.mp3',
      colorEvents: [0]
    },
    {
      description: t('exercises.dancingSmallBig.daily.day2.accent2Description' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750265058/ACCENT-2-_Recuerdo_-_Instrumental_-_Osvaldo_Pugliese_wiznii.mp3',
      colorEvents: [0, 4200, 8200, 12000, 16200, 20200, 24200]
    },
    {
      description: t('exercises.dancingSmallBig.daily.day2.accent3Description' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750265058/ACCENT_3-_Mandria_-_Juan_D_Arienzo-_AudioTrimmer.com_inib2s.mp3',
      colorEvents: [1000, 4100]
    },
    {
      description: t('exercises.dancingSmallBig.daily.day2.accent4Description' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750265058/Accent_4_-_Arrabal_-_Pedro_Laurenz-_AudioTrimmer.com_aglurq.mp3',
      colorEvents: [4300, 8000, 11400, 15000, 18200, 22000]
    },
    {
      description: t('exercises.dancingSmallBig.daily.day2.accent5Description' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750265058/ACCENT_5_-_Alma_de_Bandone%C3%B3n_-_Orquesta_Francisco_Canaro-_AudioTrimmer.com_fhxnhb.mp3',
      colorEvents: [500, 2000, 4000, 8000, 10000]
    }
  ];

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('exercises.dancingSmallBig.daily.day2.content' as any)}
      </p>

      {/* Audio Examples Section */}
      <div className="space-y-6 mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {t('exercises.dancingSmallBig.daily.day2.audioExamplesTitle' as any)}
        </h3>
        
        {accentExamples.map((example, index) => (
          <div key={index} className="space-y-3">
            <div className="bg-warm-brown/10 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-3">{example.description}</p>
              <AudioPlayer
                title={`Audio Example ${index + 1}`}
                audioUrl={example.audioUrl}
                colorEvents={example.colorEvents}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>
      
      <Assignment
        assignment={{ 
          content: 'exercises.dancingSmallBig.daily.day2.task' as any, 
          task: 'exercises.dancingSmallBig.daily.day2.task' as any 
        }}
        taskId="day-2-task"
        level={completedTasks['day-2-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day2Content;
