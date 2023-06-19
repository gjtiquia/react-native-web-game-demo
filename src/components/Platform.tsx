import { Group, Rect, SkSize, SkiaValue, useComputedValue, useValue } from "@shopify/react-native-skia"
import { WorldToCanvas, useRender } from "src/core";

export const Platform = ({ canvasSize }: { canvasSize: SkiaValue<SkSize> }) => {
    const width = useComputedValue(() => canvasSize.current.width, [canvasSize]);
    const height = 20; // Hardcode

    const yPos = useValue(-height); // Initial y-position is out of canvas, so will not flicker when it snap in place when reading from game engine

    useRender(({ gameEngine }) => {
        // TODO : Optimize, no need to get in every render, useRef?
        const platform = gameEngine.scene.findGameObject("platformInstance");
        if (!platform) return;

        // Dynamically get y from game engine
        const canvasPos = WorldToCanvas(
            platform.transform.position,
            { x: canvasSize.current.width, y: canvasSize.current.height }
        );

        yPos.current = canvasPos.y;
    })

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
