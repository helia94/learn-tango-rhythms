
import React from 'react';
import { useSpotify } from '@/contexts/SpotifyContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, User, Loader2 } from 'lucide-react';

const SpotifyConnection = () => {
  const { 
    isConnected, 
    spotifyUser, 
    loading, 
    connectSpotify, 
    disconnectSpotify 
  } = useSpotify();

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="ml-2">Loading Spotify connection...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="w-5 h-5" />
          Spotify Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isConnected && spotifyUser ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {spotifyUser.images?.[0]?.url && (
                <img 
                  src={spotifyUser.images[0].url} 
                  alt="Spotify Profile"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="font-medium">{spotifyUser.display_name}</p>
                <p className="text-sm text-gray-600">{spotifyUser.email}</p>
                <p className="text-xs text-green-600 capitalize">{spotifyUser.product} Account</p>
              </div>
            </div>
            <Button 
              onClick={disconnectSpotify}
              variant="outline"
              className="w-full"
            >
              Disconnect Spotify
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4" />
              <span>Not connected to Spotify</span>
            </div>
            <p className="text-sm text-gray-500">
              Connect your Spotify account to access premium music features and enhance your learning experience.
            </p>
            <Button 
              onClick={connectSpotify}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Connect Spotify
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpotifyConnection;
