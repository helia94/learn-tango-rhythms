
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import AudioSection from '@/components/ui/AudioSection';
import { getAssignment } from '@/data/assignments/dancing_high_low';
import TextContent from '@/components/ui/TextContent';

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
  const assignment = getAssignment('day2');

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  const practiceAudioTracks = [
    {
      key: 'tone-1-chique',
      title: 'Chique - Osvaldo Pugliese',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750544397/tone_1_-_Chique_-_Instrumental_-_Osvaldo_Pugliese_m4oi1c.mp3'
    },
    {
      key: 'tone-2-seguime',
      title: 'Seguime Si Podes - Osvaldo Pugliese',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750544397/tone_2-_Seguime_Si_Podes_-_Instrumental_-_Osvaldo_Pugliese_yarrnz.mp3'
    },
    {
      key: 'tone-3-distinguido',
      title: 'El Distinguido Ciudadano - Aníbal Troilo',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750544396/tone_3_-_El_Distinguido_Ciudadano_-_An%C3%ADbal_Troilo_dv2iti.mp3'
    }
  ];

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingHighLow.daily.day2.content' as any)}
      </TextContent>

      <AudioSection
        tracks={practiceAudioTracks}
        variant="practice"
        spacing="normal"
      />
      
      <Assignment
        assignment={assignment}
        taskId="day-2-pitch-following"
        level={completedTasks['day-2-pitch-following'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day2Content;
