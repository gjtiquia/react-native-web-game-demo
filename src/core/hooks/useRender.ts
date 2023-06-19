import { useClockValue, useValue, useValueEffect } from "@shopify/react-native-skia";

import { GameEngine, useGameEngine } from "src/internalExports";

export interface OnGameEngineRenderParams {
    gameEngine: GameEngine,
    deltaTime: number,
    elapsedTime: number
}

/**
 * Called every render frame.
 * @param onGameEngineRender Called every render frame the game engine is awake.
 * @param onSkiaRender Called every render frame when the clock value from Skia is updated. Called regardless if the game engine is awake.
 */
export const useRender = (onGameEngineRender: (params: OnGameEngineRenderParams) => void, onSkiaRender?: (deltaTime: number) => void) => {
    const { gameEngine } = useGameEngine();

    const clock = useClockValue();
    const previousClock = useValue(0);

    const previousTick = useValue(0);
    const elapsedTimeSinceLastTick = useValue(0);

    useValueEffect(clock, () => {
        const deltaTime = clock.current - previousClock.current;
        previousClock.current = clock.current;

        if (gameEngine && gameEngine.isInitialized && gameEngine.isAwake) {

            if (previousTick.current !== gameEngine.tick) {
                elapsedTimeSinceLastTick.current = 0;
                previousTick.current = gameEngine.tick;
            }
            else {
                elapsedTimeSinceLastTick.current += deltaTime;
            }

            onGameEngineRender({ gameEngine, deltaTime, elapsedTime: elapsedTimeSinceLastTick.current });
        }

        if (onSkiaRender) onSkiaRender(deltaTime);
    });
}