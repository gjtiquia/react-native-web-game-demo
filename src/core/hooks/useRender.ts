import { useClockValue, useValue, useValueEffect } from "@shopify/react-native-skia";

import { GameEngine } from "../architecture";
import { useGameEngine } from "./useGameEngine";

/**
 * Called every render frame.
 * @param onGameEngineRender Called every render frame the game engine is awake.
 * @param onSkiaRender Called every render frame when the clock value from Skia is updated. Called regardless if the game engine is awake.
 */
export const useRender = (onGameEngineRender: (gameEngine: GameEngine, deltaTime: number) => void, onSkiaRender?: (deltaTime: number) => void) => {
    const { gameEngine } = useGameEngine();

    const clock = useClockValue();
    const previousClock = useValue(0);

    useValueEffect(clock, () => {
        const deltaTime = clock.current - previousClock.current;
        previousClock.current = clock.current;

        if (gameEngine && gameEngine.isInitialized && gameEngine.isAwake) {
            onGameEngineRender(gameEngine, deltaTime);
        }

        if (onSkiaRender) onSkiaRender(deltaTime);
    });
}