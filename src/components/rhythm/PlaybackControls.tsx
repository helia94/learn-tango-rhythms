
import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { initializeAudioContext } from '@/utils/audioUtils';
import { useTranslation } from '@/hooks/useTranslation';
import { trackAudioPlay, trackAudioPause } from '@/utils/googleAnalytics';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onTogglePlayback: () => void;
  onClearAll: () => void;
}

const PlaybackControls = ({ isPlaying, onTogglePlayback, onClearAll }: PlaybackControlsProps) => {
  const { t } = useTranslation();

  const handlePlayClick = async () => {
    // Initialize audio context on first user interaction (required for iOS)
    if (!isPlaying) {
      try {
        await initializeAudioContext();
        trackAudioPlay('rhythm_grid', 'main_playback');
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
      }
    } else {
      trackAudioPause('rhythm_grid', 'main_playback');
    }
    onTogglePlayback();
  };

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <button 
        onClick={handlePlayClick} 
        className={`control-button ${isPlaying ? 'pause' : 'play'} flex items-center gap-3`}
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        {isPlaying ? t('common.pause') : t('common.play')}
      </button>
      
      <button 
        onClick={onClearAll} 
        className="control-button clear flex items-center gap-3"
      >
        <RotateCcw className="w-5 h-5" />
        {t('common.clear')}
      </button>
    </div>
  );
};

export default PlaybackControls;
