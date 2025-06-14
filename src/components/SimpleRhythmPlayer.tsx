
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { initializeAudioContext } from '@/utils/audioUtils';

interface SimpleRhythmPlayerProps {
  pattern: boolean[];
  label?: string;
  speedLevel?: number;
}

const SimpleRhythmPlayer = ({ pattern, label = "", speedLevel = 1 }: SimpleRhythmPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Speed levels: 1 = slow (600ms), 2 = medium (400ms), 3 = fast (300ms)
  const getInterval = () => {
    switch (speedLevel) {
      case 2: return 400;
      case 3: return 300;
      default: return 600;
    }
  };

  const playBeep = (frequency: number = 800) => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  };

  const handlePlay = async () => {
    if (!isPlaying) {
      try {
        audioContextRef.current = await initializeAudioContext();
        console.log('Audio context initialized for SimpleRhythmPlayer');
        
        setIsPlaying(true);
        setCurrentBeat(0);
        
        // Play first beat immediately if it's active
        if (pattern[0]) {
          playBeep();
        }
        
        let beatIndex = 1;
        intervalRef.current = setInterval(() => {
          if (beatIndex >= pattern.length) {
            beatIndex = 0;
          }
          
          setCurrentBeat(beatIndex);
          
          if (pattern[beatIndex]) {
            playBeep();
          }
          
          beatIndex++;
        }, getInterval());
        
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
      }
    } else {
      handleStop();
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentBeat(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-6 border border-cream/20">
      {label && (
        <div className="text-center mb-4">
          <span className="text-gray-700 font-medium text-lg">{label}</span>
        </div>
      )}
      
      <div className="flex items-center justify-center gap-6 mb-6">
        <button
          onClick={handlePlay}
          className="bg-golden-yellow/80 hover:bg-golden-yellow text-warm-brown border-none px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      <div className="flex justify-center items-center gap-4">
        {pattern.map((isActive, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-all duration-200 ${
                currentBeat === index
                  ? 'bg-golden-yellow border-golden-yellow text-warm-brown scale-110 shadow-lg'
                  : isActive
                  ? 'bg-sage-green/80 border-sage-green text-gray-700'
                  : 'bg-cream/60 border-warm-brown/30 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            <div className="text-gray-700 text-sm font-medium">
              {isActive ? 'BEAT' : 'rest'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleRhythmPlayer;
