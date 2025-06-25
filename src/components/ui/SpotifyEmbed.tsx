
import React from 'react';

interface SpotifyEmbedProps {
  src: string;
  height?: number;
  className?: string;
  uriOrUrl?: string; // Keep for backward compatibility but unused
  trackUri?: string; // Keep for backward compatibility but unused
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ 
  src, 
  height = 352, 
  className = "rounded-2xl overflow-hidden shadow-2xl"
}) => {
  return (
    <div className={className}>
      <iframe 
        style={{borderRadius: '16px'}} 
        src={src}
        width="100%" 
        height={height} 
        frameBorder="0" 
        allowFullScreen 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
      />
    </div>
  );
};

export default SpotifyEmbed;
