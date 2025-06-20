
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import AudioPlayer from '@/components/AudioPlayer';
import Assignment from '@/components/Assignment';

interface Day2ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName?: string;
  topicIndex?: number;
}

const Day2Content: React.FC<Day2ContentProps> = ({ 
  completedTasks, 
  onTaskLevelChange,
  topicName = 'dancing-fast-slow',
  topicIndex = 0
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        {t('exercises.dancingFastSlow.daily.day2.content')}
      </p>
      
      <p className="text-gray-600 text-lg leading-relaxed">
        {t('exercises.dancingFastSlow.daily.day2.description')}
      </p>

      <div className="space-y-4">
        <h4 className="text-xl font-display text-gray-700 text-center mb-4">{t('exercises.dancingFastSlow.daily.day2.bandonionSolos')}</h4>
        
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
        <h4 className="text-xl font-display text-gray-700 text-center mb-4">{t('exercises.dancingFastSlow.daily.day2.violinSolos')}</h4>
        
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
        <h4 className="text-xl font-display text-gray-700 text-center mb-4">{t('exercises.dancingFastSlow.daily.day2.singerSolo')}</h4>
        
        <AudioPlayer 
          title="Cotorrita de la Suerte (Singer Solo)" 
          audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750083504/SOLO_Cotorrita_de_la_suerte_80706-1_TT_fbfz2t.mp3" 
        />
      </div>

      <Assignment
        assignment={{ content: 'exercises.dancingFastSlow.daily.day2.task' }}
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
