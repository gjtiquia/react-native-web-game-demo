import { useEffect } from "react";
import { GameEngine, GameEngineConfig } from "src/core/architecture";

export const useGameEngine = (config: GameEngineConfig) => {
    useEffect(() => {
        const gameEngine = new GameEngine(config);

        return () => {
            gameEngine.onDestroy();
        }
    }, [])
}