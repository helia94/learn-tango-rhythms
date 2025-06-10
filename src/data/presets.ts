
import { PresetRhythm, SpeedLevel } from '@/types/rhythm';

export const speedLevels: SpeedLevel[] = [
  { name: 'SLOW', bpm: 40 },
  { name: 'MID', bpm: 60 },
  { name: 'FAST', bpm: 80 }
];

export const presetRhythms: PresetRhythm[] = [
  { name: 'MERCATO 1', category: 'BASE', mainBeats: [1], halfBeats: [] },
  { name: 'MERCATO 2', category: 'BASE', mainBeats: [1, 3], halfBeats: [] },
  { name: 'MERCATO 2X', category: 'BASE', mainBeats: [2, 4], halfBeats: [] },
  { name: 'MERCATO 4', category: 'BASE', mainBeats: [1, 2, 3, 4], halfBeats: [] },
  { name: 'NORMAL', category: 'SYNC', mainBeats: [1, 3], halfBeats: [1] },
  { name: 'AIR', category: 'SYNC', mainBeats: [1, 3], halfBeats: [4] },
  { name: 'DOUBLE', category: 'SYNC', mainBeats: [1, 3], halfBeats: [1, 2] },
  { name: '4-1', category: 'OTHER', mainBeats: [1, 4], halfBeats: [] },
  { name: '3-3-2', category: 'OTHER', mainBeats: [1, 4], halfBeats: [2] },
];
