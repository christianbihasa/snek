import React from "react";

export default function GameHUD({ score, highScore, onOpenIntro, onOpenSettings }) {
  return (
    <div className="flex justify-between items-center w-full max-w-[600px] px-2 mb-3 font-mono select-none">
      {/* Current Score */}
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-slate-500">
          SCORE:
        </span>
        <span className="text-xl font-bold tracking-wide text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
          {score}
        </span>
      </div>

      {/* High Score & action buttons*/}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-slate-500">
            HI-SCORE:
          </span>
          <span className="text-xl font-bold tracking-wide text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            {highScore}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Settings (⚙) Trigger Button */}
          <button
            onClick={onOpenSettings}
            className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 text-sm font-bold flex items-center justify-center transition-colors cursor-pointer"
            title="Game Settings"
          >
            ⚙
          </button>

          {/* Info (?) Trigger Button */}
          <button
            onClick={onOpenIntro}
            className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
            title="How to Play"
          >
            ?
          </button>
        </div>
      </div>
    </div>
  );
}
