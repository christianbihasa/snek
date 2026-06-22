import React, { useState, useEffect, useRef } from 'react';
import MainMenu from './MainMenu';
import GameHUD from './GameHUD';
import GameOverModal from './GameOverModal';
import { initGame } from '../game/engine';

export default function GameContainer() {
    const [gameState, setGameState] = useState('MENU'); // 'MENU', 'PLAYING', 'GAME OVER'
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        return parseInt(localStorage.getItem('snekHighScore') || '0', 10)
    });
    const gameRef = useRef(null);

    const canvasRef = useRef(null);
    const gameEngineRef = useRef(null);

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
            });
        }

        return () => {
            if(gameEngineRef.current) gameEngineRef.current.destroy();
        };
    }, []);

    const handleStartGame = () => {
        setScore(0);
        setGameState('PLAYING');
        gameEngineRef.current.start();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 font-mono text-white p-4 select-none touch-none">
            
            {/* Score & High Score */}
            <GameHUD score={score} highScore={highScore} />

            {/* Forces relative positioning and aspect ratio */}
            <div className="relative w-full max-w-[600px] aspect-square rounded-2xl border-4 border-cyan-500/30 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                {/* Canvas fills the container and is where the game is rendered */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bg-slate-900" />

                {/* Main menu and game over modal are centered overlays */}
                {gameState === 'MENU' && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-20 flex items-center justify-center">
                        <MainMenu onStart={handleStartGame} />
                    </div>
                )}

                {/* When game is over, show the modal and update high score if needed */}
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
    );
}