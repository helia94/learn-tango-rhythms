
import { supabase } from '@/integrations/supabase/client';

export const SPOTIFY_CONFIG = {
  CLIENT_ID: '', // Will be loaded dynamically from Supabase
  SCOPES: [
    'streaming',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-email',
    'user-read-private'
  ].join(' '),
  SDK_URL: 'https://sdk.scdn.co/spotify-player.js',
  API_BASE_URL: 'https://api.spotify.com/v1',
  ACCOUNTS_BASE_URL: 'https://accounts.spotify.com',
  // SECURITY: Single locked redirect URI
  REDIRECT_URI: 'https://tango-diario.com/spotify/callback'
};

// Cache for the client ID to avoid multiple calls
let cachedClientId: string | null = null;

export const getSpotifyClientId = async (): Promise<string> => {
  if (cachedClientId) {
    return cachedClientId;
  }

  try {
    // Call the edge function to get the client ID
    const { data, error } = await supabase.functions.invoke('get-spotify-client-id');
    
    if (error) {
      console.error('Error fetching Spotify Client ID:', error);
      throw new Error('Failed to fetch Spotify Client ID from Supabase');
    }

    if (!data?.client_id) {
      throw new Error('Spotify Client ID not found in Supabase secrets');
    }

    cachedClientId = data.client_id;
    SPOTIFY_CONFIG.CLIENT_ID = cachedClientId;
    return cachedClientId;
  } catch (error) {
    console.error('Error getting Spotify Client ID:', error);
    throw error;
  }
};

// Enhanced iOS detection including iPad Pro detection
export const detectIOS = (): boolean => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  
  // Traditional iOS devices
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return true;
  }
  
  // iPad Pro and newer iPads that report as Mac
  if (platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    return true;
  }
  
  // iOS 13+ iPad detection
  if (platform === 'MacIntel' && 'ontouchend' in document) {
    return true;
  }
  
  return false;
};

// Audio context management for iOS
export const createIOSAudioContext = (): AudioContext | null => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('AudioContext not supported');
      return null;
    }
    
    const audioContext = new AudioContextClass();
    console.log('iOS AudioContext created:', audioContext.state);
    return audioContext;
  } catch (error) {
    console.error('Error creating iOS AudioContext:', error);
    return null;
  }
};

// Initialize audio context for iOS
export const initializeIOSAudio = async (audioContext: AudioContext): Promise<boolean> => {
  try {
    if (audioContext.state === 'suspended') {
      console.log('Resuming suspended AudioContext for iOS...');
      await audioContext.resume();
    }
    
    console.log('iOS AudioContext state after resume:', audioContext.state);
    return audioContext.state === 'running';
  } catch (error) {
    console.error('Error initializing iOS audio:', error);
    return false;
  }
};

// SECURITY: Cryptographic state generation
export const generateSecureState = (): string => {
  // Generate cryptographically secure random state
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const getSpotifyAuthUrl = async (state: string): Promise<string> => {
  try {
    const clientId = await getSpotifyClientId();
    
    if (!clientId) {
      console.error('Spotify Client ID is not configured');
      throw new Error('Spotify Client ID is not configured');
    }

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: SPOTIFY_CONFIG.SCOPES,
      redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI, // SECURITY: Fixed redirect URI
      state: state,
      show_dialog: 'true'
    });

    const authUrl = `${SPOTIFY_CONFIG.ACCOUNTS_BASE_URL}/authorize?${params.toString()}`;
    return authUrl;
  } catch (error) {
    console.error('Error generating Spotify auth URL:', error);
    throw error;
  }
};
