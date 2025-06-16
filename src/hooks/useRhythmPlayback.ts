
import { useState, useEffect, useRef, useCallback } from 'react';
import { Track, SpeedLevel } from '@/types/rhythm';
import { playSound } from '@/utils/audioUtils';

interface UseRhythmPlaybackProps {
  tracks: Track[];
  speedLevels: SpeedLevel[];
  speedLevel: number;
  maxBeats: number;
}

export const useRhythmPlayback = ({ tracks, speedLevels, speedLevel, maxBeats }: UseRhythmPlaybackProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [currentHalfBeat, setCurrentHalfBeat] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const togglePlayback = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const startPlayback = useCallback(() => {
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = Date.now() - playbackTime;
      const currentBpm = speedLevels[speedLevel].bpm;
      const beatDuration = (60 / currentBpm) * 1000 * 0.5;

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        setPlaybackTime(elapsed);

        setCurrentHalfBeat(prevHalfBeat => {
          const nextHalfBeat = (prevHalfBeat + 1) % 2;
          
          if (nextHalfBeat === 0) {
            setCurrentBeat(prevBeat => {
              const nextBeat = (prevBeat + 1) % maxBeats;
              console.log(`Main beat ${nextBeat} (max: ${maxBeats})`);
              
              tracks.forEach(track => {
                if (track.pattern[nextBeat]) {
                  playSound(track.sound, false);
                }
              });

              return nextBeat;
            });
          } else {
            console.log(`Half beat for beat ${currentBeat} (max: ${maxBeats})`);
            tracks.forEach(track => {
              if (track.halfPattern[currentBeat]) {
                playSound(track.sound, true);
              }
            });
          }

          return nextHalfBeat;
        });
      }, beatDuration);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speedLevel, tracks, speedLevels, currentBeat, maxBeats, playbackTime]);

  // Reset playback time when stopped
  useEffect(() => {
    if (!isPlaying) {
      setPlaybackTime(0);
      setCurrentBeat(0);
      setCurrentHalfBeat(0);
    }
  }, [isPlaying]);

  return {
    isPlaying,
    currentBeat,
    currentHalfBeat,
    playbackTime,
    togglePlayback,
    stopPlayback,
    startPlayback
  };
};
