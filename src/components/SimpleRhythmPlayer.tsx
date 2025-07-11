
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { useRhythmPlayback } from '@/hooks/useRhythmPlayback';
import { speedLevels } from '@/data/presets';
import { trackAudioPlay, trackAudioPause } from '@/utils/googleAnalytics';
import { Track, ColorChange, ColorEvent } from '@/types/rhythm';

interface SimpleRhythmPlayerProps {
  pattern: boolean[];
  label: string;
  speedLevel?: number;
  colorChanges?: ColorChange[];
  colorEvents?: ColorEvent[];
}

const SimpleRhythmPlayer = ({ 
  pattern, 
  label, 
  speedLevel = 1, 
  colorChanges = [], 
  colorEvents = [] 
}: SimpleRhythmPlayerProps) => {
  const [currentColor, setCurrentColor] = useState('bg-terracotta');
  const [eventColor, setEventColor] = useState<string | null>(null);

  // Create a track with the given pattern
  const track: Track = {
    id: 'simple-rhythm',
    name: label,
    color: 'bg-terracotta',
    sound: 'bass',
    pattern: pattern,
    halfPattern: new Array(4).fill(false),
    manuallyModified: new Array(8).fill(false),
    halfManuallyModified: new Array(8).fill(false)
  };

  const { isPlaying, currentBeat, togglePlayback, playbackTime } = useRhythmPlayback({
    tracks: [track],
    speedLevels,
    speedLevel: speedLevel,
    maxBeats: 4
  });

  // Handle color changes based on timestamps
  useEffect(() => {
    if (!isPlaying) return;

    // Handle segment color changes
    const currentSegment = colorChanges
      .slice()
      .reverse()
      .find(change => playbackTime >= change.timestamp);
    
    if (currentSegment && currentSegment.color !== currentColor) {
      setCurrentColor(currentSegment.color);
    }

    // Handle event color changes
    const currentEvent = colorEvents.find(
      event => Math.abs(playbackTime - event.timestamp) <= 50
    );

    if (currentEvent) {
      setEventColor(currentEvent.color);
      setTimeout(() => setEventColor(null), 100);
    }
  }, [playbackTime, isPlaying, colorChanges, colorEvents, currentColor]);

  // Enhanced toggle playback with analytics tracking
  const handleTogglePlayback = () => {
    if (isPlaying) {
      trackAudioPause('rhythm_player', label);
    } else {
      trackAudioPlay('rhythm_player', label);
    }
    togglePlayback();
  };

  const displayColor = eventColor || currentColor;

  return (
    <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-6 border border-cream/20">
      <div className="flex items-center justify-between mb-4">
        {label && <span className="font-semibold text-gray-700 text-lg">{label}</span>}
        <Button
          onClick={handleTogglePlayback}
          className={`bg-golden-yellow/80 hover:bg-golden-yellow text-warm-brown border-none ${!label ? 'mx-auto' : ''}`}
          size="sm"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      </div>
      
      {/* Visual rhythm display */}
      <div className="flex gap-3 justify-center">
        {pattern.map((isActive, index) => (
          <div
            key={index}
            className={`
              w-12 h-12 rounded-lg border-2 flex items-center justify-center text-gray-700 font-bold
              ${isActive ? `${displayColor} border-gray-700` : 'bg-warm-brown/40 border-gray-400'}
              ${currentBeat === index ? 'ring-4 ring-golden-yellow scale-110' : ''}
              transition-all duration-200
            `}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleRhythmPlayer;
