
import React from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import StorySection from './StorySection';
import TextContent from './TextContent';
import { ColorChange } from '@/types/rhythm';

interface AudioTrack {
  key: string;
  title: string;
  audioUrl: string;
  colorChanges?: ColorChange[];
  colorEvents?: number[];
}

interface AudioSectionProps {
  title?: string;
  description?: string;
  tracks: AudioTrack[];
  variant?: 'default' | 'intro' | 'highlight' | 'assignment' | 'practice' | 'note';
  spacing?: 'compact' | 'normal' | 'relaxed';
  className?: string;
}

const AudioSection: React.FC<AudioSectionProps> = ({
  title,
  description,
  tracks,
  variant = 'default',
  spacing = 'normal',
  className = ""
}) => {
  const spacingClasses = {
    compact: 'space-y-3',
    normal: 'space-y-4',
    relaxed: 'space-y-6'
  };

  const content = (
    <>
      {description && (
        <TextContent variant="body" align="center" className="mb-8">
          {description}
        </TextContent>
      )}
      
      <div className={spacingClasses[spacing]}>
        {tracks.map((track) => (
          <AudioPlayer
            key={track.key}
            title={track.title}
            audioUrl={track.audioUrl}
            colorChanges={track.colorChanges}
            colorEvents={track.colorEvents}
          />
        ))}
      </div>
    </>
  );

  // If we have a title, wrap in StorySection, otherwise return content directly
  if (title) {
    return (
      <StorySection title={title} variant={variant} className={className}>
        {content}
      </StorySection>
    );
  }

  return (
    <div className={className}>
      {content}
    </div>
  );
};

export default AudioSection;
