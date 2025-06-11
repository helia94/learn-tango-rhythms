
import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onTogglePlayback: () => void;
  onClearAll: () => void;
}

const PlaybackControls = ({ isPlaying, onTogglePlayback, onClearAll }: PlaybackControlsProps) => {
  return (
    <div className="flex items-center gap-4 md:gap-6">
      <button 
        onClick={onTogglePlayback} 
        className={`control-button text-sm ${isPlaying ? 'pause' : 'play'} flex items-center gap-3`}
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        {isPlaying ? 'PAUSE' : 'PLAY'}
      </button>
      
      <button 
        onClick={onClearAll} 
        className="control-button clear text-sm flex items-center gap-3"
      >
        <RotateCcw className="w-5 h-5" />
        CLEAR
      </button>
    </div>
  );
};

export default PlaybackControls;
