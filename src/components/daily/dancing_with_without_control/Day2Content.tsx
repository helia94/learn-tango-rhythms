
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Assignment from '@/components/Assignment';
import TextContent from '@/components/ui/TextContent';
import AudioSection from '@/components/ui/AudioSection';
import { getAssignment } from '@/data/assignments/dancing_with_without_control';

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

  const audioTracks = [
    {
      key: 'bridge-adios-arrabal',
      title: 'Bridge 1 - Adios Arrabal - Angel D\'Agostino',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750625264/Bridge_1_-_Adios_Arrabal_-_Angel_D_Agostino_jgj8mo.mp3',
      colorEvents: [7000, 14500, 22000]
    },
    {
      key: 'bridge-compadron',
      title: 'Bridge 2 - Compadrón - Juan D\'Arienzo',
      audioUrl: 'https://res.cloudinary.com/dl9xg597r/video/upload/v1750625264/bridge_2_-_Compadr%C3%B3n_-_Juan_D_Arienzo_aouzxg.mp3',
      colorEvents: [6500, 13900, 21300]
    }
  ];

  return (
    <div className="space-y-6">
      <TextContent>
        {t('exercises.dancingWithWithoutControl.daily.day2.content' as any)}
      </TextContent>
      
      <AudioSection
        tracks={audioTracks}
        spacing="normal"
      />
      
      {assignment && (
        <Assignment
          assignment={assignment}
          taskId="day-2-task"
          level={completedTasks['day-2-task'] || 0}
          onLevelChange={onTaskLevelChange}
          variant="sage"
          topicName={topicName}
          topicIndex={topicIndex}
        />
      )}
    </div>
  );
};

export default Day2Content;
