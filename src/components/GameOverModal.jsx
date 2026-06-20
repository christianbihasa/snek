import React from 'react';

export default function GameOverModal({ score, onRestart }) {
    return (
        /* animate-fade-in hooks right into the CSS keyframe definition */
        <div className="text-center p-6 bg-slate-900/90 border border-red-500/30 rounded-xl max-w-sm w-full mx-4 animate-fade-in shadow-2xl">
            
            {/* font-retro applies to custom pixel font config */}
            <h2 className="font-retro text-red-500 text-xl md:text-2xl tracking-wider mb-2 animate-pulse">
                GAME OVER
            </h2>

            {/* font-neon handles the secondary UI text */}
            <p className="font-neon text-slate-400 text-sm mb-6">
                Final Score: <span className="text-cyan-400 font-bold">{score}</span>
            </p>

            <button onPointerDown={onRestart} className="font-neon w-full py-3 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase tracking-widest rounded-lg cursor-pointer transform active:scale-95 transition-all duration-150 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                Retry
            </button>
        </div>
    );
}