
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ColorChange, ColorEvent } from '@/types/rhythm';

interface AudioPlayerProps {
  title: string;
  audioUrl: string;
  colorChanges?: ColorChange[];
  colorEvents?: ColorEvent[];
  className?: string;
}

const AudioPlayer = ({ 
  title, 
  audioUrl, 
  colorChanges = [], 
  colorEvents = [],
  className = ""
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentColor, setCurrentColor] = useState('bg-terracotta');
  const [eventColor, setEventColor] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      const current = audio.currentTime;
      setCurrentTime(current);
      setProgress((current / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    const handleError = (e: any) => {
      console.error(`Audio error for ${audioUrl}:`, e);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, [audioUrl]);

  // Handle color changes based on timestamps
  useEffect(() => {
    if (!isPlaying) return;

    const currentTimeMs = currentTime * 1000;

    // Handle segment color changes
    const currentSegment = colorChanges
      .slice()
      .reverse()
      .find(change => currentTimeMs >= change.timestamp);
    
    if (currentSegment && currentSegment.color !== currentColor) {
      setCurrentColor(currentSegment.color);
    }

    // Handle event color changes
    const currentEvent = colorEvents.find(
      event => Math.abs(currentTimeMs - event.timestamp) <= 100
    );

    if (currentEvent) {
      setEventColor(currentEvent.color);
      setTimeout(() => setEventColor(null), 200);
    }
  }, [currentTime, isPlaying, colorChanges, colorEvents, currentColor]);

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error(`Failed to play audio ${audioUrl}:`, error);
      setIsPlaying(false);
    }
  };

  const displayColor = eventColor || currentColor;

  return (
    <div className={`bg-warm-brown/20 backdrop-blur-sm rounded-2xl p-6 border border-cream/20 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-gray-700 text-lg">{title}</span>
        <Button
          onClick={togglePlayback}
          className={`${displayColor} hover:opacity-80 text-white border-none transition-all duration-200`}
          size="sm"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      </div>
      
      <div className="w-full">
        <Progress 
          value={progress} 
          className="h-3 bg-cream/20"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default AudioPlayer;
