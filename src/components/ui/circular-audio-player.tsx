
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CircularAudioPlayerProps {
  src: string;
  title: string;
  duration?: string;
  size?: number;
}

export const CircularAudioPlayer: React.FC<CircularAudioPlayerProps> = ({
  src,
  title,
  duration = "0:00",
  size = 120
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const circumference = 2 * Math.PI * (size / 2 - 10);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      console.log(`Pausing audio: ${src}`);
    } else {
      setIsPlaying(true);
      console.log(`Playing audio: ${src}`);
      // Simulate progress for demo
      simulateProgress();
    }
  };

  const simulateProgress = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsPlaying(false);
        setProgress(0);
      }
    }, 100);
  };

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg
          width={size}
          height={size}
          className="transform -rotate-90 absolute"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 10}
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="4"
            fill="none"
            className="opacity-30"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 10}
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300 ease-out drop-shadow-lg"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--terracotta))" />
              <stop offset="50%" stopColor="hsl(var(--burnt-orange))" />
              <stop offset="100%" stopColor="hsl(var(--golden-yellow))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Play/Pause button */}
        <Button
          onClick={togglePlay}
          className={`absolute inset-0 m-auto w-16 h-16 rounded-full 
            bg-gradient-to-br from-cream to-sandy-beige 
            border-2 border-warm-brown/30 shadow-xl
            hover:shadow-2xl hover:scale-105 
            transition-all duration-300 ease-out
            ${isPlaying ? 'animate-pulse' : 'hover:animate-bounce'}`}
          variant="ghost"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-warm-brown" />
          ) : (
            <Play className="w-6 h-6 text-warm-brown ml-1" />
          )}
        </Button>

        {/* Floating orbs animation */}
        {isPlaying && (
          <>
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-golden-yellow rounded-full animate-bounce opacity-70" 
                 style={{ animationDelay: '0s', animationDuration: '1s' }} />
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-terracotta rounded-full animate-bounce opacity-60" 
                 style={{ animationDelay: '0.3s', animationDuration: '1.2s' }} />
            <div className="absolute top-0 -left-3 w-2.5 h-2.5 bg-sage-green rounded-full animate-bounce opacity-50" 
                 style={{ animationDelay: '0.6s', animationDuration: '0.8s' }} />
          </>
        )}
      </div>

      {/* Title and duration */}
      <div className="text-center max-w-[140px]">
        <p className="text-sm font-medium text-warm-brown leading-tight mb-1">
          {title}
        </p>
        <p className="text-xs text-warm-brown/60 font-mono">
          {duration}
        </p>
      </div>

      <audio ref={audioRef} src={src} />
    </div>
  );
};
