
import { Track, PresetRhythm } from '@/types/rhythm';

export const createInitialTracks = (): Track[] => [
  {
    id: 'bass',
    name: 'STRONG',
    color: 'bg-berlin-red',
    sound: 'bass',
    pattern: new Array(8).fill(false),
    halfPattern: new Array(8).fill(false),
    manuallyModified: new Array(8).fill(false),
    halfManuallyModified: new Array(8).fill(false)
  },
  {
    id: 'softbass',
    name: 'WEAK',
    color: 'bg-berlin-blue',
    sound: 'softbass',
    pattern: new Array(8).fill(false),
    halfPattern: new Array(8).fill(false),
    manuallyModified: new Array(8).fill(false),
    halfManuallyModified: new Array(8).fill(false)
  },
  {
    id: 'dragbeat',
    name: 'DRAG',
    color: 'bg-berlin-purple',
    sound: 'dragbeat',
    pattern: new Array(8).fill(false),
    halfPattern: new Array(8).fill(false),
    manuallyModified: new Array(8).fill(false),
    halfManuallyModified: new Array(8).fill(false)
  }
];

export const applyPresetToTrack = (track: Track, preset: PresetRhythm): Track => {
  const newPattern = new Array(8).fill(false);
  const newHalfPattern = new Array(8).fill(false);
  const newManuallyModified = new Array(8).fill(false);
  const newHalfManuallyModified = new Array(8).fill(false);

  // Apply main beats (convert 1-4 to 0-3 indices)
  preset.mainBeats.forEach(beat => {
    const index = beat - 1;
    if (index >= 0 && index < 4) {
      newPattern[index] = true;
      newPattern[index + 4] = true;
    }
  });

  // Apply half beats (convert 1-4 to 0-3 indices)
  preset.halfBeats.forEach(beat => {
    const index = beat - 1;
    if (index >= 0 && index < 4) {
      newHalfPattern[index] = true;
      newHalfPattern[index + 4] = true;
    }
  });

  return {
    ...track,
    pattern: newPattern,
    halfPattern: newHalfPattern,
    manuallyModified: newManuallyModified,
    halfManuallyModified: newHalfManuallyModified
  };
};

export const toggleTrackBeat = (track: Track, beatIndex: number, isHalfBeat = false): Track => {
  if (isHalfBeat) {
    const newHalfPattern = [...track.halfPattern];
    const newHalfManuallyModified = [...track.halfManuallyModified];
    
    newHalfPattern[beatIndex] = !newHalfPattern[beatIndex];

    if (beatIndex >= 4) {
      newHalfManuallyModified[beatIndex] = true;
    } else {
      const mirrorIndex = beatIndex + 4;
      if (!newHalfManuallyModified[mirrorIndex]) {
        newHalfPattern[mirrorIndex] = newHalfPattern[beatIndex];
      }
    }

    return {
      ...track,
      halfPattern: newHalfPattern,
      halfManuallyModified: newHalfManuallyModified
    };
  } else {
    const newPattern = [...track.pattern];
    const newManuallyModified = [...track.manuallyModified];
    
    newPattern[beatIndex] = !newPattern[beatIndex];

    if (beatIndex >= 4) {
      newManuallyModified[beatIndex] = true;
    } else {
      const mirrorIndex = beatIndex + 4;
      if (!newManuallyModified[mirrorIndex]) {
        newPattern[mirrorIndex] = newPattern[beatIndex];
      }
    }

    return {
      ...track,
      pattern: newPattern,
      manuallyModified: newManuallyModified
    };
  }
};

export const clearTrack = (track: Track): Track => ({
  ...track,
  pattern: new Array(8).fill(false),
  halfPattern: new Array(8).fill(false),
  manuallyModified: new Array(8).fill(false),
  halfManuallyModified: new Array(8).fill(false)
});
