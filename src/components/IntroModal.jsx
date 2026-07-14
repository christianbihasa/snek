import React from "react";

export default function IntroModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border-2 border-cyan-500/50 rounded-2xl p-6 text-white shadow-[0_0_50px_rgba(6,182,212,0.25)] font-mono transform transition-all animate-modal-enter">
        {/* Top Right Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center rounded-full bg-slate-950/50 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors cursor-pointer text-xs"
          title="Close guide"
        >
          ✕
        </button>

        {/* Title Section */}
        <div className="text-center mb-5 pr-4">
          <h2 className="text-2xl font-bold tracking-wider text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            WELCOME TO SNEK 🐍
          </h2>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">
            Arcade Reimagined
          </p>
        </div>

        <hr className="border-slate-800/60 mb-4" />

        {/* Content Section */}
        <div className="space-y-4 text-xs leading-relaxed text-slate-300">
          {/* Retro Reference */}
          <p>
            Inspired by the legendary{" "}
            <strong className="text-cyan-300">Nokia Snake game (1997)</strong>,
            this modern arcade edition brings high-framerate movement, glowing
            particle background visual effects, and retro sound design straight
            to your browser.
          </p>

          {/* How to Play Box */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-2">
            <p className="font-bold text-cyan-400 uppercase tracking-wide text-[10px] flex items-center gap-1">
              <span>🎯</span> Objective
            </p>
            <p className="text-slate-400 text-[11px]">
              Guide the snek to consume food pellets to grow longer and stack
              your high score. Avoid crashing into the outer walls or your own
              tail!
            </p>
          </div>

          {/* Game Modifiers Section */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-2">
            <p className="font-bold text-cyan-400 uppercase tracking-wide text-[10px] flex items-center gap-1">
              <span>⚙️</span> Custom Modifiers
            </p>
            <p className="text-slate-400 text-[11px] mb-1">
              Customize your arcade runs using the gear icon in the header:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
              <li>
                <strong className="text-slate-200">Snake Speed:</strong> Speed
                up the movement for a chaotic challenge, or dial it back to
                practice routing.
              </li>
              <li>
                <strong className="text-slate-200">Food Multiplier:</strong>{" "}
                Spawn multiple food pellets on the grid simultaneously to rack
                up points instantly.
              </li>
              <li>
                <strong className="text-slate-200">Color Canvas:</strong> Swap
                visual presets on the fly, or build a personalized grid from
                scratch in the <strong>DIY Sandbox Editor</strong>.
              </li>
            </ul>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
              <span className="block font-bold text-slate-200 mb-0.5">
                🖥️ Desktop
              </span>
              <span className="text-slate-400">WASD or Arrow Keys</span>
            </div>
            <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
              <span className="block font-bold text-slate-200 mb-0.5">
                📱 Mobile
              </span>
              <span className="text-slate-400">Swipe anywhere to turn</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 text-center italic mt-2">
            Tip: Reopen this guide or tweak configurations anytime using the
            header options.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
        >
          LET'S PLAY!
        </button>
      </div>
    </div>
  );
}
