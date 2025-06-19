
import React from 'react';
import { useSpotify } from '@/contexts/SpotifyContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Music, Check, Loader2 } from 'lucide-react';

const SpotifyConnection = () => {
  const { t } = useTranslation();
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
          <Loader2 className="w-5 h-5 animate-spin text-sage-green" />
          <span className="ml-2 text-warm-brown font-medium">{t('profile.spotify.connecting')}</span>
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
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-sage-green/20 rounded-full flex items-center justify-center">
            <Music className="w-5 h-5 text-sage-green" />
          </div>
          <div>
            <h3 className="text-lg font-display text-warm-brown">{t('profile.spotify.title')}</h3>
          </div>
        </div>

        {isConnected ? (
          <div className="space-y-4">
            {/* Connected Status */}
            <div className="flex items-center gap-3 p-3 bg-sage-green/10 rounded-organic border border-sage-green/20">
              <div className="w-12 h-12 bg-gradient-to-br from-sage-green to-deep-teal rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-sage-green font-display">{t('profile.spotify.connected')}</p>
                <p className="text-xs text-warm-brown">{t('profile.spotify.premiumEnabled')}</p>
              </div>
            </div>

            {/* Disconnect Button */}
            <Button 
              onClick={disconnectSpotify}
              variant="outline"
              size="sm"
              className="w-full border-terracotta/30 text-terracotta hover:bg-terracotta/10 rounded-organic font-medium"
            >
              {t('profile.spotify.disconnect')}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Not Connected Status */}
            <div className="flex items-center gap-3 p-3 bg-mushroom/10 rounded-organic border border-mushroom/20">
              <div className="w-12 h-12 bg-gradient-to-br from-mushroom to-warm-brown rounded-full flex items-center justify-center shadow-lg">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-warm-brown font-display">{t('profile.spotify.notConnected')}</p>
                <p className="text-xs text-mushroom">{t('profile.spotify.premiumRequired')}</p>
              </div>
            </div>

            {/* Connect Button */}
            <Button 
              onClick={connectSpotify}
              className="w-full bg-gradient-to-r from-sage-green to-deep-teal hover:from-deep-teal hover:to-sage-green text-white rounded-organic shadow-lg hover:shadow-xl transition-all duration-300 font-medium transform hover:-translate-y-1"
            >
              <Music className="w-4 h-4 mr-2" />
              {t('profile.spotify.connectPremium')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyConnection;
