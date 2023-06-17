import { Group, Rect, Selector, SkSize, SkiaValue, useClockValue, useComputedValue, useValue, useValueEffect } from "@shopify/react-native-skia"
import { WorldToCanvas, useGameEngine } from "src/core";

export const Platform = ({ canvasSize }: { canvasSize: SkiaValue<SkSize> }) => {
    const { gameEngine } = useGameEngine();
    const clock = useClockValue();

    const width = useComputedValue(() => canvasSize.current.width, [canvasSize]);
    const height = 20; // Hardcode

    const yPos = useValue(-height); // Initial y-position is out of canvas, so will not flicker when it snap in place when reading from game engine

    useValueEffect(clock, () => {
        if (!gameEngine.isAwake) return;

        // Dynamically get y from game engine
        const canvasPos = WorldToCanvas(
            { x: 0, y: gameEngine.test_platform_y },
            { x: canvasSize.current.width, y: canvasSize.current.height }
        );

        yPos.current = canvasPos.y;
    });

    return (
        <Group
            transform={[
                { translateY: 0 } // For now, y position = top of the platform, for quick proof-of-concept
            ]}
        >
            <Rect
                x={0} //
                y={yPos}
                width={width}
                height={height}
                color={"#ccc"}
            />
        </Group>
    )
}