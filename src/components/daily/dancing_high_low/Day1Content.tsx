
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import AudioSection from '@/components/ui/AudioSection';
import { getAssignment } from '@/data/assignments/dancing_high_low';
import TextContent from '@/components/ui/TextContent';

interface Day1ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day1Content: React.FC<Day1ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();
  const assignment = getAssignment('day1');

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  const practiceAudioTracks = [
    {
      key: 'volume-1-pastoral',
      title: 'Pastoral - Osvaldo Pugliese',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750544264/Volume_1_-_Pastoral_-_Instrumental_-_Osvaldo_Pugliese_qd6mit.mp3'
    },
    {
      key: 'volume-2-fuimos',
      title: 'Fuimos - Osvaldo Pugliese',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750544264/volume_2-_Fuimos_-_Osvaldo_Pugliese_wflwif.mp3'
    },
    {
      key: 'volume-3-copas',
      title: 'Copas amigos y besos - Orquesta Aníbal Troilo',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750544264/volume_3-_Copas_amigos_y_besos_-_Orquesta_Anibal_Troilo_gjwhgl.mp3'
    },
    {
      key: 'volume-4-pasional',
      title: 'Pasional - Osvaldo Pugliese',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750544264/volume_4_-_Pasional_-_Osvaldo_Pugliese_unk0wa.mp3'
    },
    {
      key: 'volume-6-sosiego',
      title: 'Sosiego En La Noche - Aníbal Troilo Y Su Orquesta Típica',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750544263/volume_6_-_Sosiego_En_La_Noche_-_An%C3%ADbal_Troilo_Y_Su_Orquesta_T%C3%ADpica_gsdtrm.mp3'
    }
  ];

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingHighLow.daily.day1.content' as any)}
      </TextContent>

      <AudioSection
        tracks={practiceAudioTracks}
        variant="practice"
        spacing="normal"
      />
      
      <Assignment
        assignment={assignment}
        taskId="day-1-volume-expression"
        level={completedTasks['day-1-volume-expression'] || 0}
        onLevelChange={onTaskLevelChange}
        variant="sage"
        topicName={topicName}
        topicIndex={topicIndex}
      />
    </div>
  );
};

export default Day1Content;
