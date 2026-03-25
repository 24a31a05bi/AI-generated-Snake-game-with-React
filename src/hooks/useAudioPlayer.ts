import { useState, useEffect, useRef, useCallback } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  coverUrl: string;
}

export function useAudioPlayer(tracks: Track[]) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element once
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const setAudioData = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    const setAudioTime = () => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime);
      }
    };

    const handleEnded = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    audioRef.current.addEventListener('loadeddata', setAudioData);
    audioRef.current.addEventListener('timeupdate', setAudioTime);
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadeddata', setAudioData);
        audioRef.current.removeEventListener('timeupdate', setAudioTime);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [tracks.length]);

  // Handle track change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrackIndex].url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
    }
  }, [currentTrackIndex, tracks, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch(e => console.error("Playback failed", e));
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  }, [tracks.length]);

  const prevTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  }, [tracks.length]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  }, []);

  return {
    currentTrack: tracks[currentTrackIndex],
    isPlaying,
    progress,
    duration,
    volume,
    togglePlayPause,
    nextTrack,
    prevTrack,
    setVolume,
    seek,
  };
}
