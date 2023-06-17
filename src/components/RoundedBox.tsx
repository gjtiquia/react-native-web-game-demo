import { RoundedRect, useValue, Group, useClockValue, useValueEffect, SkiaValue, SkSize, Selector, center } from "@shopify/react-native-skia";
import { useState } from "react";
import { useGameEngine } from "src/core";

export const RoundedBox = ({ canvasSize }: { canvasSize: SkiaValue<SkSize> }) => {
    const DEBUG_MODE = false;
    const INTERPOLATION_STRENGTH = 0.35; // Closer to 1 = Follow closer, Closer to 0 = Smoother but follow slower

    const { gameEngine } = useGameEngine();
    const clock = useClockValue();

    const width = 64; // Hardcode
    const height = 128; // Hardcode
    const radius = 10; // Hardcode

    const isInitialized = useValue(false);

    const centerY = useValue(0); // initial y is out of canvas, so will not flicker when snapping in place
    const DEBUG_centerY = useValue(0);

    useValueEffect(clock, () => {
        if (!gameEngine.isAwake) return;

        // Dynamically get y from game engine
        const gameY = gameEngine.test_box_y;
        const refY = gameEngine.test_referenceResolution_y;
        const normalizedY = gameY / refY;
        const flippedY = 1 - normalizedY;
        const targetY = flippedY * canvasSize.current.height;

        // Snap when not yet initialized
        if (!isInitialized.current) {
            centerY.current = targetY;
            isInitialized.current = true;
            return;
        }

        // Interpolate
        else {
            // TODO : Snap when in a short distance
            const distance = targetY - centerY.current;
            centerY.current += distance * INTERPOLATION_STRENGTH;
        }

        if (DEBUG_MODE) DEBUG_centerY.current = targetY;
    });

    return (
        <Group
            transform={[
                { translateX: - width / 2 },
                { translateY: - height } // For now, y position = bottom of the box, for quick proof-of-concept
            ]}
        >
            <RoundedRect
                x={Selector(canvasSize, v => v.width / 2)}
                y={centerY}
                width={width}
                height={height}
                r={radius}
                color={"lightblue"}
            />

            {DEBUG_MODE ?
                <RoundedRect
                    x={Selector(canvasSize, v => v.width / 2)}
                    y={DEBUG_centerY}
                    width={width}
                    height={height}
                    r={radius}
                    color={"red"}
                    opacity={0.5}
                /> : null
            }
        </Group>
    )
}

