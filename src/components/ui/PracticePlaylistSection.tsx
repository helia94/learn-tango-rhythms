
import React from 'react';
import SpotifyEmbed from './SpotifyEmbed';
import StorySection from './StorySection';
import { getThemeClasses, type ThemeVariant } from '@/utils/themeSystem';

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

      <div className={`grid gap-6 ${infoBoxes.length === 1 ? 'grid-cols-1' : infoBoxes.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        {infoBoxes.map((box, index) => {
          const themeColors = getThemeClasses(box.theme);
          
          return (
            <div 
              key={index}
              className={`${themeColors.background} backdrop-blur-sm rounded-2xl p-6 border ${themeColors.border}`}
            >
              <h3 className="text-xl font-display text-gray-700 mb-4 text-center">{box.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                <strong>{box.subtitle}</strong> - {box.description}
              </p>
            </div>
          );
        })}
      </div>
    </StorySection>
  );
};

export default PracticePlaylistSection;
