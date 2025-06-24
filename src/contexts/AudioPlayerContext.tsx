
import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface AudioPlayerState {
  currentPlayerId: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  isLooping: boolean;
}

interface AudioPlayerContextType {
  // State
  audioState: AudioPlayerState;
  
  // Actions
  registerPlayer: (playerId: string, audioUrl: string) => void;
  playAudio: (playerId: string) => Promise<void>;
  pauseAudio: (playerId: string) => void;
  stopAllAudio: () => void;
  setLooping: (looping: boolean) => void;
  
  // Checks
  isPlayerActive: (playerId: string) => boolean;
  isPlayerPlaying: (playerId: string) => boolean;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

interface AudioPlayerProviderProps {
  children: ReactNode;
}

export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({ children }) => {
  const [audioState, setAudioState] = useState<AudioPlayerState>({
    currentPlayerId: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
    isLooping: true // Default to looping enabled
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playersRef = useRef<Map<string, string>>(new Map());
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const registerPlayer = (playerId: string, audioUrl: string) => {
    playersRef.current.set(playerId, audioUrl);
  };

  const setLooping = (looping: boolean) => {
    setAudioState(prev => ({
      ...prev,
      isLooping: looping
    }));
  };

  const stopAllAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Clear any pending loop timeout
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
    
    setAudioState(prev => ({
      ...prev,
      currentPlayerId: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      progress: 0
    }));
  };

  const playAudio = async (playerId: string) => {
    const audioUrl = playersRef.current.get(playerId);
    if (!audioUrl) {
      console.error(`Audio URL not found for player: ${playerId}`);
      return;
    }

    // Stop any currently playing audio
    if (audioState.currentPlayerId && audioState.currentPlayerId !== playerId) {
      stopAllAudio();
    }

    try {
      // Create new audio element if needed or if URL changed
      if (!audioRef.current || audioRef.current.src !== audioUrl) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('error', handleError);
        }

        audioRef.current = new Audio(audioUrl);
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.addEventListener('ended', handleEnded);
        audioRef.current.addEventListener('error', handleError);
      }

      await audioRef.current.play();
      
      setAudioState(prev => ({
        ...prev,
        currentPlayerId: playerId,
        isPlaying: true
      }));
    } catch (error) {
      console.error(`Failed to play audio for player ${playerId}:`, error);
      setAudioState(prev => ({
        ...prev,
        isPlaying: false
      }));
    }
  };

  const pauseAudio = (playerId: string) => {
    if (audioState.currentPlayerId === playerId && audioRef.current) {
      audioRef.current.pause();
      
      // Clear any pending loop timeout when pausing
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
        loopTimeoutRef.current = null;
      }
      
      setAudioState(prev => ({
        ...prev,
        isPlaying: false
      }));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
      
      setAudioState(prev => ({
        ...prev,
        currentTime,
        duration,
        progress
      }));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioState(prev => ({
        ...prev,
        duration: audioRef.current?.duration || 0
      }));
    }
  };

  const handleEnded = () => {
    if (audioState.isLooping && audioState.currentPlayerId) {
      // Set playing to false temporarily during the pause
      setAudioState(prev => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
        progress: 0
      }));
      
      // Restart playback after 1 second pause
      loopTimeoutRef.current = setTimeout(() => {
        if (audioRef.current && audioState.currentPlayerId) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().then(() => {
            setAudioState(prev => ({
              ...prev,
              isPlaying: true
            }));
          }).catch(error => {
            console.error('Failed to restart audio loop:', error);
          });
        }
      }, 1000);
    } else {
      // No looping, just stop
      setAudioState(prev => ({
        ...prev,
        isPlaying: false,
        currentTime: 0,
        progress: 0
      }));
    }
  };

  const handleError = (e: any) => {
    console.error('Audio playback error:', e);
    setAudioState(prev => ({
      ...prev,
      isPlaying: false,
      currentPlayerId: null
    }));
  };

  const isPlayerActive = (playerId: string): boolean => {
    return audioState.currentPlayerId === playerId;
  };

  const isPlayerPlaying = (playerId: string): boolean => {
    return audioState.currentPlayerId === playerId && audioState.isPlaying;
  };

  const contextValue: AudioPlayerContextType = {
    audioState,
    registerPlayer,
    playAudio,
    pauseAudio,
    stopAllAudio,
    setLooping,
    isPlayerActive,
    isPlayerPlaying
  };

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
