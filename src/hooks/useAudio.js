import { useEffect, useState, useRef, useCallback } from 'react';

// Sound effect file paths
const SOUND_EFFECTS = {
  CLICK: '/assets/sounds/click.mp3',
  COLLECT: '/assets/sounds/collect.mp3',
  GAME_OVER: '/assets/sounds/game_over.mp3',
  LEVEL_COMPLETE: '/assets/sounds/level_complete.mp3',
  POWERUP: '/assets/sounds/powerup.mp3',
  SHIELD: '/assets/sounds/shield.mp3',
  HIT: '/assets/sounds/hit.mp3',
  SWIPE: '/assets/sounds/swipe.mp3',
  BACKGROUND: '/assets/sounds/background.mp3',
};

// Cache for preloaded audio
const audioCache = {};

/**
 * Custom hook for managing audio in the game
 * @param {boolean} isMuted - Whether audio should be muted
 * @returns Audio utility functions
 */
const useAudio = (isMuted = false) => {
  const [muted, setMuted] = useState(isMuted);
  const [volume, setVolume] = useState(0.7);
  const backgroundMusicRef = useRef(null);
  
  // Preload audio files
  useEffect(() => {
    // Preload essential sound effects
    Object.values(SOUND_EFFECTS).forEach(soundPath => {
      if (!audioCache[soundPath]) {
        const audio = new Audio(soundPath);
        audio.preload = 'auto';
        audio.load();
        audioCache[soundPath] = audio;
      }
    });
    
    // Create background music instance
    if (!backgroundMusicRef.current) {
      backgroundMusicRef.current = new Audio(SOUND_EFFECTS.BACKGROUND);
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.volume = volume * 0.5; // Background music is quieter
    }
    
    return () => {
      // Stop any playing audio on unmount
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
    };
  }, [volume]);
  
  // Toggle mute state
  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const newMuted = !prev;
      
      // Apply mute state to background music
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.muted = newMuted;
      }
      
      return newMuted;
    });
  }, []);
  
  // Adjust volume
  const adjustVolume = useCallback((newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    
    // Apply new volume to background music
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = clampedVolume * 0.5;
    }
  }, []);
  
  // Play a sound effect
  const playSound = useCallback((soundType) => {
    if (muted) return;
    
    const soundPath = SOUND_EFFECTS[soundType];
    if (!soundPath) return;
    
    // Use cached audio if available, otherwise create a new one
    const sound = audioCache[soundPath] 
      ? audioCache[soundPath].cloneNode() 
      : new Audio(soundPath);
    
    sound.volume = volume;
    sound.play().catch(err => console.error('Error playing sound:', err));
  }, [muted, volume]);
  
  // Start background music
  const startBackgroundMusic = useCallback(() => {
    if (!backgroundMusicRef.current || muted) return;
    
    backgroundMusicRef.current.currentTime = 0;
    backgroundMusicRef.current.play().catch(err => {
      console.error('Error playing background music:', err);
    });
  }, [muted]);
  
  // Stop background music
  const stopBackgroundMusic = useCallback(() => {
    if (!backgroundMusicRef.current) return;
    
    backgroundMusicRef.current.pause();
    backgroundMusicRef.current.currentTime = 0;
  }, []);
  
  // Pause background music
  const pauseBackgroundMusic = useCallback(() => {
    if (!backgroundMusicRef.current) return;
    
    backgroundMusicRef.current.pause();
  }, []);
  
  // Resume background music
  const resumeBackgroundMusic = useCallback(() => {
    if (!backgroundMusicRef.current || muted) return;
    
    backgroundMusicRef.current.play().catch(err => {
      console.error('Error resuming background music:', err);
    });
  }, [muted]);
  
  return {
    muted,
    volume,
    toggleMute,
    adjustVolume,
    playSound,
    startBackgroundMusic,
    stopBackgroundMusic,
    pauseBackgroundMusic,
    resumeBackgroundMusic,
    SOUND_TYPES: Object.keys(SOUND_EFFECTS),
  };
};

export default useAudio; 