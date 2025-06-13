
import React from 'react';
import { Track } from '@/types/rhythm';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';

interface BeatGridProps {
  tracks: Track[];
  currentBeat: number;
  currentHalfBeat: number;
  onToggleBeat: (trackId: string, beatIndex: number, isHalfBeat?: boolean) => void;
  onToggleAllBeats?: (trackId: string) => void;
}

const BeatGrid = ({ tracks, currentBeat, currentHalfBeat, onToggleBeat, onToggleAllBeats }: BeatGridProps) => {
  const isMobile = useIsMobile();
  const beatsToShow = isMobile ? 4 : 8;
  
  const isAllBeatsActive = (track: Track) => {
    return track.pattern.every(beat => beat);
  };

  const getTrackColorClass = (trackColor: string) => {
    // Map old color classes to new boho colors
    const colorMap: { [key: string]: string } = {
      'bg-berlin-red': 'bg-terracotta',
      'bg-berlin-blue': 'bg-deep-teal',
      'bg-berlin-purple': 'bg-dusty-rose',
      'bg-berlin-orange': 'bg-burnt-orange',
      'bg-berlin-lime': 'bg-sage-green',
      'bg-berlin-cyan': 'bg-golden-yellow',
    };
    return colorMap[trackColor] || 'bg-warm-brown';
  };

  return (
    <div className="boho-panel p-4 md:p-8 mb-12 max-w-6xl mx-auto">
      <div className="space-y-4 md:space-y-8">
        {tracks.map((track) => (
          <div key={track.id} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            {/* Track Label and Checkbox */}
            <div className="flex items-center justify-between md:justify-start gap-3 md:min-w-[180px]">
              <div className="track-label min-w-[120px] text-center text-sm">
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
            
            {/* Beat Pattern */}
            <div className="flex gap-1 md:gap-3 flex-1 justify-center">
              {track.pattern.slice(0, beatsToShow).map((isActive, beatIndex) => (
                <div key={beatIndex} className="flex items-center gap-1 md:gap-2">
                  {/* Main beat - responsive sizing */}
                  <button
                    onClick={() => onToggleBeat(track.id, beatIndex, false)}
                    className={`
                      geometric-cell w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16
                      ${isActive ? `${getTrackColorClass(track.color)} active` : ''}
                      ${currentBeat === beatIndex && currentHalfBeat === 0 ? 'current' : ''}
                    `}
                  />
                  
                  {/* Half beat - responsive sizing (except after last beat) */}
                  {beatIndex < beatsToShow - 1 && (
                    <button
                      onClick={() => onToggleBeat(track.id, beatIndex, true)}
                      className={`
                        geometric-cell w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full
                        ${track.halfPattern[beatIndex] ? `${getTrackColorClass(track.color)} active` : ''}
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
      
      {/* Beat Numbers - responsive layout */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mt-6 md:mt-8 justify-center">
        <div className="md:min-w-[180px]"></div>
        <div className="flex gap-1 md:gap-3 justify-center">
          {[1, 2, 3, 4, 1, 2, 3, 4].slice(0, beatsToShow).map((number, index) => (
            <div key={index} className="flex items-center gap-1 md:gap-2">
              <div className="text-center font-body font-medium text-sm w-8 md:w-12 lg:w-16 text-warm-brown">
                {number}
              </div>
              {index < beatsToShow - 1 && (
                <div className="text-center font-body font-medium text-sm w-4 md:w-6 lg:w-8 text-mushroom">
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
