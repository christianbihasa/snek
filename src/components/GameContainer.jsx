import React, { useState, useEffect, useRef } from 'react';
import MainMenu from './MainMenu';
import GameHUD from './GameHUD';
import GameOverModal from './GameOverModal';
import { initGame } from '../game/engine';
import ParticleBackground from './ParticleBackground';
import IntroModal from './IntroModal';
import SettingsModal from './SettingsModal';
import { THEME_PRESETS } from '../game/themes';

export default function GameContainer() {
    const [gameState, setGameState] = useState('MENU'); // 'MENU', 'PLAYING', 'GAME OVER'
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        return parseInt(localStorage.getItem('snekHighScore') || '0', 10)
    });

    const [showIntro, setShowIntro] = useState(() => {
        return !localStorage.getItem('snekHasSeenIntro');
    });

    // Modifiers state
    const [showSettings, setShowSettings] = useState(false);
    const [gameConfig, setGameConfig] = useState({ speed: 1.0, foodCount: 1, theme: 'CYBERPUNK', customColors: undefined });


    const gameRef = useRef(null);

    const canvasRef = useRef(null);
    const gameEngineRef = useRef(null);

    const handleCloseIntro = () => {
        localStorage.setItem('snekHasSeenIntro', 'true');
        setShowIntro(false);
    }

    // Initialize/update game loop when state changes
    useEffect(() => {
        if(canvasRef.current) {
            // Pass states and handlers to the game engine
            gameEngineRef.current = initGame(canvasRef.current, {
                onScoreChange: (newScore) => {
                    setScore(newScore)
                },
                onGameOver: (finalScore) => { 
                    setGameState('GAME OVER');

                    setHighScore((currentHighScore) => {
                        if(finalScore > currentHighScore) {
                            // Cache to browser storage to save even on refresh
                            localStorage.setItem('snekHighScore', finalScore.toString());
                            return finalScore;
                        }
                        return currentHighScore;
                    });
                }
            }, gameConfig);
        }

        return () => {
            if(gameEngineRef.current) gameEngineRef.current.destroy();
        };
    }, [gameConfig]);

    const handleStartGame = () => {
        setScore(0);
        setGameState('PLAYING');
        gameEngineRef.current.start();
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-slate-950 font-mono text-white p-4 select-none touch-none overflow-hidden">
            
            {/* The background stays down at z-0 */}
            <ParticleBackground />

            {showIntro && <IntroModal onClose={handleCloseIntro} />}

            {/* Render settings overlay panel state check */}
            {showSettings && (
                <SettingsModal
                    currentSpeed={gameConfig.speed}
                    currentFoodCount={gameConfig.foodCount}
                    currentTheme={gameConfig.theme}
                    currentCustomColors={gameConfig.customColors}
                    onClose={() => setShowSettings(false)}
                    onSave={(newSettings) => {
                        setGameConfig(newSettings);
                        setShowSettings(false);
                    }}
                />
            )}

            <div className="relative z-10 flex flex-col items-center justify-center w-full">
                
                {/* Score & High Score */}
                <GameHUD score={score} highScore={highScore} onOpenIntro={() => setShowIntro(true)} onOpenSettings={() => setShowSettings(true)} />

                {/* Forces relative positioning and aspect ratio */}
                <div className="relative w-full max-w-[600px] aspect-square rounded-2xl border-4 border-cyan-500/30 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] bg-slate-900/90">
                    {/* Canvas fills the container and is where the game is rendered */}
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

                    {/* Main menu overlay */}
                    {gameState === 'MENU' && (
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-20 flex items-center justify-center">
                            <MainMenu onStart={handleStartGame} />
                        </div>
                    )}

                    {/* Game over overlay */}
                    {gameState === 'GAME OVER' && (
                        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-20 flex items-center justify-center animate-fade-in">
                            <GameOverModal score={score} onRestart={handleStartGame} />
                        </div>
                    )}
                </div>

                {/* Responsive Footer Controls Prompt */}
                <p className="mt-4 text-xs text-slate-500 hidden md:block">Use WASD or Arrow Keys to move the snek.</p>
                <p className="mt-4 text-xs text-slate-500 md:hidden">Swipe anywhere on the screen to control the snek.</p>
            </div>

        </div>
    );
}