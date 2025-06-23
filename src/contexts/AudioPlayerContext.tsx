
import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface AudioPlayerState {
  isPlaying: boolean;
  currentAudioUrl: string | null;
  currentTitle: string | null;
  currentTime: number;
  duration: number;
  progress: number;
}

interface AudioPlayerContextType {
  // State
  audioState: AudioPlayerState;
  
  // Actions
  playAudio: (audioUrl: string, title: string) => Promise<void>;
  pauseAudio: () => void;
  stopAudio: () => void;
  
  // Utility
  isCurrentlyPlaying: (audioUrl: string) => boolean;
  getCurrentAudioRef: () => HTMLAudioElement | null;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

interface AudioPlayerProviderProps {
  children: ReactNode;
}

export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({ children }) => {
  const [audioState, setAudioState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentAudioUrl: null,
    currentTitle: null,
    currentTime: 0,
    duration: 0,
    progress: 0
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current);
      timeUpdateIntervalRef.current = null;
    }

    setAudioState({
      isPlaying: false,
      currentAudioUrl: null,
      currentTitle: null,
      currentTime: 0,
      duration: 0,
      progress: 0
    });
  };

  const pauseAudio = () => {
    if (audioRef.current && audioState.isPlaying) {
      audioRef.current.pause();
      
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
        timeUpdateIntervalRef.current = null;
      }

      setAudioState(prev => ({
        ...prev,
        isPlaying: false
      }));
    }
  };

  const startTimeTracking = () => {
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current);
    }

    timeUpdateIntervalRef.current = setInterval(() => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration || 0;
        const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

        setAudioState(prev => ({
          ...prev,
          currentTime,
          duration,
          progress
        }));
      }
    }, 100);
  };

  const playAudio = async (audioUrl: string, title: string) => {
    try {
      // If same audio is already playing, just pause it
      if (audioState.currentAudioUrl === audioUrl && audioState.isPlaying) {
        pauseAudio();
        return;
      }

      // If same audio is paused, resume it
      if (audioState.currentAudioUrl === audioUrl && !audioState.isPlaying) {
        if (audioRef.current) {
          await audioRef.current.play();
          startTimeTracking();
          setAudioState(prev => ({
            ...prev,
            isPlaying: true
          }));
        }
        return;
      }

      // Stop any currently playing audio
      if (audioState.isPlaying) {
        stopAudio();
      }

      // Create new audio instance
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      const handleLoadedMetadata = () => {
        setAudioState(prev => ({
          ...prev,
          duration: audio.duration,
          currentAudioUrl: audioUrl,
          currentTitle: title
        }));
      };

      const handleEnded = () => {
        stopAudio();
      };

      const handleError = (e: any) => {
        console.error(`Audio error for ${audioUrl}:`, e);
        stopAudio();
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      // Start playing
      await audio.play();
      startTimeTracking();

      setAudioState(prev => ({
        ...prev,
        isPlaying: true,
        currentAudioUrl: audioUrl,
        currentTitle: title
      }));

    } catch (error) {
      console.error(`Failed to play audio ${audioUrl}:`, error);
      stopAudio();
    }
  };

  const isCurrentlyPlaying = (audioUrl: string): boolean => {
    return audioState.currentAudioUrl === audioUrl && audioState.isPlaying;
  };

  const getCurrentAudioRef = (): HTMLAudioElement | null => {
    return audioRef.current;
  };

  return (
    <AudioPlayerContext.Provider value={{
      audioState,
      playAudio,
      pauseAudio,
      stopAudio,
      isCurrentlyPlaying,
      getCurrentAudioRef
    }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
