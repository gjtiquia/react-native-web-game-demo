import { createContext, useContext, useEffect } from "react";
import { GameEngine, GameEngineConfig } from "src/core/architecture";

const GameEngineContext = createContext<GameEngine | null>(null);
export const GameEngineProvider = GameEngineContext.Provider;

export const useGameEngine = () => {
    const gameEngine = useContext(GameEngineContext);
    if (gameEngine === null) {
        throw new Error("Game Engine cannot be null, please add a context provider");
    }

    return { gameEngine };
}