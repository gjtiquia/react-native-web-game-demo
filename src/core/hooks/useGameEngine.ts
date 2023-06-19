import { createContext, useContext, useEffect } from "react";
import { GameEngine, GameEngineConfig } from "src/internalExports";

const GameEngineContext = createContext<GameEngine | undefined>(undefined);
export const GameEngineProvider = GameEngineContext.Provider;

export const useGameEngine = () => {
    const gameEngine = useContext(GameEngineContext);
    if (!gameEngine) {
        throw new Error("Game Engine cannot be undefined, please add a context provider");
    }

    return { gameEngine };
}