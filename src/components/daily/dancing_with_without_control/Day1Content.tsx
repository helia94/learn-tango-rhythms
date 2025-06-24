
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import TextContent from '@/components/ui/TextContent';
import AudioSection from '@/components/ui/AudioSection';
import VideoGuideNotice from '@/components/ui/VideoGuideNotice';
import { getAssignment } from '@/data/assignments/dancing_with_without_control';

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

  const practiceAudioTracks = [
    {
      key: 'triplet-1-buscandote',
      title: 'Buscandote - Osvaldo Fresedo',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750547223/triplet_8_-_Buscandote_-_Osvaldo_Fresedo_qtreck.mp3'
    },
    {
      key: 'triplet-2-en-esta-tarde',
      title: 'En Esta Tarde Gris - Aníbal Troilo',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750547222/tiplet_4_-_En_Esta_Tarde_Gris_-_An%C3%ADbal_Troilo_myiezz.mp3'
    },
    {
      key: 'triplet-3-te-aconsejo',
      title: 'Te Aconsejo Que Me Dejes - Aníbal Troilo y Su Orquesta Típica',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750547223/triplet_3_-_Te_Aconsejo_Que_Me_Dejes_-_Anibal_Troilo_y_Su_Orquesta_T%C3%ADpica_qqu6ea.mp3'
    },
    {
      key: 'triplet-4-buscandote-2',
      title: 'Buscandote - Osvaldo Fresedo (Variation)',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750547221/triplet_7_-_Buscandote_-_Osvaldo_Fresedo_ygxgab.mp3'
    },
    {
      key: 'triplet-5-en-esta-tarde-2',
      title: 'En Esta Tarde Gris - Aníbal Troilo (Variation)',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750547222/tiplet_5_-_En_Esta_Tarde_Gris_-_An%C3%ADbal_Troilo_ku47qv.mp3'
    },
    {
      key: 'triplet-6-buscandote-3',
      title: 'Buscandote - Osvaldo Fresedo (Variation 2)',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750547221/triplet_6_-_Buscandote_-_Osvaldo_Fresedo_amiqwv.mp3'
    }
  ];

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingWithWithoutControl.daily.day1.content' as any)}
      </TextContent>

      <VideoGuideNotice className="mb-6" />

      <AudioSection
        tracks={practiceAudioTracks}
        variant="practice"
        spacing="normal"
      />
      
      {assignment && (
        <Assignment
          assignment={assignment}
          taskId="day-1-task"
          level={completedTasks['day-1-task'] || 0}
          onLevelChange={onTaskLevelChange}
          variant="sage"
          topicName={topicName}
          topicIndex={topicIndex}
        />
      )}
    </div>
  );
};

export default Day1Content;
