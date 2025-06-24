
import React from 'react';
import { Link } from 'react-router-dom';
import SpotifyEmbed from './SpotifyEmbed';
import StorySection from './StorySection';
import InfoBoxSection from './InfoBoxSection';
import TextContent from './TextContent';
import { type ThemeVariant } from '@/utils/themeSystem';
import { useAuth } from '@/contexts/AuthContext';
import { useSpotify } from '@/contexts/SpotifyContext';
import { useTranslation } from '@/hooks/useTranslation';

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
  infoBoxes?: InfoBox[];
  className?: string;
}

const PracticePlaylistSection: React.FC<PracticePlaylistSectionProps> = ({
  title,
  description,
  spotifySrc,
  infoBoxes,
  className = ""
}) => {
  const { user } = useAuth();
  const { isConnected } = useSpotify();
  const { t } = useTranslation();

  return (
    <StorySection title={title} className={className}>
      <TextContent variant="body" align="center" className="mb-6">
        {description}
      </TextContent>
      
      <SpotifyEmbed 
        src={spotifySrc}
        className="rounded-2xl overflow-hidden shadow-2xl mb-8"
      />

      {infoBoxes && infoBoxes.length > 0 && (
        <InfoBoxSection infoBoxes={infoBoxes} />
      )}

      {/* Spotify Connection Notice */}
      {user && !isConnected && (
        <div className="text-center mt-6">
          <TextContent variant="body" align="center" className="text-sm text-gray-600">
            {t('common.spotifyConnect').split(t('common.connectSpotifyPremium'))[0]}
            <Link 
              to="/profile" 
              className="text-sage-green hover:text-deep-teal underline font-medium"
            >
              {t('common.connectSpotifyPremium')}
            </Link>
            {t('common.spotifyConnect').split(t('common.connectSpotifyPremium'))[1]}
          </TextContent>
        </div>
      )}
    </StorySection>
  );
};

export default PracticePlaylistSection;
