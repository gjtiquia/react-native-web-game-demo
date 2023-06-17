import { GameEngine, GameEngineConfig } from "src/core";

export const gameEngineConfig: GameEngineConfig = {
    tickRate: 2, // Slower TPS to for debugging
    // tickRate: 10, // Slow TPS for less computational load
    // tickRate: 20, // Minecraft is at 20TPS, 
    // tickRate: 60, // Faster TPS to match 60Hz refresh rate and have less input lag
}

export const gameEngineInstance = new GameEngine(gameEngineConfig);