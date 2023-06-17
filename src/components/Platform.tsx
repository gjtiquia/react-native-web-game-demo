import { Group, Rect, Selector, SkSize, SkiaValue, useClockValue, useComputedValue, useValue, useValueEffect } from "@shopify/react-native-skia"
import { useGameEngine } from "src/core";

export const Platform = ({ canvasSize }: { canvasSize: SkiaValue<SkSize> }) => {
    const { gameEngine } = useGameEngine();
    const clock = useClockValue();

    const width = useComputedValue(() => canvasSize.current.width, [canvasSize]);
    const height = 20; // Hardcode

    const y = useValue(-height); // Initial y is out of canvas, so will not flicker when it snap in place when reading from game engine

    useValueEffect(clock, () => {
        if (!gameEngine.isAwake) return;

        // Dynamically get y from game engine
        const gameY = gameEngine.test_platform_y;
        const refY = gameEngine.test_referenceResolution_y;
        const normalizedY = gameY / refY;
        const flippedY = 1 - normalizedY;
        const targetY = flippedY * canvasSize.current.height;

        y.current = targetY;
    });

    return (
        <Group
            transform={[
                { translateY: 0 } // For now, y position = top of the platform, for quick proof-of-concept
            ]}
        >
            <Rect
                x={0} //
                y={y}
                width={width}
                height={height}
                color={"#ccc"}
            />
        </Group>
    )
}