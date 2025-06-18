
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import AudioPlayer from '@/components/AudioPlayer';

const LegatoStaccatoSamples = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <AudioPlayer 
        key="legato-to-staccato"
        title={t('exercises.dancingFastSlow.legatoToStaccato')}
        audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/legato_to_Stacatto_Invierno_-_Francisco_Canaro-_gcc7qs.mp3"
        colorChanges={[
          { timestamp: 6500, color: 'bg-dusty-rose' }
        ]}
      />
      
      <AudioPlayer 
        key="staccato-to-legato"
        title={t('exercises.dancingFastSlow.staccatoToLegato')}
        audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1749839311/Stacatto_to_legato_Invierno_-_Francisco_Canaro-_ho4nwj.mp3"
        colorChanges={[
          { timestamp: 6500, color: 'bg-dusty-rose' }
        ]}
      />
    </div>
  );
};

export default LegatoStaccatoSamples;
