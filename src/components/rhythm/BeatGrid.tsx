
import React from 'react';
import { Track } from '@/types/rhythm';
import { Checkbox } from '@/components/ui/checkbox';

interface BeatGridProps {
  tracks: Track[];
  currentBeat: number;
  currentHalfBeat: number;
  onToggleBeat: (trackId: string, beatIndex: number, isHalfBeat?: boolean) => void;
  onToggleAllBeats?: (trackId: string) => void;
}

const BeatGrid = ({ tracks, currentBeat, currentHalfBeat, onToggleBeat, onToggleAllBeats }: BeatGridProps) => {
  const isAllBeatsActive = (track: Track) => {
    return track.pattern.every(beat => beat);
  };

  return (
    <div className="game-panel p-8 mb-12 max-w-6xl mx-auto">
      <div className="space-y-8">
        {tracks.map((track) => (
          <div key={track.id} className="flex items-center gap-6">
            <div className="flex items-center gap-3 min-w-[180px]">
              <div className={`berlin-track-label ${track.color} text-white min-w-[120px] text-center`}>
                {track.name}
              </div>
              {track.id === 'softbass' && onToggleAllBeats && (
                <Checkbox
                  checked={isAllBeatsActive(track)}
                  onCheckedChange={() => onToggleAllBeats(track.id)}
                  className="h-5 w-5"
                />
              )}
            </div>
            <div className="flex gap-3 flex-1 justify-center">
              {track.pattern.map((isActive, beatIndex) => (
                <div key={beatIndex} className="flex items-center gap-2">
                  {/* Main beat - larger square */}
                  <button
                    onClick={() => onToggleBeat(track.id, beatIndex, false)}
                    className={`
                      pixel-grid-cell w-12 h-12 md:w-16 md:h-16
                      ${isActive ? `${track.color} active` : 'bg-white'}
                      ${currentBeat === beatIndex && currentHalfBeat === 0 ? 'current' : ''}
                    `}
                  />
                  
                  {/* Half beat - smaller circle (except after last beat) */}
                  {beatIndex < 7 && (
                    <button
                      onClick={() => onToggleBeat(track.id, beatIndex, true)}
                      className={`
                        pixel-grid-cell w-6 h-6 md:w-8 md:h-8 rounded-full
                        ${track.halfPattern[beatIndex] ? `${track.color} active` : 'bg-white'}
                        ${currentBeat === beatIndex && currentHalfBeat === 1 ? 'current' : ''}
                      `}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Beat Numbers */}
      <div className="flex items-center gap-6 mt-8 justify-center">
        <div className="min-w-[180px]"></div>
        <div className="flex gap-3">
          {[1, 2, 3, 4, 1, 2, 3, 4].map((number, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="text-center font-pixel text-xs w-12 md:w-16 text-foreground">
                {number}
              </div>
              {index < 7 && (
                <div className="text-center font-pixel text-xs w-6 md:w-8 text-muted-foreground">
                  +
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeatGrid;
