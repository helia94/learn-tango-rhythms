
export interface Track {
  id: string;
  name: string;
  color: string;
  sound: string;
  pattern: boolean[];
  halfPattern: boolean[];
  manuallyModified: boolean[];
  halfManuallyModified: boolean[];
}

export interface PresetRhythm {
  name: string;
  category: string;
  mainBeats: number[];
  halfBeats: number[];
}

export interface SpeedLevel {
  name: string;
  bpm: number;
}

export interface ColorChange {
  timestamp: number; // in milliseconds
  color: string;
}

export interface ColorEvent {
  timestamp: number; // in milliseconds
  color: string;
}
