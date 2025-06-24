
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import AudioPlayer from '@/components/AudioPlayer';

interface Day7ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day7Content: React.FC<Day7ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();

  // Define bridge example with event timestamps (in milliseconds)
  const bridgeExample = {
    title: 'Dime Mi Amor - Juan D\'Arienzo',
    description: t('exercises.dancingSmallBig.daily.day7.bridgeExample.description' as any),
    audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750279538/Piano_Bridge_-_Dime_Mi_Amor_-_Juan_D_Arienzo-_AudioTrimmer.com_cvbxba.mp3',
    colorEvents: [2500, 5800, 9300, 12500]
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('exercises.dancingSmallBig.daily.day7.content' as any)}
      </p>

      {/* Bridge Example Section */}
      <div className="space-y-6 mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {t('exercises.dancingSmallBig.daily.day7.bridgeExample.title' as any)}
        </h3>
        
        <div className="bg-warm-brown/10 rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-3">{bridgeExample.description}</p>
          <AudioPlayer
            title={bridgeExample.title}
            audioUrl={bridgeExample.audioUrl}
            colorEvents={bridgeExample.colorEvents}
            className="w-full"
          />
        </div>
      </div>
      
      <Assignment
        assignment={{ 
          content: 'exercises.dancingSmallBig.daily.day7.task' as any
        }}
        taskId="day-7-task"
        level={completedTasks['day-7-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day7Content;
