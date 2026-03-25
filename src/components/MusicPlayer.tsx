import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Terminal } from 'lucide-react';
import { useAudioPlayer, Track } from '../hooks/useAudioPlayer';

const DEMO_TRACKS: Track[] = [
  {
    id: '1',
    title: 'MEMORY_LEAK_01',
    artist: 'UNKNOWN_PROCESS',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'BUFFER_OVERFLOW',
    artist: 'SYS_ADMIN',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'NULL_POINTER',
    artist: 'KERNEL_PANIC',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
  },
];

const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    togglePlayPause,
    nextTrack,
    prevTrack,
    setVolume,
    seek,
  } = useAudioPlayer(DEMO_TRACKS);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="w-full max-w-sm bg-black p-6 border-4 border-[#ff00ff] shadow-[8px_8px_0px_#00ffff] flex flex-col items-center relative group">
      
      <div className="relative w-full z-10">
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-6 border-b-2 border-[#00ffff] pb-2">
          <div className="flex items-center gap-2 text-[#00ffff] text-lg uppercase tracking-widest">
            <Terminal size={18} className={isPlaying ? "animate-pulse" : ""} />
            <span>AUDIO_STREAM</span>
          </div>
          <div className="text-[#ff00ff] text-xl glitch-text" data-text={isPlaying ? "ACTIVE" : "IDLE"}>
            {isPlaying ? "ACTIVE" : "IDLE"}
          </div>
        </div>

        {/* Album Art */}
        <div className="relative w-48 h-48 mx-auto mb-6 border-4 border-[#00ffff] overflow-hidden group-hover:border-[#ff00ff] transition-colors">
          <img 
            src={currentTrack.coverUrl} 
            alt={currentTrack.title}
            className={`w-full h-full object-cover filter grayscale contrast-150 ${isPlaying ? 'animate-pulse' : ''}`}
            style={{ mixBlendMode: 'luminosity' }}
          />
          <div className="absolute inset-0 bg-[#00ffff] mix-blend-multiply opacity-50" />
          <div className="absolute inset-0 bg-[#ff00ff] mix-blend-screen opacity-30" />
        </div>

        {/* Track Info */}
        <div className="text-center mb-6 border-2 border-[#ff00ff] p-2 bg-black">
          <h3 className="text-2xl font-bold text-[#00ffff] mb-1 truncate glitch-text" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="text-[#ff00ff] text-lg uppercase tracking-wider truncate">
            {currentTrack.artist}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-6">
          <div className="flex justify-between text-lg text-[#00ffff] mb-2">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-2 bg-black border-2 border-[#00ffff] appearance-none cursor-pointer accent-[#ff00ff]"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <button 
            onClick={prevTrack}
            className="text-[#00ffff] hover:text-[#ff00ff] transition-colors border-2 border-transparent hover:border-[#ff00ff] p-2"
          >
            <SkipBack size={28} />
          </button>
          
          <button 
            onClick={togglePlayPause}
            className="w-16 h-16 flex items-center justify-center bg-black border-4 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-all shadow-[4px_4px_0px_#ff00ff]"
          >
            {isPlaying ? <Pause size={32} className="fill-current" /> : <Play size={32} className="fill-current ml-1" />}
          </button>
          
          <button 
            onClick={nextTrack}
            className="text-[#00ffff] hover:text-[#ff00ff] transition-colors border-2 border-transparent hover:border-[#ff00ff] p-2"
          >
            <SkipForward size={28} />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 px-4 py-3 bg-black border-2 border-[#ff00ff]">
          <button 
            onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
            className="text-[#00ffff] hover:text-[#ff00ff] transition-colors"
          >
            {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-black border-2 border-[#00ffff] appearance-none cursor-pointer accent-[#ff00ff]"
          />
        </div>
      </div>
    </div>
  );
}
