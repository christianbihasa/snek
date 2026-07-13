import React, { useState } from "react";
import { THEME_PRESETS } from "../game/themes";

export default function SettingsModal({
  currentSpeed,
  currentFoodCount,
  currentTheme,
  onSave,
  onClose,
}) {
  const [speed, setSpeed] = useState(currentSpeed);
  const [foodCount, setFoodCount] = useState(currentFoodCount);
  const [theme, setTheme] = useState(currentTheme || 'CYBERPUNK');
  
  // Track hovered theme to make selection feel incredibly dynamic and organic
  const [hoveredTheme, setHoveredTheme] = useState(null);
  const activePreviewTheme = hoveredTheme || theme;
  const previewColors = THEME_PRESETS[activePreviewTheme] || THEME_PRESETS.CYBERPUNK;

  const handleSpeedChange = (val) => {
    let num = parseFloat(val);
    if (isNaN(num)) num = 1.0;
    if (num < 1.0) num = 1.0;
    if (num > 5.0) num = 5.0;
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
    onSave({ speed, foodCount, theme });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-mono">
      {/* Container expanded from max-w-md to max-w-2xl to fit the side-by-side preview panel */}
      <div className="w-full max-w-2xl bg-slate-900 border-2 border-cyan-500/50 rounded-2xl p-6 text-white shadow-[0_0_50px_rgba(6,182,212,0.25)] grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        
        {/* LEFT COLUMN: Input Form Controls */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-xl font-bold tracking-wider text-cyan-400 mb-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
              Modifiers
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-14 bg-slate-950 border border-slate-700 text-cyan-400 font-bold text-center py-1 rounded-lg text-sm focus:outline-none focus:border-cyan-400"
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
                    className="w-14 bg-slate-950 border border-slate-700 text-cyan-400 font-bold text-center py-1 rounded-lg text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Theme Selection Grid */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 block">
                  Color Theme Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(THEME_PRESETS).map(([key, value]) => {
                    const isSelected = theme === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTheme(key)}
                        onMouseEnter={() => setHoveredTheme(key)}
                        onMouseLeave={() => setHoveredTheme(null)}
                        className={`p-2.5 text-left rounded-xl border transition-all flex flex-col gap-1.5 cursor-pointer ${
                          isSelected
                            ? "border-cyan-400 bg-slate-950/90 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                            : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                        }`}
                      >
                        <span className={`text-[11px] font-bold ${isSelected ? "text-cyan-400" : "text-slate-300"}`}>
                          {value.name}
                        </span>
                        
                        {/* Compact Color Swatch Bar */}
                        <div className="flex w-full h-2 rounded-sm overflow-hidden border border-slate-950">
                          <div className="w-[35%] h-full" style={{ backgroundColor: value.bg }} />
                          <div className="w-[15%] h-full" style={{ backgroundColor: value.head }} />
                          <div className="w-[15%] h-full" style={{ backgroundColor: value.body }} />
                          <div className="w-[35%] h-full" style={{ backgroundColor: value.food }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 py-2 border border-slate-700 text-slate-400 font-bold uppercase rounded-xl hover:text-white transition-colors cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-cyan-500 text-slate-950 font-bold uppercase rounded-xl hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer text-xs"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Micro Arcade Monitor Theme Preview Display */}
        <div className="hidden md:flex flex-col justify-center items-center bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 self-stretch min-h-[280px]">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
            Live Display Matrix
          </span>

          {/* Simulated Retro Square Game Arena */}
          <div
            className="w-44 h-44 rounded-xl border-4 relative transition-colors duration-300 flex items-center justify-center overflow-hidden shadow-inner"
            style={{ 
              backgroundColor: previewColors.bg,
              borderColor: `${previewColors.head}40` // Adds 25% alpha opacity to the frame
            }}
          >
            {/* Grid Pattern Mesh Background */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:14px_14px]" />

            {/* Simulated Snake Segment Body Chain */}
            <div className="absolute top-[40px] left-[28px] flex gap-[2px]">
              <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: previewColors.body }} />
              <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: previewColors.body }} />
              <div 
                className="w-3.5 h-3.5 rounded-sm transition-all duration-300" 
                style={{ 
                  backgroundColor: previewColors.head,
                  boxShadow: `0 0 10px ${previewColors.head}` 
                }} 
              />
            </div>

            {/* Simulated Target Food Spawns */}
            <div 
              className="w-3 h-3 rounded-full absolute bottom-[45px] right-[45px] transition-all duration-300 animate-pulse" 
              style={{ 
                backgroundColor: previewColors.food,
                boxShadow: `0 0 12px ${previewColors.food}`
              }} 
            />
          </div>

          {/* Active Preset Metadata Footer */}
          <span className="text-[10px] text-slate-400 mt-4 uppercase tracking-wider">
            Palette: <strong style={{ color: previewColors.head }}>{THEME_PRESETS[activePreviewTheme].name}</strong>
          </span>
        </div>

      </div>
    </div>
  );
}