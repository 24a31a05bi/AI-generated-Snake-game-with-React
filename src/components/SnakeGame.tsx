import React from 'react';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { Play, RotateCcw, Pause, Square } from 'lucide-react';

export function SnakeGame() {
  const {
    snake,
    food,
    isGameOver,
    isPaused,
    score,
    highScore,
    gridSize,
    resetGame,
    togglePause,
  } = useSnakeGame();

  const cellSize = 400 / gridSize;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-6 bg-black border-4 border-[#00ffff] shadow-[8px_8px_0px_#ff00ff] relative">
      
      {/* Header / Scoreboard */}
      <div className="flex justify-between w-full mb-6 text-[#00ffff] font-digital">
        <div className="flex flex-col">
          <span className="text-xl uppercase tracking-widest text-[#ff00ff]">DATA_FRAGMENTS</span>
          <span 
            className="text-7xl font-bold text-[#00ffff] glitch-text"
            data-text={score}
          >
            {score}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xl uppercase tracking-widest text-[#ff00ff]">MAX_CORRUPTION</span>
          <span 
            className="text-5xl font-bold text-[#00ffff] glitch-text"
            data-text={highScore}
          >
            {highScore}
          </span>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative group w-[400px] h-[400px] bg-black border-4 border-[#ff00ff] overflow-hidden">
        
        {/* Grid lines */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)]"
          style={{ backgroundSize: `${cellSize}px ${cellSize}px` }}
        />

        {/* Food */}
        <div 
          className="absolute flex items-center justify-center text-[#ff00ff]"
          style={{
            width: cellSize,
            height: cellSize,
            left: food.x * cellSize,
            top: food.y * cellSize,
          }}
        >
          <Square size={cellSize * 0.9} className="animate-pulse" fill="currentColor" />
        </div>

        {/* Snake */}
        {snake.map((segment, index) => {
          const isHead = index === 0;
          const trailOpacity = Math.max(0.2, 1 - (index / snake.length));
          
          return (
            <div
              key={index}
              className={`absolute flex items-center justify-center ${
                isHead ? 'text-[#00ffff] z-10' : 'text-[#00ffff]'
              }`}
              style={{
                width: cellSize,
                height: cellSize,
                left: segment.x * cellSize,
                top: segment.y * cellSize,
                opacity: isHead ? 1 : trailOpacity,
                transition: 'all 80ms linear',
              }}
            >
              <Square size={cellSize * (isHead ? 1 : 0.8)} fill="currentColor" />
            </div>
          );
        })}

        {/* Overlays */}
        {isGameOver && (
          <div className="absolute inset-0 z-20 bg-black/90 flex flex-col items-center justify-center border-4 border-[#ff00ff] m-2">
            <h2 className="text-5xl font-black text-[#ff00ff] mb-4 tracking-widest uppercase glitch-text" data-text="FATAL_EXCEPTION">FATAL_EXCEPTION</h2>
            <p className="text-[#00ffff] mb-8 text-2xl">FRAGMENTS_LOST: {score}</p>
            <button
              onClick={resetGame}
              className="flex items-center gap-3 px-8 py-4 bg-black text-[#00ffff] border-4 border-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-colors uppercase tracking-widest text-xl shadow-[4px_4px_0px_#ff00ff]"
            >
              <RotateCcw size={24} />
              REBOOT_SEQUENCE
            </button>
          </div>
        )}

        {!isGameOver && isPaused && (
          <div className="absolute inset-0 z-20 bg-black/90 flex flex-col items-center justify-center border-4 border-[#00ffff] m-2">
            <h2 className="text-5xl font-bold text-[#00ffff] mb-8 tracking-widest uppercase glitch-text" data-text="PROCESS_HALTED">PROCESS_HALTED</h2>
            <button
              onClick={togglePause}
              className="flex items-center gap-3 px-8 py-4 bg-black text-[#ff00ff] border-4 border-[#ff00ff] hover:bg-[#ff00ff] hover:text-black transition-colors uppercase tracking-widest text-xl shadow-[4px_4px_0px_#00ffff]"
            >
              <Play size={24} />
              RESUME_EXECUTION
            </button>
          </div>
        )}
      </div>

      {/* Controls Help */}
      <div className="mt-8 flex items-center justify-between w-full text-xl text-[#ff00ff]">
        <div className="flex gap-6">
          <span>[WASD/ARROWS]: OVERRIDE_VECTOR</span>
          <span>[SPACE]: HALT</span>
        </div>
        <button 
          onClick={togglePause}
          className="hover:text-[#00ffff] transition-colors border-2 border-[#ff00ff] p-1"
          title="Pause/Resume"
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      </div>
    </div>
  );
}
