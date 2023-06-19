import { GameEngine, GameEngineConfig } from "src/core";
import { sceneConfig } from "./sceneConfig";

export enum InputAction {
    Jump = "jump"
}

export const gameEngineConfig: GameEngineConfig = {
    // tickRate: 3, // Slower TPS to for debugging
    // tickRate: 10, // Slow TPS for less computational load but also less physics accuracy
    tickRate: 20, // Minecraft is at 20TPS.
    // tickRate: 60, // Faster TPS to match 60Hz refresh rate and have less input lag
    // tickRate: 120, // Very fast TPS for high physics accuracy

    referenceResolution: { x: 50, y: 100 },
    sceneConfig: sceneConfig,
    inputSystemConfig: { inputActions: [InputAction.Jump] }
}

export const gameEngineInstance: GameEngine | undefined = new GameEngine(gameEngineConfig);
// export const gameEngineInstance: GameEngine | undefined = undefined;