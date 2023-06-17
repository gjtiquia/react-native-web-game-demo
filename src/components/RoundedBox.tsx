import { RoundedRect, useValue, Group, SkiaValue, SkSize, Selector } from "@shopify/react-native-skia";
import { skiaConfig } from "src/config/skiaConfig";
import { WorldToCanvas, useRender } from "src/core";

export const RoundedBox = ({ canvasSize }: { canvasSize: SkiaValue<SkSize> }) => {
    const width = 64; // Hardcode
    const height = 128; // Hardcode
    const radius = 10; // Hardcode

    const isInitialized = useValue(false);

    const centerY = useValue(0); // initial y is out of canvas, so will not flicker when snapping in place
    const DEBUG_centerY = useValue(0);

    useRender((gameEngine) => {
        const box = gameEngine.scene.findGameObject("boxInstance");
        if (!box) return;

        // Dynamically get y from game engine
        const { y: targetCanvasY } = WorldToCanvas(
            box.transform.position,
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

            if (Math.abs(distance) > skiaConfig.interpolationThreshold)
                centerY.current = targetCanvasY;
            else
                centerY.current += distance * skiaConfig.interpolationStrength;
        }

        if (skiaConfig.debugMode) DEBUG_centerY.current = targetCanvasY;
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

            {skiaConfig.debugMode ?
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

