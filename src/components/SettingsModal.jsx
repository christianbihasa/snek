import React, { useState } from "react";

export default function SettingsModal({
  currentSpeed,
  currentFoodCount,
  onSave,
  onClose,
}) {
  const [speed, setSpeed] = useState(currentSpeed);
  const [foodCount, setFoodCount] = useState(currentFoodCount);

  const handleSpeedChange = (val) => {
    let num = parseFloat(val);
    if (isNaN(num)) num = 1.0;
    // Clamp bounds securely
    if (num < 1.0) num = 1.0;
    if (num > 5.0) num = 5.0;
    // Lock to 1 decimal place
    setSpeed(Math.round(num * 10) / 10);
  };

  const handleFoodChange = (val) => {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 1;
    if (num < 1) num = 1;
    if (num > 5) num = 5;
    setFoodCount(num);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ speed, foodCount });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-mono">
      <div className="w-full max-w-md bg-slate-900 border-2 border-cyan-500/50 rounded-2xl p-6 text-white shadow-[0_0_50px_rgba(6,182,212,0.25)]">
        <h2 className="text-xl font-bold tracking-wider text-cyan-400 text-center mb-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
          Modifiers
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Speed config */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-slate-400 block">
              Snek Speed
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <input
                type="number"
                min="1.0"
                max="5.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                onBlur={(e) => handleSpeedChange(e.target.value)}
                className="w-16 bg-slate-950 border border-slate-700 text-cyan-400 font-bold text-center py-1 rounded-lg text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Food count config */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-slate-400 block">
              Max Food Spawns
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={foodCount}
                onChange={(e) => setFoodCount(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <input
                type="number"
                min="1"
                max="5"
                step="1"
                value={foodCount}
                onChange={(e) => setFoodCount(e.target.value)}
                onBlur={(e) => handleFoodChange(e.target.value)}
                className="w-16 bg-slate-950 border border-slate-700 text-cyan-400 font-bold text-center py-1 rounded-lg text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Action controls */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 border border-slate-700 text-slate-400 font-bold uppercase rounded-xl hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 bg-cyan-500 text-slate-950 font-bold uppercase rounded-xl hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
