
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
  uriOrUrl?: string; // New generic prop for any Spotify content
  trackUri?: string; // Keep for backward compatibility
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ 
  src, 
  height = 352, 
  className = "rounded-2xl overflow-hidden shadow-2xl",
  uriOrUrl,
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
    activateElement
  } = useSpotify();

  const [volume, setVolumeState] = useState(50);
  const [canUseFullPlayback, setCanUseFullPlayback] = useState(false);

  // Helper: URL → spotify URI (track | album | playlist | artist)
  const toUri = (url: string): string => {
    if (url.startsWith('spotify:')) return url; // already URI
    try {
      const { pathname } = new URL(url);
      const [, type, id] = pathname.split('/'); // e.g. /playlist/37i9dQZF1DX…
      return `spotify:${type}:${id}`;
    } catch (error) {
      console.error('Invalid Spotify URL:', url);
      return url; // Return as-is if parsing fails
    }
  };

  // Determine the target URI (prioritize uriOrUrl over trackUri)
  const targetUri = uriOrUrl ? toUri(uriOrUrl) : trackUri;
  const isContextPlayback = targetUri && (
    targetUri.includes(':playlist:') || 
    targetUri.includes(':album:') || 
    targetUri.includes(':artist:')
  );

  useEffect(() => {
    // Check if user can use full playback
    const hasFullPlayback = isConnected && 
                           spotifyUser?.product === 'premium' && 
                           player && 
                           targetUri;
    setCanUseFullPlayback(!!hasFullPlayback);
  }, [isConnected, spotifyUser, player, targetUri]);

  // Auto-start playback for playlists/albums/artists
  useEffect(() => {
    if (!canUseFullPlayback || !isContextPlayback || !player) return;

    const startContextPlayback = async () => {
      try {
        // Get OAuth token from the player
        player._options.getOAuthToken(async (token: string) => {
          await fetch('https://api.spotify.com/v1/me/player/play', {
            method: 'PUT',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ context_uri: targetUri })
          });
        });
      } catch (error) {
        console.error('Error starting context playback:', error);
      }
    };

    // Small delay to ensure player is ready
    const timer = setTimeout(startContextPlayback, 1000);
    return () => clearTimeout(timer);
  }, [canUseFullPlayback, isContextPlayback, targetUri, player]);

  const handlePlayPause = async () => {
    if (!canUseFullPlayback || !targetUri) return;

    // Mark this as user initiated for iOS
    const userInitiated = true;

    if (isPlaying) {
      await pauseTrack();
    } else {
      if (isContextPlayback) {
        // For playlists/albums/artists, use context playback
        if (player) {
          player._options.getOAuthToken(async (token: string) => {
            await fetch('https://api.spotify.com/v1/me/player/play', {
              method: 'PUT',
              headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ context_uri: targetUri })
            });
          });
        }
      } else {
        // For individual tracks, use existing logic
        if (!currentTrack || currentTrack.uri !== targetUri) {
          await playTrack(targetUri, userInitiated);
        } else {
          await resumeTrack();
        }
      }
    }
  };

  const handleIOSActivation = () => {
    if (isIOS && needsUserInteraction) {
      // Call activateElement synchronously (no await) to keep it in the same event loop tick
      activateElement();
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
  if (canUseFullPlayback && targetUri) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          {/* iOS Activation Notice */}
          {isIOS && needsUserInteraction && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">iOS Playback Setup</span>
              </div>
              <p className="text-xs text-blue-700 mb-2">
                Tap to activate Spotify playback on iOS (required for autoplay support)
              </p>
              <Button
                onClick={handleIOSActivation}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Activate Playback
              </Button>
            </div>
          )}

          {/* Track Info - Only show for individual tracks */}
          {currentTrack && !isContextPlayback && currentTrack.uri === targetUri && (
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

          {/* Context Info - Show for playlists/albums/artists */}
          {isContextPlayback && (
            <div className="mb-4 text-center">
              <p className="text-lg font-semibold text-green-600">
                {targetUri.includes(':playlist:') && '🎵 Playlist Playback'}
                {targetUri.includes(':album:') && '💿 Album Playback'}
                {targetUri.includes(':artist:') && '🎤 Artist Playback'}
              </p>
              <p className="text-sm text-gray-600">
                Playing in your Spotify app
              </p>
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
              {isPlaying ? (
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

          {/* Progress Bar - Only show for individual tracks */}
          {playerState && currentTrack && !isContextPlayback && currentTrack.uri === targetUri && (
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

          {/* Volume Control - Hidden on iOS */}
          {!isIOS && (
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-gray-500" />
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-gray-500 min-w-[30px]">{volume}%</span>
            </div>
          )}

          {/* Premium Badge */}
          <div className="mt-4 text-center">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✨ Premium Playback
              {isContextPlayback && (
                <span className="ml-1">• Context Mode</span>
              )}
              {isIOS && !needsUserInteraction && (
                <span className="ml-1">• iOS Activated</span>
              )}
            </span>
          </div>

          {/* iOS Help Text */}
          {isIOS && (
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500">
                {needsUserInteraction 
                  ? "Tap 'Activate Playback' above to enable full audio control on iOS"
                  : "iOS playback activated - full Spotify control available"
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default iframe embed for non-premium users or when no URI is provided
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
