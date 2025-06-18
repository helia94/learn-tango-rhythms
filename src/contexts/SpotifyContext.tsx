import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SpotifyUser, SpotifyTokens, SpotifyPlayer, SpotifyPlayerState } from '@/types/spotify';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { getSpotifyAuthUrl, SPOTIFY_CONFIG } from '@/config/spotify';
import { toast } from 'sonner';

interface SpotifyContextType {
  isConnected: boolean;
  spotifyUser: SpotifyUser | null;
  player: SpotifyPlayer | null;
  playerState: SpotifyPlayerState | null;
  deviceId: string | null;
  isPlaying: boolean;
  currentTrack: any | null;
  loading: boolean;
  connectSpotify: () => void;
  disconnectSpotify: () => Promise<void>;
  playTrack: (trackUri: string) => Promise<void>;
  pauseTrack: () => Promise<void>;
  resumeTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
}

const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (context === undefined) {
    throw new Error('useSpotify must be used within a SpotifyProvider');
  }
  return context;
};

interface SpotifyProviderProps {
  children: ReactNode;
}

interface SpotifyConnection {
  id: string;
  access_token: string;
  refresh_token: string;
  expires_at: number;
  token_type: string;
  scope: string;
  created_at: string;
  updated_at: string;
}

export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [spotifyUser, setSpotifyUser] = useState<SpotifyUser | null>(null);
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [playerState, setPlayerState] = useState<SpotifyPlayerState | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Check for existing Spotify connection on mount
  useEffect(() => {
    if (user) {
      checkSpotifyConnection();
    }
  }, [user]);

  const checkSpotifyConnection = async () => {
    if (!user) return;

    try {
      // Query the spotify_connections table directly
      const { data, error } = await supabase
        .from('spotify_connections')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error || !data) {
        console.log('No Spotify connection found');
        return;
      }

      const connection = data as SpotifyConnection;

      // Check if token is still valid
      const now = Date.now();
      if (connection.expires_at && now >= connection.expires_at) {
        // Token expired, try to refresh
        await refreshSpotifyToken();
      } else {
        setAccessToken(connection.access_token);
        setIsConnected(true);
        await fetchSpotifyUser(connection.access_token);
        initializeSpotifyPlayer(connection.access_token);
      }
    } catch (error) {
      console.error('Error checking Spotify connection:', error);
    }
  };

  const refreshSpotifyToken = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('spotify-refresh');

      if (error || !data?.success) {
        console.error('Failed to refresh Spotify token:', error);
        setIsConnected(false);
        return;
      }

      setAccessToken(data.access_token);
      setIsConnected(true);
      await fetchSpotifyUser(data.access_token);
      initializeSpotifyPlayer(data.access_token);
    } catch (error) {
      console.error('Error refreshing Spotify token:', error);
      setIsConnected(false);
    }
  };

  const fetchSpotifyUser = async (token: string) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setSpotifyUser(userData);
      }
    } catch (error) {
      console.error('Error fetching Spotify user:', error);
    }
  };

  const initializeSpotifyPlayer = (token: string) => {
    if (!window.Spotify) {
      // Load Spotify SDK if not already loaded
      const script = document.createElement('script');
      script.src = SPOTIFY_CONFIG.SDK_URL;
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        createPlayer(token);
      };
    } else {
      createPlayer(token);
    }
  };

  const createPlayer = (token: string) => {
    const spotifyPlayer = new window.Spotify.Player({
      name: 'Tango Learning App',
      getOAuthToken: (cb: (token: string) => void) => {
        cb(token);
      },
      volume: 0.5
    });

    // Player event listeners
    spotifyPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
      console.log('Spotify Player ready with Device ID:', device_id);
      setDeviceId(device_id);
    });

    spotifyPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
      console.log('Device ID has gone offline:', device_id);
    });

    spotifyPlayer.addListener('player_state_changed', (state: SpotifyPlayerState) => {
      if (!state) return;
      
      setPlayerState(state);
      setIsPlaying(!state.paused);
      setCurrentTrack(state.track_window.current_track);
    });

    spotifyPlayer.addListener('initialization_error', ({ message }: { message: string }) => {
      console.error('Spotify Player initialization error:', message);
    });

    spotifyPlayer.addListener('authentication_error', ({ message }: { message: string }) => {
      console.error('Spotify Player authentication error:', message);
      setIsConnected(false);
    });

    spotifyPlayer.addListener('account_error', ({ message }: { message: string }) => {
      console.error('Spotify Player account error:', message);
    });

    spotifyPlayer.addListener('playback_error', ({ message }: { message: string }) => {
      console.error('Spotify Player playback error:', message);
    });

    spotifyPlayer.connect().then((success: boolean) => {
      if (success) {
        console.log('Successfully connected to Spotify Player');
        setPlayer(spotifyPlayer);
      }
    });
  };

  const connectSpotify = () => {
    if (!user) {
      console.error('User must be logged in to connect Spotify');
      toast.error('Please log in to connect Spotify');
      return;
    }

    if (!SPOTIFY_CONFIG.CLIENT_ID) {
      console.error('Spotify Client ID is not configured');
      toast.error('Spotify configuration error. Please contact support.');
      return;
    }

    try {
      // Generate a random state for security
      const state = Math.random().toString(36).substring(2, 15);
      const redirectUri = `${window.location.origin}/spotify/callback`;
      
      console.log('Connecting to Spotify with:');
      console.log('- Client ID:', SPOTIFY_CONFIG.CLIENT_ID);
      console.log('- Redirect URI:', redirectUri);
      console.log('- State:', state);
      
      // Store state in localStorage for verification
      localStorage.setItem('spotify_auth_state', state);
      
      // Redirect to Spotify authorization
      const authUrl = getSpotifyAuthUrl(state, redirectUri);
      console.log('Redirecting to:', authUrl);
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error generating Spotify auth URL:', error);
      toast.error('Failed to connect to Spotify. Please try again.');
    }
  };

  const disconnectSpotify = async () => {
    if (!user) return;

    try {
      // Delete connection from spotify_connections table
      await supabase
        .from('spotify_connections')
        .delete()
        .eq('user_id', user.id);

      // Disconnect player
      if (player) {
        player.disconnect();
      }

      // Reset state
      setIsConnected(false);
      setSpotifyUser(null);
      setPlayer(null);
      setPlayerState(null);
      setDeviceId(null);
      setIsPlaying(false);
      setCurrentTrack(null);
      setAccessToken(null);
    } catch (error) {
      console.error('Error disconnecting Spotify:', error);
    }
  };

  const playTrack = async (trackUri: string) => {
    if (!accessToken || !deviceId) return;

    try {
      await fetch(`${SPOTIFY_CONFIG.API_BASE_URL}/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({
          uris: [trackUri]
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const pauseTrack = async () => {
    if (player) {
      await player.pause();
    }
  };

  const resumeTrack = async () => {
    if (player) {
      await player.resume();
    }
  };

  const nextTrack = async () => {
    if (player) {
      await player.nextTrack();
    }
  };

  const previousTrack = async () => {
    if (player) {
      await player.previousTrack();
    }
  };

  const setVolume = async (volume: number) => {
    if (player) {
      await player.setVolume(volume);
    }
  };

  const value = {
    isConnected,
    spotifyUser,
    player,
    playerState,
    deviceId,
    isPlaying,
    currentTrack,
    loading,
    connectSpotify,
    disconnectSpotify,
    playTrack,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    setVolume
  };

  return <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>;
};
