
import React from 'react';
import SpotifyEmbed from './SpotifyEmbed';
import StorySection from './StorySection';
import InfoBoxSection from './InfoBoxSection';
import TextContent from './TextContent';
import { type ThemeVariant } from '@/utils/themeSystem';

interface InfoBox {
  title: string;
  subtitle: string;
  description: string;
  theme: ThemeVariant;
}

interface PracticePlaylistSectionProps {
  title: string;
  description: string;
  spotifySrc: string;
  infoBoxes: InfoBox[];
  className?: string;
}

const PracticePlaylistSection: React.FC<PracticePlaylistSectionProps> = ({
  title,
  description,
  spotifySrc,
  infoBoxes,
  className = ""
}) => {
  return (
    <StorySection title={title} className={className}>
      <TextContent variant="body" align="center" className="mb-6">
        {description}
      </TextContent>
      
      <SpotifyEmbed 
        src={spotifySrc}
        className="rounded-2xl overflow-hidden shadow-2xl mb-8"
      />

      <InfoBoxSection infoBoxes={infoBoxes} />
    </StorySection>
  );
};

export default PracticePlaylistSection;
