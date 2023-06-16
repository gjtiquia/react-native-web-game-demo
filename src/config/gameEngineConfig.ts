import { GameEngine, GameEngineConfig } from "src/core";

export const gameEngineConfig: GameEngineConfig = {
    fixedDeltaTime: 100
}

export const gameEngineInstance = new GameEngine(gameEngineConfig);