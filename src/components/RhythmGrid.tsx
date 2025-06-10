
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
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
  const [tempo, setTempo] = useState([120]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    // Create a simple oscillator-based sound for demonstration
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different sounds
    const frequencies: { [key: string]: number } = {
      piano: 440, // A4 note
      doublebass: 110 // A2 note (much lower)
    };
    
    oscillator.frequency.setValueAtTime(frequencies[soundType] || 440, audioContext.currentTime);
    oscillator.type = soundType === 'piano' ? 'triangle' : 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + (soundType === 'doublebass' ? 0.8 : 0.3));
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + (soundType === 'doublebass' ? 0.8 : 0.3));
  }, []);

  const toggleBeat = (trackId: string, beatIndex: number) => {
    setTracks(prevTracks =>
      prevTracks.map(track =>
        track.id === trackId
          ? { ...track, pattern: track.pattern.map((beat, index) => index === beatIndex ? !beat : beat) }
          : track
      )
    );
  };

  const clearAll = () => {
    setTracks(prevTracks =>
      prevTracks.map(track => ({ ...track, pattern: new Array(8).fill(false) }))
    );
    setCurrentBeat(0);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      const beatDuration = (60 / tempo[0]) * 500; // 8th notes instead of 16th
      
      intervalRef.current = setInterval(() => {
        setCurrentBeat(prevBeat => {
          const nextBeat = (prevBeat + 1) % 8;
          
          // Play sounds for active beats
          tracks.forEach(track => {
            if (track.pattern[prevBeat]) {
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
  }, [isPlaying, tempo, tracks, playSound]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
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
          <Button
            onClick={togglePlayback}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
          >
            {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          
          <Button
            onClick={clearAll}
            variant="outline"
            size="lg"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Clear All
          </Button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 min-w-[60px]">Tempo:</span>
            <div className="w-32">
              <Slider
                value={tempo}
                onValueChange={setTempo}
                max={180}
                min={60}
                step={1}
                className="cursor-pointer"
              />
            </div>
            <span className="text-sm text-gray-300 min-w-[40px]">{tempo[0]} BPM</span>
          </div>
        </div>

        {/* Beat indicators */}
        <div className="mb-4">
          <div className="grid grid-cols-8 gap-2 max-w-2xl mx-auto mb-2">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className={`h-3 rounded transition-all duration-100 ${
                  currentBeat === i
                    ? 'bg-white scale-110'
                    : i % 2 === 0
                    ? 'bg-gray-600'
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-1 max-w-2xl mx-auto text-center text-xs text-gray-500">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div>

        {/* Grid */}
        <div className="bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            {tracks.map((track) => (
              <div key={track.id} className="flex items-center gap-4">
                <div className="w-24 text-right text-sm font-medium text-gray-300">
                  {track.name}
                </div>
                <div className="grid grid-cols-8 gap-2 flex-1">
                  {track.pattern.map((isActive, beatIndex) => (
                    <button
                      key={beatIndex}
                      onClick={() => toggleBeat(track.id, beatIndex)}
                      className={`
                        aspect-square rounded transition-all duration-150 transform
                        ${isActive 
                          ? `${track.color} scale-95 shadow-lg` 
                          : 'bg-gray-700 hover:bg-gray-600'
                        }
                        ${currentBeat === beatIndex ? 'ring-2 ring-white ring-opacity-50' : ''}
                        hover:scale-105 active:scale-90
                      `}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-400 text-sm max-w-2xl mx-auto">
          <p>Click on the grid to create rhythm patterns. Each row represents a different instrument. 
          Press play to hear your creation and adjust the tempo to your liking!</p>
        </div>
      </div>
    </div>
  );
};

export default RhythmGrid;
