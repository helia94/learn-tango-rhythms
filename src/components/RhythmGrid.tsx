
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  color: string;
  sound: string;
  pattern: boolean[];
  halfPattern: boolean[]; // Half beats pattern
  manuallyModified: boolean[];
  halfManuallyModified: boolean[]; // Track which half beats were manually modified
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
  const [currentHalfBeat, setCurrentHalfBeat] = useState(0); // 0 = main beat, 1 = half beat
  const [speedLevel, setSpeedLevel] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const speedLevels = [
    { name: 'Slow', bpm: 40 },
    { name: 'Medium', bpm: 60 },
    { name: 'Fast', bpm: 80 }
  ];

  const presetRhythms: PresetRhythm[] = [
    // Base Rhythms
    { name: 'Mercato 1', category: 'Base Rhythms', mainBeats: [1], halfBeats: [] },
    { name: 'Mercato 2', category: 'Base Rhythms', mainBeats: [1, 3], halfBeats: [] },
    { name: 'Mercato 2 Opposite', category: 'Base Rhythms', mainBeats: [2, 4], halfBeats: [] },
    { name: 'Mercato 4', category: 'Base Rhythms', mainBeats: [1, 2, 3, 4], halfBeats: [] },
    
    // Syncopation
    { name: 'Normal', category: 'Syncopation', mainBeats: [1, 3], halfBeats: [1] },
    { name: 'Air', category: 'Syncopation', mainBeats: [1, 3], halfBeats: [4] },
    { name: 'Double', category: 'Syncopation', mainBeats: [1, 3], halfBeats: [1, 2] },
    
    // Other Rhythms
    { name: '4-1', category: 'Other Rhythms', mainBeats: [1, 4], halfBeats: [] },
    { name: '3-3-2', category: 'Other Rhythms', mainBeats: [1, 4], halfBeats: [2] },
  ];

  const [tracks, setTracks] = useState<Track[]>([
    {
      id: 'piano',
      name: 'Piano',
      color: 'bg-blue-500',
      sound: 'piano',
      pattern: new Array(8).fill(false),
      halfPattern: new Array(8).fill(false),
      manuallyModified: new Array(8).fill(false),
      halfManuallyModified: new Array(8).fill(false)
    },
    {
      id: 'doublebass',
      name: 'Double Bass',
      color: 'bg-amber-600',
      sound: 'doublebass',
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
    
    if (soundType === 'piano') {
      // Tango piano: sharp, staccato attack with quick decay
      const frequencies = isHalfBeat 
        ? [293.66, 369.99, 440.00, 587.33] // D major chord (slightly higher)
        : [261.63, 329.63, 392.00, 523.25]; // C major chord
      const duration = isHalfBeat ? 0.1 : 0.15; // Shorter for half beats
      const volumeMultiplier = isHalfBeat ? 0.7 : 1; // Quieter for half beats

      frequencies.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);

        oscillator.type = 'triangle';

        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();
        oscillator2.connect(gainNode2);
        gainNode2.connect(masterGain);
        oscillator2.frequency.setValueAtTime(frequency * 2, audioContext.currentTime);
        oscillator2.type = 'square';

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        const noteVolume = (0.25 - index * 0.03) * volumeMultiplier;
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(noteVolume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode2.gain.linearRampToValueAtTime(noteVolume * 0.3, audioContext.currentTime + 0.005);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration * 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
        oscillator2.start(audioContext.currentTime);
        oscillator2.stop(audioContext.currentTime + duration * 0.5);
      });
    } else if (soundType === 'doublebass') {
      // Tango bass: deep, punchy with strong attack
      const fundamentalFreq = isHalfBeat ? 73.42 : 65.41; // Slightly higher for half beats
      const duration = isHalfBeat ? 0.4 : 0.6; // Shorter for half beats
      const volumeMultiplier = isHalfBeat ? 0.8 : 1; // Slightly quieter for half beats

      // Fundamental frequency
      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      const filter1 = audioContext.createBiquadFilter();
      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(masterGain);
      osc1.frequency.setValueAtTime(fundamentalFreq, audioContext.currentTime);
      osc1.type = 'sawtooth';

      filter1.type = 'lowpass';
      filter1.frequency.setValueAtTime(400, audioContext.currentTime);
      filter1.Q.setValueAtTime(2, audioContext.currentTime);

      // Sub-bass oscillator
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.frequency.setValueAtTime(fundamentalFreq * 0.5, audioContext.currentTime);
      osc2.type = 'sine';

      // Harmonic for pluck sound
      const osc3 = audioContext.createOscillator();
      const gain3 = audioContext.createGain();
      const filter3 = audioContext.createBiquadFilter();
      osc3.connect(filter3);
      filter3.connect(gain3);
      gain3.connect(masterGain);
      osc3.frequency.setValueAtTime(fundamentalFreq * 2, audioContext.currentTime);
      osc3.type = 'triangle';
      filter3.type = 'bandpass';
      filter3.frequency.setValueAtTime(200, audioContext.currentTime);

      gain1.gain.setValueAtTime(0, audioContext.currentTime);
      gain1.gain.linearRampToValueAtTime(0.4 * volumeMultiplier, audioContext.currentTime + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.15 * volumeMultiplier, audioContext.currentTime + 0.1);
      gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      gain2.gain.setValueAtTime(0, audioContext.currentTime);
      gain2.gain.linearRampToValueAtTime(0.3 * volumeMultiplier, audioContext.currentTime + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      gain3.gain.setValueAtTime(0, audioContext.currentTime);
      gain3.gain.linearRampToValueAtTime(0.2 * volumeMultiplier, audioContext.currentTime + 0.005);
      gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      osc1.start(audioContext.currentTime);
      osc1.stop(audioContext.currentTime + duration);
      osc2.start(audioContext.currentTime);
      osc2.stop(audioContext.currentTime + duration);
      osc3.start(audioContext.currentTime);
      osc3.stop(audioContext.currentTime + 0.1);
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

  return <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Rhythm Lab
          </h1>
          <p className="text-gray-400">Create rhythmic patterns by clicking the nodes or selecting presets. Large circles are main beats, small circles are half beats.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <Button onClick={togglePlayback} size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105">
            {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          
          <Button onClick={clearAll} variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-200">
            <RotateCcw className="w-5 h-5 mr-2" />
            Clear All
          </Button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 min-w-[60px]">Speed:</span>
            <div className="flex gap-2">
              {speedLevels.map((speed, index) => <Button key={index} onClick={() => setSpeedLevel(index)} variant={speedLevel === index ? "default" : "outline"} size="sm" className={`transition-all duration-200 ${speedLevel === index ? "bg-primary text-primary-foreground" : "border-gray-600 text-gray-300 hover:bg-gray-800"}`}>
                  {speed.name}
                </Button>)}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="bg-gray-800 rounded-lg p-6 max-w-3xl mx-auto mb-6">
          <div className="space-y-6">
            {tracks.map(track => <div key={track.id} className="flex items-center gap-4">
                <div className="w-24 text-right text-sm font-medium text-gray-300">
                  {track.name}
                </div>
                <div className="flex gap-2 flex-1">
                  {track.pattern.map((isActive, beatIndex) => (
                    <div key={beatIndex} className="flex items-center gap-1">
                      {/* Main beat */}
                      <button
                        onClick={() => toggleBeat(track.id, beatIndex, false)}
                        className={`
                          w-8 h-8 rounded-full transition-all duration-200 transform border-2
                          ${isActive 
                            ? `${track.color} border-white scale-110 shadow-lg shadow-white/30` 
                            : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
                          }
                          ${currentBeat === beatIndex && currentHalfBeat === 0 ? 'ring-4 ring-white ring-opacity-50' : ''}
                          hover:scale-105 active:scale-95
                        `}
                      />
                      
                      {/* Half beat (except after the last beat) */}
                      {beatIndex < 7 && (
                        <button
                          onClick={() => toggleBeat(track.id, beatIndex, true)}
                          className={`
                            w-4 h-4 rounded-full transition-all duration-200 transform border
                            ${track.halfPattern[beatIndex] 
                              ? `${track.color} border-white scale-110 shadow-md shadow-white/20` 
                              : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
                            }
                            ${currentBeat === beatIndex && currentHalfBeat === 1 ? 'ring-2 ring-white ring-opacity-50' : ''}
                            hover:scale-105 active:scale-95
                          `}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>)}
          </div>
          
          {/* Beat numbers */}
          <div className="flex items-center gap-4 mt-6">
            <div className="w-24"></div>
            <div className="flex gap-2 flex-1">
              {[1, 2, 3, 4, 1, 2, 3, 4].map((number, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div className="text-center text-sm text-gray-400 font-medium w-8">
                    {number}
                  </div>
                  {index < 7 && (
                    <div className="text-center text-xs text-gray-500 font-light w-4">
                      +
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Rhythm Presets</h3>
          <div className="space-y-4">
            {tracks.map(track => (
              <div key={track.id} className="flex flex-col gap-4">
                <div className="text-center text-sm font-medium text-gray-300">
                  {track.name}
                </div>
                
                {/* Desktop: Show all buttons in rows */}
                <div className="hidden md:block space-y-3">
                  {Object.entries(groupedPresets).map(([category, presets]) => (
                    <div key={category}>
                      <div className="text-xs text-gray-400 mb-2 font-medium">{category}</div>
                      <div className="flex flex-wrap gap-2">
                        {presets.map((preset) => (
                          <Button
                            key={preset.name}
                            onClick={() => applyPreset(track.id, preset)}
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
                          >
                            {preset.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile: Show buttons in carousel */}
                <div className="md:hidden">
                  <Carousel className="w-full">
                    <CarouselContent className="-ml-2">
                      {Object.entries(groupedPresets).map(([category, presets]) => 
                        presets.map((preset) => (
                          <CarouselItem key={preset.name} className="pl-2 basis-auto">
                            <Button
                              onClick={() => applyPreset(track.id, preset)}
                              variant="outline"
                              size="sm"
                              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 transition-all duration-200 whitespace-nowrap"
                            >
                              {preset.name}
                            </Button>
                          </CarouselItem>
                        ))
                      )}
                    </CarouselContent>
                    <CarouselPrevious className="border-gray-600 text-gray-300 hover:bg-gray-700" />
                    <CarouselNext className="border-gray-600 text-gray-300 hover:bg-gray-700" />
                  </Carousel>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-400 text-sm max-w-2xl mx-auto">
          <p>Choose from preset rhythms or create your own by clicking on the circles. Large circles are main beats, small circles are half beats. 
          The second set of 4 beats automatically mirrors the first 4, unless you manually change them.
          Press play to hear your creation and adjust the speed to your liking!</p>
        </div>
      </div>
    </div>;
};

export default RhythmGrid;
