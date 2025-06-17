
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import AudioPlayer from '@/components/AudioPlayer';
import Assignment from '@/components/Assignment';

interface Day3ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
}

const Day3Content: React.FC<Day3ContentProps> = ({ completedTasks, onTaskLevelChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('daily.day3.content')}
      </p>
      
      <p className="text-gray-600 text-lg leading-relaxed mb-6">
        {t('daily.day3.description')}
      </p>

      <div>
        <AudioPlayer 
          title="Fueye - Aníbal Troilo (Talking Singer Example)" 
          audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750085206/Talking-_Fueye_-_An%C3%ADbal_Troilo-_raohxn.mp3" 
        />
      </div>

      <Assignment
        assignment={{ content: 'daily.day3.task', task: 'daily.day3.task' }}
        taskId="day-3-task"
        level={completedTasks['day-3-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
      />
    </div>
  );
};

export default Day3Content;
