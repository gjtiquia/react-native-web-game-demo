import { useEffect, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { Canvas, Circle, Group, Rect, interpolate, mix, useClockValue, useSharedValueEffect, useValue, useValueEffect } from "@shopify/react-native-skia";
import { Vector2, Vector2Zero } from "src/core";
import { RoundedBox } from "./RoundedBox";

// Note 1: Top Left is (0, 0)
// Note 2: Using Reanimated 2 due to Expo not supporting Reanimated 3 yet.
const MyCanvas = () => {
    const clock = useClockValue();
    // const boxPosition = useValue(Vector2Zero);
    const yPosition = useValue(0);

    // Called every frame
    useValueEffect(clock, () => {
        // boxPosition.current = { x: boxPosition.current.x, y: boxPosition.current.y + 10 }

        // TODO : Apply the animation to the rounded box

        // https://shopify.github.io/react-native-skia/docs/animations/values
        // yPosition.current = interpolate(clock.current, [0, 4000], [0, 200]);
        if (yPosition.current < 500)
            yPosition.current += 1
    });

    const [canvasSize, setCanvasSize] = useState<Vector2>(Vector2Zero);

    const rectWidth = 64;
    const rectHeight = 128;

    function onLayoutEvent(event: LayoutChangeEvent): void {
        const width = event.nativeEvent.layout.width;
        const height = event.nativeEvent.layout.height;
        const size: Vector2 = { x: width, y: height };

        // TODO : use onSize => https://shopify.github.io/react-native-skia/docs/animations/values#canvas-size
        setCanvasSize(size);
    }

    return (
        <Canvas style={{ flex: 1, backgroundColor: "#222" }} onLayout={onLayoutEvent}>
            <RoundedBox position={{ x: canvasSize.x / 2, y: canvasSize.y / 2 }} size={{ x: rectWidth, y: rectHeight }} />
            <Rect
                x={0}
                y={yPosition}
                width={10}
                height={10}
                color={"red"}
            />
        </Canvas>
    )
}

export default MyCanvas;