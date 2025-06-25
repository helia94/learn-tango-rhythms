
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { createIOSAudioContext, initializeIOSAudio } from '@/config/spotify';
import { toast } from 'sonner';

interface IOSAudioHandlerProps {
  onAudioReady: (audioContext: AudioContext) => void;
  isVisible: boolean;
}

type AudioState = 'pending' | 'initializing' | 'ready' | 'failed';

const IOSAudioHandler: React.FC<IOSAudioHandlerProps> = ({
  onAudioReady,
  isVisible
}) => {
  const [audioState, setAudioState] = useState<AudioState>('pending');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Create audio context on mount but don't initialize yet
    const context = createIOSAudioContext();
    setAudioContext(context);
    
    if (!context) {
      setAudioState('failed');
    }
  }, []);

  const handleIOSAudioSetup = async () => {
    if (!audioContext) {
      toast.error('Audio system not available');
      return;
    }

    setAudioState('initializing');

    try {
      // This must be called from user interaction on iOS
      const success = await initializeIOSAudio(audioContext);
      
      if (success) {
        setAudioState('ready');
        onAudioReady(audioContext);
        toast.success('iOS audio enabled! You can now use full Spotify playback.');
      } else {
        setAudioState('failed');
        toast.error('Failed to enable iOS audio. Please try again.');
      }
    } catch (error) {
      console.error('iOS audio setup failed:', error);
      setAudioState('failed');
      toast.error('iOS audio setup failed. Please try again.');
    }
  };

  if (!isVisible) {
    return null;
  }

  const getStateIcon = () => {
    switch (audioState) {
      case 'pending':
        return <Smartphone className="w-6 h-6 text-blue-600" />;
      case 'initializing':
        return <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'ready':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'failed':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
    }
  };

  const getStateMessage = () => {
    switch (audioState) {
      case 'pending':
        return 'iOS requires manual audio activation for Spotify playback';
      case 'initializing':
        return 'Setting up iOS audio system...';
      case 'ready':
        return 'iOS audio enabled! Full Spotify playback is ready.';
      case 'failed':
        return 'Audio setup failed. Please try again or use the embedded player below.';
    }
  };

  const getButtonText = () => {
    switch (audioState) {
      case 'pending':
        return 'Enable iOS Audio';
      case 'initializing':
        return 'Setting up...';
      case 'ready':
        return 'Audio Ready';
      case 'failed':
        return 'Try Again';
    }
  };

  return (
    <Card className="mb-4 border-2 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {getStateIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-blue-900 mb-1">
              iOS Spotify Setup
            </h3>
            
            <p className="text-sm text-blue-800 mb-3">
              {getStateMessage()}
            </p>
            
            {audioState !== 'ready' && (
              <Button
                onClick={handleIOSAudioSetup}
                disabled={audioState === 'initializing' || !audioContext}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                size="sm"
              >
                <Play className="w-4 h-4" />
                {getButtonText()}
              </Button>
            )}
            
            {audioState === 'ready' && (
              <div className="text-sm text-green-700 font-medium">
                ✅ You can now use the Spotify controls above for full playback
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IOSAudioHandler;
