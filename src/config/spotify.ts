
export const SPOTIFY_CONFIG = {
  CLIENT_ID: 'b8c0c5d2b5c04c50a3c9c9d3e4f5a6b7', // Your actual Spotify Client ID
  SCOPES: [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing'
  ].join(' '),
  SDK_URL: 'https://sdk.scdn.co/spotify-player.js',
  API_BASE_URL: 'https://api.spotify.com/v1',
  ACCOUNTS_BASE_URL: 'https://accounts.spotify.com'
};

export const getSpotifyAuthUrl = (state: string, redirectUri: string) => {
  if (!SPOTIFY_CONFIG.CLIENT_ID) {
    console.error('Spotify Client ID is not configured');
    throw new Error('Spotify Client ID is not configured');
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CONFIG.CLIENT_ID,
    scope: SPOTIFY_CONFIG.SCOPES,
    redirect_uri: redirectUri,
    state: state,
    show_dialog: 'true'
  });

  const authUrl = `${SPOTIFY_CONFIG.ACCOUNTS_BASE_URL}/authorize?${params.toString()}`;
  console.log('Generated Spotify auth URL:', authUrl);
  console.log('Client ID being used:', SPOTIFY_CONFIG.CLIENT_ID);
  
  return authUrl;
};
