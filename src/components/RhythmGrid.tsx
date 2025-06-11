
import React, { useState } from 'react';
import { Track, PresetRhythm } from '@/types/rhythm';
import { speedLevels, presetRhythms } from '@/data/presets';
import { createInitialTracks, applyPresetToTrack, toggleTrackBeat, clearTrack } from '@/utils/rhythmUtils';
import { useRhythmPlayback } from '@/hooks/useRhythmPlayback';
import { useIsMobile } from '@/hooks/use-mobile';

import RhythmHeader from './rhythm/RhythmHeader';
import PlaybackControls from './rhythm/PlaybackControls';
import SpeedControl from './rhythm/SpeedControl';
import BeatGrid from './rhythm/BeatGrid';
import PresetPanel from './rhythm/PresetPanel';
import Instructions from './rhythm/Instructions';

const RhythmGrid = () => {
  const [speedLevel, setSpeedLevel] = useState(1);
  const [tracks, setTracks] = useState<Track[]>(createInitialTracks());
  const isMobile = useIsMobile();
  const maxBeats = isMobile ? 4 : 8;

  const { isPlaying, currentBeat, currentHalfBeat, togglePlayback } = useRhythmPlayback({
    tracks,
    speedLevels,
    speedLevel,
    maxBeats
  });

  const applyPreset = (trackId: string, preset: PresetRhythm) => {
    setTracks(prevTracks =>
      prevTracks.map(track => {
        if (track.id !== trackId) return track;
        return applyPresetToTrack(track, preset);
      })
    );
  };

  const toggleBeat = (trackId: string, beatIndex: number, isHalfBeat = false) => {
    setTracks(prevTracks =>
      prevTracks.map(track => {
        if (track.id !== trackId) return track;
        return toggleTrackBeat(track, beatIndex, isHalfBeat);
      })
    );
  };

  const toggleAllBeats = (trackId: string) => {
    setTracks(prevTracks =>
      prevTracks.map(track => {
        if (track.id !== trackId) return track;
        
        const allActive = track.pattern.every(beat => beat);
        const newPattern = allActive ? new Array(8).fill(false) : new Array(8).fill(true);
        
        return {
          ...track,
          pattern: newPattern,
          manuallyModified: new Array(8).fill(true)
        };
      })
    );
  };

  const clearAll = () => {
    setTracks(prevTracks => prevTracks.map(clearTrack));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 pixelated">
      <div className="max-w-7xl mx-auto">
        <RhythmHeader />

        {/* Main Controls - Stack on mobile */}
        <div className="flex flex-col items-center justify-center gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <PlaybackControls 
              isPlaying={isPlaying}
              onTogglePlayback={togglePlayback}
              onClearAll={clearAll}
            />
            
            <SpeedControl 
              speedLevels={speedLevels}
              currentSpeedLevel={speedLevel}
              onSpeedChange={setSpeedLevel}
            />
          </div>
        </div>

        <BeatGrid 
          tracks={tracks}
          currentBeat={currentBeat}
          currentHalfBeat={currentHalfBeat}
          onToggleBeat={toggleBeat}
          onToggleAllBeats={toggleAllBeats}
        />

        <PresetPanel 
          presetRhythms={presetRhythms}
          onApplyPreset={applyPreset}
        />

        <Instructions />
      </div>
    </div>
  );
};

export default RhythmGrid;
