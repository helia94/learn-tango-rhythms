
import React from 'react';
import { useSpotify } from '@/contexts/SpotifyContext';
import { Button } from '@/components/ui/button';
import { Music, Check, Loader2 } from 'lucide-react';

const SpotifyConnection = () => {
  const { 
    isConnected, 
    loading, 
    connectSpotify, 
    disconnectSpotify 
  } = useSpotify();

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-sage-green" />
          <span className="ml-3 text-warm-brown font-medium">Loading Spotify connection...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-6 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-6 w-16 h-16 bg-sage-green rounded-full"></div>
        <div className="absolute bottom-4 left-8 w-8 h-8 bg-terracotta rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center">
            <Music className="w-6 h-6 text-sage-green" />
          </div>
          <div>
            <h3 className="text-xl font-display text-warm-brown">Spotify Integration</h3>
            <p className="text-sm text-mushroom">Enhanced music playback</p>
          </div>
        </div>

        {isConnected ? (
          <div className="space-y-6">
            {/* Connected Status */}
            <div className="flex items-center gap-4 p-4 bg-sage-green/10 rounded-organic border border-sage-green/20">
              <div className="w-16 h-16 bg-gradient-to-br from-sage-green to-deep-teal rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="font-medium text-sage-green text-lg font-display">Spotify Connected</p>
                <p className="text-sm text-warm-brown">Full playback control enabled</p>
              </div>
            </div>

            {/* Disconnect Button */}
            <Button 
              onClick={disconnectSpotify}
              variant="outline"
              className="w-full border-terracotta/30 text-terracotta hover:bg-terracotta/10 rounded-organic font-medium"
            >
              Disconnect Spotify
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Not Connected Status */}
            <div className="flex items-center gap-4 p-4 bg-mushroom/10 rounded-organic border border-mushroom/20">
              <div className="w-16 h-16 bg-gradient-to-br from-mushroom to-warm-brown rounded-full flex items-center justify-center shadow-lg">
                <Music className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="font-medium text-warm-brown text-lg font-display">Not Connected</p>
                <p className="text-sm text-mushroom">Connect for enhanced playback</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-sandy-beige/30 rounded-organic p-4 border border-sandy-beige/40">
              <p className="text-sm text-warm-brown leading-relaxed">
                Connect your Spotify Premium account to enable full music playback control. 
                We only request permission for music playback - no access to your personal data or listening history.
              </p>
            </div>

            {/* Connect Button */}
            <Button 
              onClick={connectSpotify}
              className="w-full bg-gradient-to-r from-sage-green to-deep-teal hover:from-deep-teal hover:to-sage-green text-white rounded-organic shadow-lg hover:shadow-xl transition-all duration-300 font-medium transform hover:-translate-y-1"
            >
              <Music className="w-5 h-5 mr-2" />
              Connect Spotify Premium
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyConnection;
