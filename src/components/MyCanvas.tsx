import { useEffect, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { Canvas, Circle, Group, Rect, Text, interpolate, mix, useClockValue, useComputedValue, useFont, useSharedValueEffect, useValue, useValueEffect } from "@shopify/react-native-skia";
import { Vector2, Vector2Zero } from "src/core";
import { RoundedBox } from "./RoundedBox";

// Note 1: Top Left is (0, 0)
// Note 2: Using Reanimated 2 due to Expo not supporting Reanimated 3 yet.
const MyCanvas = () => {
    const fontSize = 24;
    const font = useFont(require("./Roboto/Roboto-Regular.ttf"), fontSize);
    // console.log(font);

    const clock = useClockValue();
    const previousClock = useValue(0);
    const FPS = useValue(0);
    const FPS_Display = useComputedValue(() => `FPS: ${FPS.current}`, [FPS])

    // Called every frame
    useValueEffect(clock, () => {
        const deltaTime = clock.current - previousClock.current;

        // console.log("deltaTime", deltaTime);

        // boxPosition.current = { x: boxPosition.current.x, y: boxPosition.current.y + 10 }

        // TODO : Apply the animation to the rounded box

        // https://shopify.github.io/react-native-skia/docs/animations/values
        if (yPosition.current < 500) {
            // interpolate from range [0, 100] to range [0, 50], or in other words clock.current : interpolatedValue = 100 : 50 = 2 : 1, even if clock.current surpasses 100
            const interpolatedValue = interpolate(clock.current, [0, 100], [0, 50]);
            // console.log({ interpolatedValue: interpolatedValue, clock: clock.current });

            yPosition.current = interpolatedValue;
        }

        // if (yPosition.current < 500)
        //     yPosition.current += 0.5 * deltaTime

        FPS.current = Math.round(1000 / (deltaTime));
        previousClock.current = clock.current;
    });


    // const boxPosition = useValue(Vector2Zero);
    const yPosition = useValue(0);

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

    if (font == null) return;

    return (
        <Canvas style={{ flex: 1, backgroundColor: "#222" }} onLayout={onLayoutEvent}>
            <RoundedBox centerPosition={{ x: canvasSize.x / 2, y: yPosition }} size={{ x: rectWidth, y: rectHeight }} radius={10} />

            {/* --- Debug Stuff --- */}
            <Group color={"red"}>
                <Text x={10} y={50} text={FPS_Display} font={font} />
                {/* Middle Dot */}
                <Rect
                    x={canvasSize.x / 2 - 5}
                    y={canvasSize.y / 2 - 5}
                    width={10}
                    height={10}
                />
                {/* Top Dot */}
                <Rect
                    x={canvasSize.x / 2 - 5}
                    y={-5}
                    width={10}
                    height={10}
                />
            </Group>
            {/* ------------------ */}
        </Canvas>
    )
}

export default MyCanvas;