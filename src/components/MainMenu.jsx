import React from 'react';

export default function MainMenu({ onStart }) {
    return (
        <div className="text-center p-8 bg-slate-900/90 border border-cyan-500/20 rounded-2xl touch-manipulation max-w-sm w-full mx-4 shadow-2xl animate-fade-in">
            <h1 className="font-retro text-cyan-400 text-2xl mb-2 tracking-wide uppercase animate-pulse">
                SNEK
            </h1>

            <p className="font-neon text-slate-400 text-xs mb-8 uppercase tracking-widest">
                Classic Snek Game
            </p>

            <button onPointerDown={onStart} className="font-neon w-full py-4 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm uppercase tracking-widest rounded-xl cursor-pointer transition-all duration-200 transform active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                Start Game
            </button>
        </div>
    );
}