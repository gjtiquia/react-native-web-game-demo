import { createContext, useContext } from "react";
import { GameEngine } from "../architecture";

const GameEngineContext = createContext<GameEngine | undefined>(undefined);
export const GameEngineProvider = GameEngineContext.Provider;

export const useGameEngine = () => {
    const gameEngine = useContext(GameEngineContext);
    if (!gameEngine) {
        throw new Error("Game Engine cannot be undefined, please add a context provider");
    }

    return { gameEngine };
}