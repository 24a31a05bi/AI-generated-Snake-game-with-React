/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Terminal } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-[#00ffff] overflow-hidden relative font-digital selection:bg-[#ff00ff]/50">
      <div className="static-noise"></div>
      <div className="scanlines"></div>
      
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col relative z-10 screen-tear">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-8 border-b-4 border-[#ff00ff] pb-6">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-black border-4 border-[#00ffff] shadow-[8px_8px_0px_#ff00ff]">
              <Terminal size={40} className="text-[#00ffff] animate-pulse" />
            </div>
            <div>
              <h1 className="text-6xl font-bold tracking-widest text-[#00ffff] glitch-text" data-text="SNAKE.EXE">
                SNAKE.EXE
              </h1>
              <p className="text-2xl text-[#ff00ff] uppercase tracking-[0.5em] animate-pulse mt-2">
                // CORRUPTED_SECTOR
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col xl:flex-row gap-12 items-center xl:items-start justify-center">
          
          {/* Left/Center: Snake Game */}
          <div className="flex-1 w-full max-w-3xl flex justify-center">
            <SnakeGame />
          </div>

          {/* Right: Music Player */}
          <div className="w-full xl:w-96 flex-shrink-0 flex justify-center">
            <MusicPlayer />
          </div>

        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-xl text-[#ff00ff] uppercase tracking-widest border-t-4 border-[#00ffff] pt-4">
          <p>TERMINAL_ID: 0x8F9A // STATUS: UNSTABLE // AWAITING_INPUT</p>
        </footer>
      </div>
    </div>
  );
}

