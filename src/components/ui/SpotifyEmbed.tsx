import React, { useState, useEffect } from 'react';
import { useSpotify } from '@/contexts/SpotifyContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, SkipForward, SkipBack, Volume2, Smartphone } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface SpotifyEmbedProps {
  src: string;
  height?: number;
  className?: string;
  trackUri?: string; // Spotify track URI for premium playback
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ 
  src, 
  height = 352, 
  className = "rounded-2xl overflow-hidden shadow-2xl",
  trackUri
}) => {
  const { 
    isConnected, 
    spotifyUser, 
    player, 
    playerState, 
    isPlaying, 
    currentTrack,
    isIOS,
    needsUserInteraction,
    playTrack, 
    pauseTrack, 
    resumeTrack, 
    nextTrack, 
    previousTrack,
    setVolume,
    initializePlayback
  } = useSpotify();

  const [volume, setVolumeState] = useState(50);
  const [canUseFullPlayback, setCanUseFullPlayback] = useState(false);

  useEffect(() => {
    // Check if user can use full playback
    const hasFullPlayback = isConnected && 
                           spotifyUser?.product === 'premium' && 
                           player && 
                           trackUri;
    setCanUseFullPlayback(!!hasFullPlayback);
  }, [isConnected, spotifyUser, player, trackUri]);

  const handlePlayPause = async () => {
    if (!canUseFullPlayback || !trackUri) return;

    // Mark this as user initiated for iOS
    const userInitiated = true;

    if (isPlaying) {
      await pauseTrack();
    } else {
      // If no current track or different track, play the new one
      if (!currentTrack || currentTrack.uri !== trackUri) {
        await playTrack(trackUri, userInitiated);
      } else {
        await resumeTrack();
      }
    }
  };

  const handleIOSInitialize = async () => {
    if (isIOS && needsUserInteraction) {
      await initializePlayback();
    }
  };

  const handleVolumeChange = async (newVolume: number[]) => {
    const vol = newVolume[0];
    setVolumeState(vol);
    if (canUseFullPlayback) {
      await setVolume(vol / 100);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // For premium users with full playback capability
  if (canUseFullPlayback && trackUri) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          {/* iOS Initialization Notice */}
          {isIOS && needsUserInteraction && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">iOS Playback Setup</span>
              </div>
              <p className="text-xs text-blue-700 mb-2">
                Tap the button below to enable full Spotify playback on iOS
              </p>
              <Button
                onClick={handleIOSInitialize}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Enable Playback
              </Button>
            </div>
          )}

          {/* Track Info */}
          {currentTrack && currentTrack.uri === trackUri && (
            <div className="flex items-center gap-4 mb-4">
              {currentTrack.album?.images?.[0]?.url && (
                <img 
                  src={currentTrack.album.images[0].url} 
                  alt={currentTrack.album.name}
                  className="w-16 h-16 rounded-lg"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{currentTrack.name}</h3>
                <p className="text-gray-600 truncate">
                  {currentTrack.artists.map(artist => artist.name).join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={previousTrack}
              className="rounded-full"
              disabled={isIOS && needsUserInteraction}
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            <Button
              onClick={handlePlayPause}
              className="rounded-full w-12 h-12 bg-green-500 hover:bg-green-600"
              disabled={isIOS && needsUserInteraction}
            >
              {isPlaying && currentTrack?.uri === trackUri ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextTrack}
              className="rounded-full"
              disabled={isIOS && needsUserInteraction}
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          {playerState && currentTrack?.uri === trackUri && (
            <div className="flex items-center gap-2 mb-4 text-sm">
              <span className="text-gray-500 min-w-[40px]">
                {formatTime(playerState.position)}
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-green-500 h-1 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${(playerState.position / (currentTrack.duration_ms || 1)) * 100}%` 
                  }}
                />
              </div>
              <span className="text-gray-500 min-w-[40px]">
                {formatTime(currentTrack.duration_ms || 0)}
              </span>
            </div>
          )}

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-gray-500" />
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="flex-1"
              disabled={isIOS && needsUserInteraction}
            />
            <span className="text-sm text-gray-500 min-w-[30px]">{volume}%</span>
          </div>

          {/* Premium Badge */}
          <div className="mt-4 text-center">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✨ Premium Playback
              {isIOS && !needsUserInteraction && (
                <span className="ml-1">• iOS Ready</span>
              )}
            </span>
          </div>

          {/* iOS Help Text */}
          {isIOS && (
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500">
                {needsUserInteraction 
                  ? "Tap 'Enable Playback' above to start full audio on iOS"
                  : "Full Spotify playback enabled for iOS"
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default iframe embed for non-premium users or when no trackUri is provided
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
      
      {/* Show iOS notice for iframe embeds too */}
      {isIOS && isConnected && spotifyUser?.product === 'premium' && (
        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-center">
          <p className="text-xs text-blue-700">
            <Smartphone className="w-3 h-3 inline mr-1" />
            For full playback on iOS, use the controls above instead of the embedded player
          </p>
        </div>
      )}
    </div>
  );
};

export default SpotifyEmbed;

