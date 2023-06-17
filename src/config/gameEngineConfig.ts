import { GameEngine, GameEngineConfig } from "src/core";
import { sceneConfig } from "./sceneConfig";

export const gameEngineConfig: GameEngineConfig = {
    tickRate: 3, // Slower TPS to for debugging
    // tickRate: 10, // Slow TPS for less computational load
    // tickRate: 20, // Minecraft is at 20TPS, 
    // tickRate: 60, // Faster TPS to match 60Hz refresh rate and have less input lag

    referenceResolution: { x: 50, y: 100 },
    sceneConfig: sceneConfig
}

export const gameEngineInstance: GameEngine | undefined = new GameEngine(gameEngineConfig);
// export const gameEngineInstance: GameEngine | undefined = undefined;