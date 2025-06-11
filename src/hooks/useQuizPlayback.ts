
import { useMemo } from 'react';
import { useRhythmPlayback } from './useRhythmPlayback';
import { Track } from '@/types/rhythm';
import { speedLevels } from '@/data/presets';

interface UseQuizPlaybackProps {
  selectedMainBeats: boolean[];
  selectedHalfBeats: boolean[];
}

export const useQuizPlayback = ({ selectedMainBeats, selectedHalfBeats }: UseQuizPlaybackProps) => {
  // Create a track based on user selections
  const userTrack: Track = useMemo(() => {
    // Convert boolean arrays to patterns that match the main page logic
    const mainPattern = new Array(4).fill(false);
    const halfPattern = new Array(4).fill(false);
    
    selectedMainBeats.forEach((selected, index) => {
      if (selected) {
        mainPattern[index] = true;
      }
    });
    
    selectedHalfBeats.forEach((selected, index) => {
      if (selected) {
        halfPattern[index] = true;
      }
    });

    return {
      id: 'user-selection',
      name: 'User Selection',
      color: 'bg-berlin-red',
      sound: 'bass',
      pattern: mainPattern,
      halfPattern: halfPattern,
      manuallyModified: new Array(8).fill(false),
      halfManuallyModified: new Array(8).fill(false)
    };
  }, [selectedMainBeats, selectedHalfBeats]);

  // Use the main rhythm playback hook with the user's track
  const playbackHook = useRhythmPlayback({
    tracks: [userTrack],
    speedLevels,
    speedLevel: 1, // Use MID speed for quiz
    maxBeats: 4
  });

  return playbackHook;
};
