import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SpotifyUser, SpotifyTokens, SpotifyPlayer, SpotifyPlayerState } from '@/types/spotify';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { getSpotifyAuthUrl, getSpotifyClientId, SPOTIFY_CONFIG, generateSecureState, detectIOS } from '@/config/spotify';
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
  isIOS: boolean;
  needsUserInteraction: boolean;
  audioContext: AudioContext | null;
  connectSpotify: () => void;
  disconnectSpotify: () => Promise<void>;
  playTrack: (trackUri: string, userInitiated?: boolean) => Promise<void>;
  pauseTrack: () => Promise<void>;
  resumeTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  initializePlayback: () => Promise<void>;
  setIOSAudioContext: (context: AudioContext) => void;
}

// Create context with default values to prevent undefined errors
const defaultContextValue: SpotifyContextType = {
  isConnected: false,
  spotifyUser: null,
  player: null,
  playerState: null,
  deviceId: null,
  isPlaying: false,
  currentTrack: null,
  loading: false,
  isIOS: false,
  needsUserInteraction: false,
  audioContext: null,
  connectSpotify: () => {},
  disconnectSpotify: async () => {},
  playTrack: async () => {},
  pauseTrack: async () => {},
  resumeTrack: async () => {},
  nextTrack: async () => {},
  previousTrack: async () => {},
  setVolume: async () => {},
  initializePlayback: async () => {},
  setIOSAudioContext: () => {}
};

const SpotifyContext = createContext<SpotifyContextType>(defaultContextValue);

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
  const { user, session } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [spotifyUser, setSpotifyUser] = useState<SpotifyUser | null>(null);
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [playerState, setPlayerState] = useState<SpotifyPlayerState | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isIOS] = useState(detectIOS());
  const [needsUserInteraction, setNeedsUserInteraction] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // SECURITY: Force HTTPS everywhere
  useEffect(() => {
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      window.location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`);
    }
  }, []);

  // Initialize the provider
  useEffect(() => {
    setIsInitialized(true);
    
    // On iOS, set needsUserInteraction to true initially
    if (isIOS) {
      setNeedsUserInteraction(true);
      console.log('iOS detected - user interaction will be required for audio playback');
    }
  }, [isIOS]);

  // Check for existing Spotify connection on mount
  useEffect(() => {
    if (user && isInitialized) {
      checkSpotifyConnection();
    }
  }, [user, isInitialized]);

  const checkSpotifyConnection = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Use .maybeSingle() instead of .single() to avoid 406 errors
      const { data, error } = await supabase
        .from('spotify_connections')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error checking Spotify connection:', error);
        setLoading(false);
        return;
      }

      if (!data) {
        setLoading(false);
        return;
      }

      const connection = data as SpotifyConnection;

      // Check if token is still valid (with 5 minute buffer)
      const now = Date.now();
      const bufferTime = 5 * 60 * 1000; // 5 minutes
      if (connection.expires_at && now >= (connection.expires_at - bufferTime)) {
        await refreshSpotifyToken();
      } else {
        setAccessToken(connection.access_token);
        setIsConnected(true);
        await fetchSpotifyUser(connection.access_token);
        initializeSpotifyPlayer(connection.access_token);
      }
    } catch (error) {
      console.error('Error checking Spotify connection:', error);
      setLoading(false);
    }
  };

  const fetchSpotifyUser = async (token: string) => {
    try {
      const response = await fetch(`${SPOTIFY_CONFIG.API_BASE_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setSpotifyUser(userData);
        console.log('Spotify user fetched:', userData.product);
      }
    } catch (error) {
      console.error('Error fetching Spotify user:', error);
    }
  };

  const refreshSpotifyToken = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('spotify-refresh');

      if (error || !data?.success) {
        console.error('Failed to refresh Spotify token:', error);
        setIsConnected(false);
        setAccessToken(null);
        setLoading(false);
        return;
      }

      setAccessToken(data.access_token);
      setIsConnected(true);
      await fetchSpotifyUser(data.access_token);
      initializeSpotifyPlayer(data.access_token);
    } catch (error) {
      console.error('Error refreshing Spotify token:', error);
      setIsConnected(false);
      setAccessToken(null);
      setLoading(false);
    }
  };

  const initializeSpotifyPlayer = (token: string) => {
    if (!window.Spotify) {
      // Load Spotify SDK if not already loaded
      const script = document.createElement('script');
      script.src = SPOTIFY_CONFIG.SDK_URL;
      script.async = true;
      script.crossOrigin = 'anonymous';
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
      console.log('Spotify Player ready with device ID:', device_id);
      setDeviceId(device_id);
      setLoading(false);
      
      // On iOS, we still need user interaction for audio context
      if (isIOS && !audioContext) {
        setNeedsUserInteraction(true);
        console.log('iOS: Audio context not initialized - user interaction required');
      } else if (isIOS && audioContext) {
        setNeedsUserInteraction(false);
        console.log('iOS: Audio context ready');
      }
    });

    spotifyPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
      console.log('Device ID has gone offline:', device_id);
    });

    spotifyPlayer.addListener('player_state_changed', (state: SpotifyPlayerState) => {
      if (!state) return;
      
      setPlayerState(state);
      setIsPlaying(!state.paused);
      setCurrentTrack(state.track_window.current_track);
      
      // If playback started successfully on iOS, audio is working
      if (isIOS && !state.paused && audioContext) {
        setNeedsUserInteraction(false);
        console.log('iOS: Playback started successfully');
      }
    });

    spotifyPlayer.addListener('initialization_error', ({ message }: { message: string }) => {
      console.error('Spotify Player initialization error:', message);
      setLoading(false);
    });

    spotifyPlayer.addListener('authentication_error', ({ message }: { message: string }) => {
      console.error('Spotify Player authentication error:', message);
      
      // Enhanced scope checking
      if (message.includes('Invalid token') || message.includes('scopes')) {
        console.log('Token scope issue detected, attempting refresh...');
        refreshSpotifyToken();
      } else {
        setIsConnected(false);
        setLoading(false);
      }
    });

    spotifyPlayer.addListener('account_error', ({ message }: { message: string }) => {
      console.error('Spotify Player account error:', message);
      setLoading(false);
    });

    spotifyPlayer.addListener('playback_error', ({ message }: { message: string }) => {
      console.error('Spotify Player playback error:', message);
      
      // On iOS, playback errors often mean we need user interaction or audio context
      if (isIOS) {
        if (message.includes('The player must be initialized') || !audioContext) {
          setNeedsUserInteraction(true);
          console.log('iOS: Playback error - audio context needed');
        }
      }
    });

    spotifyPlayer.connect().then((success: boolean) => {
      if (success) {
        setPlayer(spotifyPlayer);
        console.log('Spotify Player connected successfully');
      } else {
        console.error('Failed to connect to Spotify Player');
        setLoading(false);
      }
    });
  };

  const connectSpotify = async () => {
    if (!user || !session) {
      console.error('User must be logged in to connect Spotify');
      toast.error('Please log in to connect Spotify');
      return;
    }

    try {
      setLoading(true);
      // Get the client ID from Supabase
      await getSpotifyClientId();
      
      // SECURITY: Generate cryptographically secure state
      const state = generateSecureState();
      
      // SECURITY: Store state with timestamp for validation
      const stateData = {
        state,
        timestamp: Date.now(),
        userId: user.id
      };
      sessionStorage.setItem('spotify_auth_state', JSON.stringify(stateData));
      
      // SECURITY: Use fixed redirect URI
      const authUrl = await getSpotifyAuthUrl(state);
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error connecting to Spotify:', error);
      toast.error('Failed to connect to Spotify. Please check if the Spotify Client ID is configured in Supabase secrets.');
      setLoading(false);
    }
  };

  const disconnectSpotify = async () => {
    if (!user) return;

    try {
      setLoading(true);
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
      setNeedsUserInteraction(isIOS); // Reset to iOS default
      setAudioContext(null);
    } catch (error) {
      console.error('Error disconnecting Spotify:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize playback - enhanced for iOS
  const initializePlayback = async () => {
    if (!player) return;

    try {
      if (isIOS && (!audioContext || audioContext.state !== 'running')) {
        console.log('iOS: Cannot initialize playback - audio context not ready');
        setNeedsUserInteraction(true);
        return;
      }

      // Start with a very brief pause/resume to initialize
      await player.pause();
      await new Promise(resolve => setTimeout(resolve, 100));
      await player.resume();
      
      if (isIOS) {
        setNeedsUserInteraction(false);
        console.log('iOS: Playback initialized successfully');
      }
    } catch (error) {
      console.error('Error initializing playback:', error);
      if (isIOS) {
        setNeedsUserInteraction(true);
      }
    }
  };

  const playTrack = async (trackUri: string, userInitiated: boolean = false) => {
    if (!accessToken || !deviceId) {
      console.log('Cannot play track - missing token or device');
      return;
    }

    // On iOS, check audio context state
    if (isIOS) {
      if (!audioContext || audioContext.state !== 'running') {
        if (userInitiated) {
          toast.info('Please enable iOS audio first using the setup button above');
        }
        setNeedsUserInteraction(true);
        return;
      }
      
      if (needsUserInteraction && !userInitiated) {
        toast.info('Tap the play button to start playback on iOS');
        return;
      }
    }

    try {
      console.log('Playing track:', trackUri, 'User initiated:', userInitiated);
      
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

  // New function to set iOS audio context from the handler
  const setIOSAudioContext = (context: AudioContext) => {
    setAudioContext(context);
    if (isIOS && context.state === 'running') {
      setNeedsUserInteraction(false);
      console.log('iOS: Audio context set and ready');
    }
  };

  // Provide the context value, ensuring it's never undefined
  const value: SpotifyContextType = {
    isConnected,
    spotifyUser,
    player,
    playerState,
    deviceId,
    isPlaying,
    currentTrack,
    loading,
    isIOS,
    needsUserInteraction,
    audioContext,
    connectSpotify,
    disconnectSpotify,
    playTrack,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    setVolume,
    initializePlayback,
    setIOSAudioContext
  };

  // Only render children when the provider is properly initialized
  if (!isInitialized) {
    return null;
  }

  return <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>;
};
