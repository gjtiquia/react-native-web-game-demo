import { Group, Rect, Selector, SkSize, SkiaValue, useComputedValue, useValue } from "@shopify/react-native-skia"

export const Platform = ({ canvasSize }: { canvasSize: SkiaValue<SkSize> }) => {
    const width = useComputedValue(() => canvasSize.current.width, [canvasSize]);
    const height = 20; // Hardcode

    // TODO : Get y from game engine
    // TODO : Convert from design resolution (set in gameEngine config) to canvas size

    return (
        <Group
            transform={[
                { translateY: 0 } // For now, y position = top of the platform, for quick proof-of-concept
            ]}
        >
            <Rect
                x={0} //
                y={600}
                width={width}
                height={height}
                color={"#ccc"}
            />
        </Group>
    )
}