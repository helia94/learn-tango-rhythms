
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import AudioPlayer from '@/components/AudioPlayer';
import Assignment from '@/components/Assignment';
import TextContent from '@/components/ui/TextContent';

interface Day3ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName?: string;
  topicIndex?: number;
}

const Day3Content: React.FC<Day3ContentProps> = ({ 
  completedTasks, 
  onTaskLevelChange,
  topicName = 'dancing-fast-slow',
  topicIndex = 0
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingFastSlow.daily.day3.content')}
      </TextContent>
      
      <TextContent>
        {t('exercises.dancingFastSlow.daily.day3.description')}
      </TextContent>

      <div>
        <AudioPlayer 
          title="Fueye - Aníbal Troilo (Talking Singer Example)" 
          audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750085206/Talking-_Fueye_-_An%C3%ADbal_Troilo-_raohxn.mp3" 
        />
      </div>

      <Assignment
        assignment={{ content: 'exercises.dancingFastSlow.daily.day3.task' }}
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
