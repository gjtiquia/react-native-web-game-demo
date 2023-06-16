import { GameEngine, GameEngineConfig } from "src/core";

export const gameEngineConfig: GameEngineConfig = {
    fixedDeltaTime: 1000
}

export const gameEngineInstance = new GameEngine(gameEngineConfig);