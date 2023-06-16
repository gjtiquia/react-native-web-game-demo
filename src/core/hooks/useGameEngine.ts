import { useEffect } from "react";
import { GameEngine } from "src/core/architecture";

export const useGameEngine = () => {
    useEffect(() => {
        const gameEngine = new GameEngine();

        return () => {
            gameEngine.onDestroy();
        }
    }, [])
}