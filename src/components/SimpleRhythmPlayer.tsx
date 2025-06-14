
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { useRhythmPlayback } from '@/hooks/useRhythmPlayback';
import { Track } from '@/types/rhythm';

interface SimpleRhythmPlayerProps {
  pattern: boolean[];
  label: string;
  bpm?: number;
}

const SimpleRhythmPlayer = ({ pattern, label, bpm = 116 }: SimpleRhythmPlayerProps) => {
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

  // Custom speed levels with configurable BPM
  const customSpeedLevels = [
    { name: 'CUSTOM', bpm: bpm }
  ];

  const { isPlaying, currentBeat, togglePlayback } = useRhythmPlayback({
    tracks: [track],
    speedLevels: customSpeedLevels,
    speedLevel: 0, // Use the first (and only) custom speed level
    maxBeats: 4
  });

  return (
    <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-6 border border-cream/20">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-cream text-lg">{label}</span>
        <Button
          onClick={togglePlayback}
          className="bg-golden-yellow/80 hover:bg-golden-yellow text-warm-brown border-none"
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
              w-12 h-12 rounded-lg border-2 flex items-center justify-center text-cream font-bold
              ${isActive ? 'bg-terracotta border-cream' : 'bg-warm-brown/40 border-cream/40'}
              ${currentBeat === index ? 'ring-4 ring-golden-yellow scale-110' : ''}
              transition-all duration-200
            `}
          >
            {index + 1}
          </div>
        ))}
      </div>
      
      <div className="text-center mt-4 text-cream/80 text-sm">
        Click play to hear the rhythm • {bpm} BPM
      </div>
    </div>
  );
};

export default SimpleRhythmPlayer;
