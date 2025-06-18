
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import AudioPlayer from '@/components/AudioPlayer';
import Assignment from '@/components/Assignment';

interface Day1ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName?: string;
  topicIndex?: number;
}

const Day1Content: React.FC<Day1ContentProps> = ({ 
  completedTasks, 
  onTaskLevelChange,
  topicName = 'dancing-fast-slow',
  topicIndex = 0
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('exercises.dancingFastSlow.daily.day1.content')}
      </p>
      
      <div>
        <p className="text-gray-600 mb-4 text-center">{t('exercises.dancingFastSlow.daily.day1.audioDescription')}</p>
        <AudioPlayer 
          title={t('exercises.dancingFastSlow.daily.day1.audioTitle')} 
          audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750080593/ALMA_DEL_BANDONEON_ORQUESTA_TIPICA_FRANCISCO_CANARO-30_sec_nrc3lj.mp3" 
          colorChanges={[
            { timestamp: 7000, color: 'bg-dusty-rose' },
            { timestamp: 15000, color: 'bg-golden-yellow' },
            { timestamp: 23500, color: 'bg-terracotta' }
          ]} 
        />
      </div>

      <div>
        <p className="text-gray-600 mb-4 text-center">{t('exercises.dancingFastSlow.daily.day1.fullSong')}</p>
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <iframe 
            style={{ borderRadius: '12px' }} 
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

      <Assignment
        assignment={{ content: 'exercises.dancingFastSlow.daily.day1.task', task: 'exercises.dancingFastSlow.daily.day1.task' }}
        taskId="day-1-task"
        level={completedTasks['day-1-task'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day1Content;
