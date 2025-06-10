import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  color: string;
  sound: string;
  pattern: boolean[];
}

const RhythmGrid = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [speedLevel, setSpeedLevel] = useState(1); // 0 = Slow, 1 = Medium, 2 = Fast
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const speedLevels = [
    { name: 'Slow', bpm: 40 },
    { name: 'Medium', bpm: 60 },
    { name: 'Fast', bpm: 80 }
  ];

  const [tracks, setTracks] = useState<Track[]>([
    {
      id: 'piano',
      name: 'Piano',
      color: 'bg-blue-500',
      sound: 'piano',
      pattern: new Array(8).fill(false)
    },
    {
      id: 'doublebass',
      name: 'Double Bass',
      color: 'bg-amber-600',
      sound: 'doublebass',
      pattern: new Array(8).fill(false)
    }
  ]);

  const playSound = useCallback((soundType: string) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);
    if (soundType === 'piano') {
      // Tango piano: sharp, staccato attack with quick decay
      const frequencies = [261.63, 329.63, 392.00, 523.25]; // C major chord with octave
      const duration = 0.15; // Very short and staccato

      frequencies.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);

        // Mix of square and triangle waves for more percussive piano sound
        oscillator.type = 'triangle';

        // Add a second oscillator for harmonics
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();
        oscillator2.connect(gainNode2);
        gainNode2.connect(masterGain);
        oscillator2.frequency.setValueAtTime(frequency * 2, audioContext.currentTime);
        oscillator2.type = 'square';

        // High-pass filter for brightness
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        // Sharp attack, quick decay for staccato effect
        const noteVolume = 0.25 - index * 0.03;
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
      const fundamentalFreq = 65.41; // Low C
      const duration = 0.6;

      // Create multiple oscillators for rich bass sound
      const oscillators = [];
      const gains = [];

      // Fundamental frequency
      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      const filter1 = audioContext.createBiquadFilter();
      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(masterGain);
      osc1.frequency.setValueAtTime(fundamentalFreq, audioContext.currentTime);
      osc1.type = 'sawtooth';

      // Low-pass filter for warmth
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

      // Strong attack for plucked bass effect
      gain1.gain.setValueAtTime(0, audioContext.currentTime);
      gain1.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 0.1);
      gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      gain2.gain.setValueAtTime(0, audioContext.currentTime);
      gain2.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      gain3.gain.setValueAtTime(0, audioContext.currentTime);
      gain3.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.005);
      gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      osc1.start(audioContext.currentTime);
      osc1.stop(audioContext.currentTime + duration);
      osc2.start(audioContext.currentTime);
      osc2.stop(audioContext.currentTime + duration);
      osc3.start(audioContext.currentTime);
      osc3.stop(audioContext.currentTime + 0.1);
    }

    // Set master volume
    masterGain.gain.setValueAtTime(0.8, audioContext.currentTime);
  }, []);

  const toggleBeat = (trackId: string, beatIndex: number) => {
    setTracks(prevTracks =>
      prevTracks.map(track =>
        track.id === trackId
          ? {
              ...track,
              pattern: track.pattern.map((beat, index) =>
                index === beatIndex ? !beat : beat
              )
            }
          : track
      )
    );
  };

  const clearAll = () => {
    setTracks(prevTracks =>
      prevTracks.map(track => ({
        ...track,
        pattern: new Array(8).fill(false)
      }))
    );
    setCurrentBeat(0);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      const currentBpm = speedLevels[speedLevel].bpm;
      const beatDuration = (60 / currentBpm) * 500; // 8th notes instead of 16th

      intervalRef.current = setInterval(() => {
        setCurrentBeat(prevBeat => {
          const nextBeat = (prevBeat + 1) % 8;
          
          // Play sounds for the current beat (nextBeat) instead of prevBeat
          tracks.forEach(track => {
            if (track.pattern[nextBeat]) {
              playSound(track.sound);
            }
          });

          return nextBeat;
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
  }, [isPlaying, speedLevel, tracks, playSound, speedLevels]);

  return <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Rhythm Lab
          </h1>
          <p className="text-gray-400">Create rhythmic patterns by clicking the grid</p>
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

        {/* Beat indicators */}
        

        {/* Grid */}
        <div className="bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            {tracks.map(track => <div key={track.id} className="flex items-center gap-4">
                <div className="w-24 text-right text-sm font-medium text-gray-300">
                  {track.name}
                </div>
                <div className="grid grid-cols-8 gap-2 flex-1">
                  {track.pattern.map((isActive, beatIndex) => <button key={beatIndex} onClick={() => toggleBeat(track.id, beatIndex)} className={`
                        aspect-square rounded transition-all duration-150 transform
                        ${isActive ? `${track.color} scale-95 shadow-lg` : 'bg-gray-700 hover:bg-gray-600'}
                        ${currentBeat === beatIndex ? 'ring-2 ring-white ring-opacity-50' : ''}
                        hover:scale-105 active:scale-90
                      `} />)}
                </div>
              </div>)}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-400 text-sm max-w-2xl mx-auto">
          <p>Click on the grid to create rhythm patterns. Each row represents a different instrument. 
          Press play to hear your creation and adjust the speed to your liking!</p>
        </div>
      </div>
    </div>;
};

export default RhythmGrid;
