
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import AudioPlayer from '@/components/AudioPlayer';
import { ColorEvent } from '@/types/rhythm';

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

  // Define accent examples with their event colors
  const accentExamples = [
    {
      title: t('exercises.dancingSmallBig.daily.day2.accent1Title' as any),
      description: t('exercises.dancingSmallBig.daily.day2.accent1Description' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750265058/ACCENT-1-_Recuerdo_-_Instrumental_-_Osvaldo_Pugliese_zmwbbr.mp3',
      colorEvents: [{ timestamp: 0, color: 'bg-terracotta' }] as ColorEvent[]
    },
    {
      title: t('exercises.dancingSmallBig.daily.day2.accent2Title' as any),
      description: t('exercises.dancingSmallBig.daily.day2.accent2Description' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750265058/ACCENT-2-_Recuerdo_-_Instrumental_-_Osvaldo_Pugliese_wiznii.mp3',
      colorEvents: [
        { timestamp: 0, color: 'bg-terracotta' },
        { timestamp: 4200, color: 'bg-sage-green' },
        { timestamp: 8200, color: 'bg-golden-yellow' },
        { timestamp: 12000, color: 'bg-dusty-rose' },
        { timestamp: 16200, color: 'bg-deep-teal' },
        { timestamp: 20200, color: 'bg-paprika' },
        { timestamp: 24200, color: 'bg-mushroom' }
      ] as ColorEvent[]
    },
    {
      title: t('exercises.dancingSmallBig.daily.day2.accent3Title' as any),
      description: t('exercises.dancingSmallBig.daily.day2.accent3Description' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750265058/ACCENT_3-_Mandria_-_Juan_D_Arienzo-_AudioTrimmer.com_inib2s.mp3',
      colorEvents: [
        { timestamp: 1000, color: 'bg-terracotta' },
        { timestamp: 4100, color: 'bg-sage-green' }
      ] as ColorEvent[]
    },
    {
      title: t('exercises.dancingSmallBig.daily.day2.accent4Title' as any),
      description: t('exercises.dancingSmallBig.daily.day2.accent4Description' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750265058/Accent_4_-_Arrabal_-_Pedro_Laurenz-_AudioTrimmer.com_aglurq.mp3',
      colorEvents: [
        { timestamp: 4300, color: 'bg-terracotta' },
        { timestamp: 8000, color: 'bg-sage-green' },
        { timestamp: 11400, color: 'bg-golden-yellow' },
        { timestamp: 15000, color: 'bg-dusty-rose' },
        { timestamp: 18200, color: 'bg-deep-teal' },
        { timestamp: 22000, color: 'bg-paprika' }
      ] as ColorEvent[]
    },
    {
      title: t('exercises.dancingSmallBig.daily.day2.accent5Title' as any),
      description: t('exercises.dancingSmallBig.daily.day2.accent5Description' as any),
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750265058/ACCENT_5_-_Alma_de_Bandone%C3%B3n_-_Orquesta_Francisco_Canaro-_AudioTrimmer.com_fhxnhb.mp3',
      colorEvents: [
        { timestamp: 500, color: 'bg-terracotta' },
        { timestamp: 2000, color: 'bg-sage-green' },
        { timestamp: 4000, color: 'bg-golden-yellow' },
        { timestamp: 8000, color: 'bg-dusty-rose' },
        { timestamp: 10000, color: 'bg-deep-teal' }
      ] as ColorEvent[]
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
              <h4 className="font-medium text-gray-800 mb-2">{example.title}</h4>
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
