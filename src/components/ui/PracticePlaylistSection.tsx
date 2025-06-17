
import React from 'react';
import SpotifyEmbed from './SpotifyEmbed';
import StorySection from './StorySection';
import InfoBoxSection from './InfoBoxSection';
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
      <p className="text-gray-700 text-lg mb-6 text-center">
        {description}
      </p>
      
      <SpotifyEmbed 
        src={spotifySrc}
        className="rounded-2xl overflow-hidden shadow-2xl mb-8"
      />

      <InfoBoxSection infoBoxes={infoBoxes} />
    </StorySection>
  );
};

export default PracticePlaylistSection;
