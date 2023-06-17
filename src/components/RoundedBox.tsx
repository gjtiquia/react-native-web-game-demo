import { RoundedRect, useValue, Group, SkiaValue, SkSize, Selector } from "@shopify/react-native-skia";
import { WorldToCanvas, useRender } from "src/core";

export const RoundedBox = ({ canvasSize }: { canvasSize: SkiaValue<SkSize> }) => {
    const DEBUG_MODE = false;
    const INTERPOLATION_STRENGTH = 0.35; // Closer to 1 = Follow closer, Closer to 0 = Smoother but follow slower

    const width = 64; // Hardcode
    const height = 128; // Hardcode
    const radius = 10; // Hardcode

    const isInitialized = useValue(false);

    const centerY = useValue(0); // initial y is out of canvas, so will not flicker when snapping in place
    const DEBUG_centerY = useValue(0);

    useRender((gameEngine) => {
        // Dynamically get y from game engine
        const { y: targetCanvasY } = WorldToCanvas(
            { x: 0, y: gameEngine.test_box_y },
            { x: canvasSize.current.width, y: canvasSize.current.height }
        );

        // Snap when not yet initialized
        if (!isInitialized.current) {
            centerY.current = targetCanvasY;
            isInitialized.current = true;
            return;
        }

        // Interpolate
        else {
            // TODO : Snap when in a short distance
            const distance = targetCanvasY - centerY.current;
            centerY.current += distance * INTERPOLATION_STRENGTH;
        }

        if (DEBUG_MODE) DEBUG_centerY.current = targetCanvasY;
    })

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

