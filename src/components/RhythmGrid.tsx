import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Play, Pause, RotateCcw, Volume2, Zap } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  color: string;
  sound: string;
  pattern: boolean[];
  halfPattern: boolean[];
  manuallyModified: boolean[];
  halfManuallyModified: boolean[];
}

interface PresetRhythm {
  name: string;
  category: string;
  mainBeats: number[];
  halfBeats: number[];
}

const RhythmGrid = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [currentHalfBeat, setCurrentHalfBeat] = useState(0);
  const [speedLevel, setSpeedLevel] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const speedLevels = [
    { name: 'SLOW', bpm: 40 },
    { name: 'MID', bpm: 60 },
    { name: 'FAST', bpm: 80 }
  ];

  const presetRhythms: PresetRhythm[] = [
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

  const [tracks, setTracks] = useState<Track[]>([
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
  ]);

  const playSound = useCallback((soundType: string, isHalfBeat = false) => {
    console.log(`Playing ${soundType} sound, isHalfBeat: ${isHalfBeat}`);
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);
    
    if (soundType === 'bass') {
      // Strong Bass: Deep, powerful with strong attack
      const fundamentalFreq = isHalfBeat ? 87.31 : 73.42; // E2 and D2
      const duration = isHalfBeat ? 0.3 : 0.5;
      const volumeMultiplier = isHalfBeat ? 0.8 : 1;

      // Main bass oscillator
      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      const filter1 = audioContext.createBiquadFilter();
      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(masterGain);
      osc1.frequency.setValueAtTime(fundamentalFreq, audioContext.currentTime);
      osc1.type = 'sawtooth';

      filter1.type = 'lowpass';
      filter1.frequency.setValueAtTime(300, audioContext.currentTime);
      filter1.Q.setValueAtTime(3, audioContext.currentTime);

      // Sub-bass for power
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.frequency.setValueAtTime(fundamentalFreq * 0.5, audioContext.currentTime);
      osc2.type = 'sine';

      // Attack harmonic
      const osc3 = audioContext.createOscillator();
      const gain3 = audioContext.createGain();
      const filter3 = audioContext.createBiquadFilter();
      osc3.connect(filter3);
      filter3.connect(gain3);
      gain3.connect(masterGain);
      osc3.frequency.setValueAtTime(fundamentalFreq * 2, audioContext.currentTime);
      osc3.type = 'square';
      filter3.type = 'bandpass';
      filter3.frequency.setValueAtTime(250, audioContext.currentTime);

      gain1.gain.setValueAtTime(0, audioContext.currentTime);
      gain1.gain.linearRampToValueAtTime(0.6 * volumeMultiplier, audioContext.currentTime + 0.01);
      gain1.gain.exponentialRampToValueAtTime(0.2 * volumeMultiplier, audioContext.currentTime + 0.1);
      gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      gain2.gain.setValueAtTime(0, audioContext.currentTime);
      gain2.gain.linearRampToValueAtTime(0.4 * volumeMultiplier, audioContext.currentTime + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      gain3.gain.setValueAtTime(0, audioContext.currentTime);
      gain3.gain.linearRampToValueAtTime(0.3 * volumeMultiplier, audioContext.currentTime + 0.005);
      gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      osc1.start(audioContext.currentTime);
      osc1.stop(audioContext.currentTime + duration);
      osc2.start(audioContext.currentTime);
      osc2.stop(audioContext.currentTime + duration);
      osc3.start(audioContext.currentTime);
      osc3.stop(audioContext.currentTime + 0.1);
    } else if (soundType === 'softbass') {
      // Soft Bass: Gentle, mellow tone
      const fundamentalFreq = isHalfBeat ? 98.00 : 82.41; // G2 and E2
      const duration = isHalfBeat ? 0.25 : 0.4;
      const volumeMultiplier = isHalfBeat ? 0.6 : 0.7; // Overall softer

      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      const filter1 = audioContext.createBiquadFilter();
      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(masterGain);
      osc1.frequency.setValueAtTime(fundamentalFreq, audioContext.currentTime);
      osc1.type = 'sine'; // Softer waveform

      filter1.type = 'lowpass';
      filter1.frequency.setValueAtTime(200, audioContext.currentTime); // More filtering for softness
      filter1.Q.setValueAtTime(1, audioContext.currentTime);

      // Gentle attack and decay
      gain1.gain.setValueAtTime(0, audioContext.currentTime);
      gain1.gain.linearRampToValueAtTime(0.3 * volumeMultiplier, audioContext.currentTime + 0.05); // Slower attack
      gain1.gain.exponentialRampToValueAtTime(0.1 * volumeMultiplier, audioContext.currentTime + 0.2);
      gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      osc1.start(audioContext.currentTime);
      osc1.stop(audioContext.currentTime + duration);
    } else if (soundType === 'dragbeat') {
      // Drag Beat: Very strong with arrastre accent - starts earlier
      const fundamentalFreq = isHalfBeat ? 65.41 : 55.00; // C2 and A1 - very low
      const duration = isHalfBeat ? 0.6 : 0.8; // Longer duration
      const volumeMultiplier = isHalfBeat ? 0.9 : 1.2; // Very strong
      const arrestreDelay = -0.05; // Starts 50ms earlier

      // Main drag oscillator
      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      const filter1 = audioContext.createBiquadFilter();
      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(masterGain);
      osc1.frequency.setValueAtTime(fundamentalFreq, audioContext.currentTime);
      osc1.type = 'sawtooth';

      filter1.type = 'lowpass';
      filter1.frequency.setValueAtTime(150, audioContext.currentTime); // Very deep
      filter1.Q.setValueAtTime(4, audioContext.currentTime);

      // Sub-bass for extra power
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.frequency.setValueAtTime(fundamentalFreq * 0.5, audioContext.currentTime);
      osc2.type = 'sine';

      // Attack noise for the "drag" effect
      const osc3 = audioContext.createOscillator();
      const gain3 = audioContext.createGain();
      const filter3 = audioContext.createBiquadFilter();
      osc3.connect(filter3);
      filter3.connect(gain3);
      gain3.connect(masterGain);
      osc3.frequency.setValueAtTime(fundamentalFreq * 4, audioContext.currentTime);
      osc3.type = 'sawtooth';
      filter3.type = 'bandpass';
      filter3.frequency.setValueAtTime(100, audioContext.currentTime);

      const startTime = Math.max(0, audioContext.currentTime + arrestreDelay);

      gain1.gain.setValueAtTime(0, startTime);
      gain1.gain.linearRampToValueAtTime(0.8 * volumeMultiplier, startTime + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.3 * volumeMultiplier, startTime + 0.15);
      gain1.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      gain2.gain.setValueAtTime(0, startTime);
      gain2.gain.linearRampToValueAtTime(0.6 * volumeMultiplier, startTime + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      gain3.gain.setValueAtTime(0, startTime);
      gain3.gain.linearRampToValueAtTime(0.4 * volumeMultiplier, startTime + 0.01);
      gain3.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      osc1.start(startTime);
      osc1.stop(startTime + duration);
      osc2.start(startTime);
      osc2.stop(startTime + duration);
      osc3.start(startTime);
      osc3.stop(startTime + 0.2);
    }

    masterGain.gain.setValueAtTime(0.8, audioContext.currentTime);
  }, []);

  const applyPreset = (trackId: string, preset: PresetRhythm) => {
    setTracks(prevTracks =>
      prevTracks.map(track => {
        if (track.id !== trackId) return track;

        // Create new patterns
        const newPattern = new Array(8).fill(false);
        const newHalfPattern = new Array(8).fill(false);
        const newManuallyModified = new Array(8).fill(false);
        const newHalfManuallyModified = new Array(8).fill(false);

        // Apply main beats (convert 1-4 to 0-3 indices)
        preset.mainBeats.forEach(beat => {
          const index = beat - 1; // Convert to 0-based index
          if (index >= 0 && index < 4) {
            newPattern[index] = true;
            newPattern[index + 4] = true; // Mirror to beats 5-8
          }
        });

        // Apply half beats (convert 1-4 to 0-3 indices)
        preset.halfBeats.forEach(beat => {
          const index = beat - 1; // Convert to 0-based index
          if (index >= 0 && index < 4) {
            newHalfPattern[index] = true;
            newHalfPattern[index + 4] = true; // Mirror to beats 5-8
          }
        });

        return {
          ...track,
          pattern: newPattern,
          halfPattern: newHalfPattern,
          manuallyModified: newManuallyModified,
          halfManuallyModified: newHalfManuallyModified
        };
      })
    );
  };

  const toggleBeat = (trackId: string, beatIndex: number, isHalfBeat = false) => {
    setTracks(prevTracks =>
      prevTracks.map(track => {
        if (track.id !== trackId) return track;

        if (isHalfBeat) {
          const newHalfPattern = [...track.halfPattern];
          const newHalfManuallyModified = [...track.halfManuallyModified];
          
          newHalfPattern[beatIndex] = !newHalfPattern[beatIndex];

          // If modifying beats 4-7 (second half), mark as manually modified
          if (beatIndex >= 4) {
            newHalfManuallyModified[beatIndex] = true;
          }
          // If modifying beats 0-3 (first half), mirror to second half unless manually modified
          else {
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

          // If modifying beats 4-7 (second half), mark as manually modified
          if (beatIndex >= 4) {
            newManuallyModified[beatIndex] = true;
          }
          // If modifying beats 0-3 (first half), mirror to second half unless manually modified
          else {
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
      })
    );
  };

  const clearAll = () => {
    setTracks(prevTracks =>
      prevTracks.map(track => ({
        ...track,
        pattern: new Array(8).fill(false),
        halfPattern: new Array(8).fill(false),
        manuallyModified: new Array(8).fill(false),
        halfManuallyModified: new Array(8).fill(false)
      }))
    );
    setCurrentBeat(0);
    setCurrentHalfBeat(0);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      const currentBpm = speedLevels[speedLevel].bpm;
      const beatDuration = (60 / currentBpm) * 250; // Half the duration for half beats

      intervalRef.current = setInterval(() => {
        setCurrentHalfBeat(prevHalfBeat => {
          const nextHalfBeat = (prevHalfBeat + 1) % 2;
          
          if (nextHalfBeat === 0) {
            // Moving to main beat
            setCurrentBeat(prevBeat => {
              const nextBeat = (prevBeat + 1) % 8;
              console.log(`Main beat ${nextBeat}`);
              
              // Play sounds for main beats immediately when beat changes
              tracks.forEach(track => {
                if (track.pattern[nextBeat]) {
                  playSound(track.sound, false);
                }
              });

              return nextBeat;
            });
          } else {
            // Moving to half beat - use current beat for half beat sounds
            console.log(`Half beat for beat ${currentBeat}`);
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
  }, [isPlaying, speedLevel, tracks, playSound, speedLevels, currentBeat]);

  // Group presets by category
  const groupedPresets = presetRhythms.reduce((acc, preset) => {
    if (!acc[preset.category]) {
      acc[preset.category] = [];
    }
    acc[preset.category].push(preset);
    return acc;
  }, {} as Record<string, PresetRhythm[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 pixelated">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="berlin-title text-6xl md:text-8xl mb-6">
            RHYTHM LAB
          </h1>
          <div className="game-panel p-6 max-w-4xl mx-auto">
            <p className="font-pixel text-xs md:text-sm text-foreground leading-relaxed">
              CREATE BERLIN BEATS • CLICK SQUARES FOR MAIN BEATS • CLICK DOTS FOR HALF BEATS
            </p>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button 
              onClick={togglePlayback} 
              className={`control-button ${isPlaying ? 'pause' : 'play'} flex items-center gap-3`}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
            
            <button 
              onClick={clearAll} 
              className="control-button clear flex items-center gap-3"
            >
              <RotateCcw className="w-5 h-5" />
              CLEAR
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="berlin-track-label">SPEED</div>
            <div className="flex gap-2">
              {speedLevels.map((speed, index) => (
                <button
                  key={index}
                  onClick={() => setSpeedLevel(index)}
                  className={`preset-button ${speedLevel === index ? 'bg-berlin-lime' : ''}`}
                >
                  {speed.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="game-panel p-8 mb-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            {tracks.map((track, trackIndex) => (
              <div key={track.id} className="flex items-center gap-6">
                <div className={`berlin-track-label ${track.color} text-white min-w-[120px] text-center`}>
                  {track.name}
                </div>
                <div className="flex gap-3 flex-1 justify-center">
                  {track.pattern.map((isActive, beatIndex) => (
                    <div key={beatIndex} className="flex items-center gap-2">
                      {/* Main beat - larger square */}
                      <button
                        onClick={() => toggleBeat(track.id, beatIndex, false)}
                        className={`
                          pixel-grid-cell w-12 h-12 md:w-16 md:h-16
                          ${isActive ? track.color : 'bg-white'}
                          ${currentBeat === beatIndex && currentHalfBeat === 0 ? 'current' : ''}
                        `}
                      />
                      
                      {/* Half beat - smaller circle (except after last beat) */}
                      {beatIndex < 7 && (
                        <button
                          onClick={() => toggleBeat(track.id, beatIndex, true)}
                          className={`
                            pixel-grid-cell w-6 h-6 md:w-8 md:h-8 rounded-full
                            ${track.halfPattern[beatIndex] ? track.color : 'bg-white'}
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
            <div className="min-w-[120px]"></div>
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

        {/* Preset Buttons */}
        <div className="game-panel p-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Zap className="w-8 h-8 text-berlin-orange" />
            <h3 className="font-pixel text-lg text-foreground">STRONG BEAT PRESETS</h3>
          </div>
          
          {/* Desktop: Grid Layout */}
          <div className="hidden md:block space-y-6">
            {Object.entries(groupedPresets).map(([category, presets]) => (
              <div key={category}>
                <div className="berlin-track-label bg-berlin-cyan text-white mb-4 inline-block">
                  {category}
                </div>
                <div className="flex flex-wrap gap-3">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset('bass', preset)}
                      className="preset-button"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2">
                {Object.entries(groupedPresets).map(([category, presets]) => 
                  presets.map((preset) => (
                    <CarouselItem key={preset.name} className="pl-2 basis-auto">
                      <button
                        onClick={() => applyPreset('bass', preset)}
                        className="preset-button whitespace-nowrap"
                      >
                        {preset.name}
                      </button>
                    </CarouselItem>
                  ))
                )}
              </CarouselContent>
              <CarouselPrevious className="pixel-button" />
              <CarouselNext className="pixel-button" />
            </Carousel>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center max-w-4xl mx-auto">
          <div className="game-panel p-6">
            <p className="font-pixel text-xs leading-relaxed text-foreground">
              BERLIN RHYTHM MACHINE • SQUARES = MAIN BEATS • DOTS = HALF BEATS<br/>
              SECOND SET MIRRORS FIRST • MANUAL EDITS BREAK MIRROR<br/>
              PRESS PLAY AND FEEL THE BEAT!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RhythmGrid;
