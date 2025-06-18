import { supabase } from '@/integrations/supabase/client';

export const SPOTIFY_CONFIG = {
  CLIENT_ID: '', // Will be loaded dynamically from Supabase
  SCOPES: [
    'streaming',
    'user-modify-playback-state'
  ].join(' '),
  SDK_URL: 'https://sdk.scdn.co/spotify-player.js',
  API_BASE_URL: 'https://api.spotify.com/v1',
  ACCOUNTS_BASE_URL: 'https://accounts.spotify.com'
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

export const getSpotifyAuthUrl = async (state: string, redirectUri: string): Promise<string> => {
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
      redirect_uri: redirectUri,
      state: state,
      show_dialog: 'true'
    });

    const authUrl = `${SPOTIFY_CONFIG.ACCOUNTS_BASE_URL}/authorize?${params.toString()}`;
    console.log('Generated Spotify auth URL:', authUrl);
    console.log('Client ID being used:', clientId);
    
    return authUrl;
  } catch (error) {
    console.error('Error generating Spotify auth URL:', error);
    throw error;
  }
};
