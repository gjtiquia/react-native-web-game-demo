import { useEffect, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { Canvas, Circle, Group, Rect, Selector, Text, interpolate, mix, point, size, useClockValue, useComputedValue, useFont, useSharedValueEffect, useValue, useValueEffect } from "@shopify/react-native-skia";
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

        if (yPosition.current < canvasCenter.current.y)
            yPosition.current += 0.5 * deltaTime

        FPS.current = Math.round(1000 / (deltaTime));
        previousClock.current = clock.current;
    });

    const yPosition = useValue(0);
    const canvasSize = useValue({ width: 0, height: 0 });
    const canvasCenter = useComputedValue(() => {
        return point(canvasSize.current.width / 2, canvasSize.current.height / 2)
    }, [canvasSize]);

    const rectSize = size(64, 128);

    if (font == null) return;

    return (
        <Canvas style={{ flex: 1, backgroundColor: "#222" }} onSize={canvasSize}>
            <RoundedBox centerPosition={{ x: Selector(canvasCenter, (v) => v.x), y: yPosition }} size={{ x: rectSize.width, y: rectSize.height }} radius={10} />

            {/* --- Debug Stuff --- */}
            <Group color={"red"}>
                <Text x={10} y={50} text={FPS_Display} font={font} />
                {/* Middle Dot */}
                <Rect
                    x={Selector(canvasCenter, (v) => v.x - 5)}
                    y={Selector(canvasCenter, (v) => v.y - 5)}
                    width={10}
                    height={10}
                />
                {/* Top Dot */}
                <Rect
                    x={Selector(canvasCenter, (v) => v.x - 5)}
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