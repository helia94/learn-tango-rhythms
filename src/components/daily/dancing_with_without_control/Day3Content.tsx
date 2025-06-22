
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import TextContent from '@/components/ui/TextContent';
import AudioSection from '@/components/ui/AudioSection';
import { getAssignment } from '@/data/assignments/dancing_with_without_control';

interface Day3ContentProps {
  completedTasks: Record<string, number>;
  onTaskLevelChange: (taskId: string, level: number) => void;
  topicName: string;
  topicIndex: number;
}

const Day3Content: React.FC<Day3ContentProps> = ({
  completedTasks,
  onTaskLevelChange,
  topicName,
  topicIndex
}) => {
  const { t } = useTranslation();
  const assignment = getAssignment('day3');

  const audioTracks = [
    {
      key: 'variacion-pensalo-bien',
      title: 'Pensalo Bien - Juan D\'Arienzo',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750625669/variacion_-_Pensalo_Bien_-_Juan_D_Arienzo_gm2e6a.mp3'
    }
  ];

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingWithWithoutControl.daily.day3.content' as any)}
      </TextContent>
      
      <AudioSection
        tracks={audioTracks}
        spacing="normal"
      />
      
      {assignment && (
        <Assignment
          assignment={assignment}
          taskId="day-3-task"
          level={completedTasks['day-3-task'] || 0}
          onLevelChange={onTaskLevelChange}
          variant="sage"
          topicName={topicName}
          topicIndex={topicIndex}
        />
      )}
    </div>
  );
};

export default Day3Content;
