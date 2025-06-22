import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Zap } from 'lucide-react';
import { ColorChange } from '@/types/rhythm';

interface AudioPlayerProps {
  title: string;
  audioUrl: string;
  colorChanges?: ColorChange[];
  colorEvents?: number[];
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
  const [currentColor, setCurrentColor] = useState('bg-warm-brown/20');
  const [activeEvents, setActiveEvents] = useState<number[]>([]);
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
      setCurrentColor('bg-warm-brown/20');
      setActiveEvents([]);
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

    // Reset to initial color when starting from beginning
    if (currentTime < 0.1) {
      setCurrentColor('bg-warm-brown/20');
      setActiveEvents([]);
      return;
    }

    // Handle segment color changes - find the most recent color change that has passed
    const currentSegment = colorChanges
      .slice()
      .reverse()
      .find(change => currentTimeMs >= change.timestamp);
    
    if (currentSegment) {
      if (currentSegment.color !== currentColor) {
        setCurrentColor(currentSegment.color);
      }
    }

    // Handle event detection - show active events with symbols
    const currentActiveEvents = colorEvents.filter(
      timestamp => Math.abs(currentTimeMs - timestamp) <= 200
    );

    setActiveEvents(currentActiveEvents);
  }, [currentTime, isPlaying, colorChanges, colorEvents, currentColor]);

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Reset color when starting playback
        if (currentTime < 0.1) {
          setCurrentColor('bg-warm-brown/20');
          setActiveEvents([]);
        }
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error(`Failed to play audio ${audioUrl}:`, error);
      setIsPlaying(false);
    }
  };

  // Convert background color to damped/passive color for non-playing state
  const getDampedColor = (bgColor: string) => {
    const dampedColorMap: { [key: string]: string } = {
      'bg-dusty-rose': 'bg-pink-300/70',
      'bg-terracotta': 'bg-orange-300/70',
      'bg-golden-yellow': 'bg-yellow-300/70',
      'bg-sage-green': 'bg-green-300/70',
      'bg-deep-teal': 'bg-teal-300/70'
    };
    return dampedColorMap[bgColor] || 'bg-gray-300/70';
  };

  // Convert background color to progress color
  const getProgressColor = (bgColor: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-dusty-rose': 'bg-pink-500',
      'bg-terracotta': 'bg-orange-600',
      'bg-golden-yellow': 'bg-yellow-500',
      'bg-sage-green': 'bg-green-500',
      'bg-deep-teal': 'bg-teal-600'
    };
    return colorMap[bgColor] || 'bg-primary';
  };

  // Create progress bar segments based on colorChanges
  const getProgressSegments = () => {
    if (!duration || colorChanges.length === 0) {
      // Single segment with default color
      return [{
        percentage: progress,
        color: 'bg-primary',
        startPercent: 0,
        endPercent: 100
      }];
    }

    const durationMs = duration * 1000;
    const segments = [];
    
    // Sort color changes by timestamp
    const sortedChanges = [...colorChanges].sort((a, b) => a.timestamp - b.timestamp);
    
    let lastTimestamp = 0;
    let defaultColor = 'bg-primary';
    
    for (let i = 0; i <= sortedChanges.length; i++) {
      const currentChange = sortedChanges[i];
      const endTimestamp = currentChange ? currentChange.timestamp : durationMs;
      
      // Calculate percentages for this segment
      const startPercent = (lastTimestamp / durationMs) * 100;
      const endPercent = (endTimestamp / durationMs) * 100;
      
      // Determine how much of this segment should be filled based on current progress
      const segmentProgress = Math.max(0, Math.min(progress, endPercent) - startPercent);
      
      if (segmentProgress > 0) {
        segments.push({
          percentage: segmentProgress,
          color: i === 0 ? defaultColor : getProgressColor(sortedChanges[i - 1].color),
          startPercent,
          endPercent,
          width: endPercent - startPercent
        });
      }
      
      lastTimestamp = endTimestamp;
    }
    
    return segments;
  };

  // Create background segments for passive mode (showing color structure when not playing)
  const getBackgroundSegments = () => {
    if (!duration || colorChanges.length === 0) {
      return [];
    }

    const durationMs = duration * 1000;
    const segments = [];
    
    // Sort color changes by timestamp
    const sortedChanges = [...colorChanges].sort((a, b) => a.timestamp - b.timestamp);
    
    let lastTimestamp = 0;
    
    for (let i = 0; i <= sortedChanges.length; i++) {
      const currentChange = sortedChanges[i];
      const endTimestamp = currentChange ? currentChange.timestamp : durationMs;
      
      // Calculate percentages for this segment
      const startPercent = (lastTimestamp / durationMs) * 100;
      const endPercent = (endTimestamp / durationMs) * 100;
      const width = endPercent - startPercent;
      
      segments.push({
        color: i === 0 ? 'bg-gray-300/70' : getDampedColor(sortedChanges[i - 1].color),
        startPercent,
        width
      });
      
      lastTimestamp = endTimestamp;
    }
    
    return segments;
  };

  // Calculate positions for event markers on progress bar
  const getEventMarkers = () => {
    if (!duration) return [];
    
    return colorEvents.map((timestamp, index) => {
      const percentage = (timestamp / 1000 / duration) * 100;
      return {
        id: index,
        position: percentage,
        timestamp,
        isActive: activeEvents.includes(timestamp)
      };
    });
  };

  return (
    <div className={`${currentColor} backdrop-blur-sm rounded-2xl p-6 border border-cream/20 transition-colors duration-500 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-lg text-gray-700">
          {title}
        </span>
        <Button
          onClick={togglePlayback}
          className="bg-terracotta hover:bg-terracotta/80 text-white border-none transition-all duration-200"
          size="sm"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      </div>
      
      <div className="w-full relative">
        {/* Custom segmented progress bar */}
        <div className="h-6 w-full bg-cream/20 rounded-full overflow-hidden relative">
          {/* Background segments (passive mode colors) */}
          {getBackgroundSegments().map((segment, index) => (
            <div
              key={`bg-${index}`}
              className={`absolute top-0 h-full ${segment.color} transition-all duration-200`}
              style={{
                left: `${segment.startPercent}%`,
                width: `${segment.width}%`
              }}
            />
          ))}
          
          {/* Progress segments (active colors on top) */}
          {getProgressSegments().map((segment, index) => (
            <div
              key={`progress-${index}`}
              className={`absolute top-0 h-full ${segment.color} transition-all duration-200`}
              style={{
                left: `${segment.startPercent}%`,
                width: `${segment.percentage}%`
              }}
            />
          ))}
        </div>
        
        {/* Event markers on progress bar */}
        <div className="absolute inset-0 pointer-events-none">
          {getEventMarkers().map((marker) => (
            <div
              key={marker.id}
              className="absolute top-0 h-full flex items-center justify-center transition-all duration-200"
              style={{ left: `${marker.position}%`, transform: 'translateX(-50%)' }}
            >
              <Zap 
                className={`${
                  marker.isActive 
                    ? 'w-8 h-8 text-yellow-400 drop-shadow-2xl scale-[2] animate-pulse' 
                    : 'w-4 h-4 text-orange-600'
                } transition-all duration-200 font-black stroke-[3]`}
                fill="currentColor"
                strokeWidth={3}
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-sm mt-2 text-gray-600">
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
