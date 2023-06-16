import { useEffect, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { Canvas, Circle, Group, Rect, Selector, SkSize, SkiaValue, Text, interpolate, mix, point, size, useClockValue, useComputedValue, useFont, useSharedValueEffect, useValue, useValueEffect } from "@shopify/react-native-skia";
import { Vector2, Vector2Zero } from "src/core";
import { RoundedBox } from "./RoundedBox";
import { gameEngine } from "src/gameEngine";

interface DebugGroupProps {
    canvasSize: SkiaValue<SkSize>
}

export const DebugGroup = ({ canvasSize }: DebugGroupProps) => {
    const fontSize = 24;
    const font = useFont(require("assets/fonts/Roboto/Roboto-Regular.ttf"), fontSize);

    const clock = useClockValue();
    const previousClock = useValue(0);

    const fps = useValue(0);
    const fpsDisplay = useComputedValue(() => `FPS: ${fps.current}`, [fps])

    const tick = useValue(0);
    const tickDisplay = useComputedValue(() => `Tick: ${tick.current}`, [tick])

    // Called every frame
    useValueEffect(clock, () => {
        const deltaTime = clock.current - previousClock.current;
        const calculatedFPS = Math.round(1000 / (deltaTime));

        fps.current = calculatedFPS;
        previousClock.current = clock.current;

        tick.current = gameEngine.tick;
    });

    const canvasCenter = useComputedValue(() => {
        return point(canvasSize.current.width / 2, canvasSize.current.height / 2)
    }, [canvasSize]);

    const dotSize = size(10, 10);

    if (font == null) return null;
    return (
        <Group color={"red"}>
            <Text x={10} y={30} text={fpsDisplay} font={font} />
            <Text x={10} y={60} text={tickDisplay} font={font} />
            {/* Top Dot */}
            <Rect
                x={Selector(canvasCenter, v => v.x - dotSize.width / 2)}
                y={-dotSize.height / 2}
                width={dotSize.width}
                height={dotSize.height}
            />

            {/* Middle Dot */}
            <Rect
                x={Selector(canvasCenter, v => v.x - dotSize.width / 2)}
                y={Selector(canvasCenter, v => v.y - dotSize.height / 2)}
                width={dotSize.width}
                height={dotSize.height}
            />

            {/* Bottom Dot */}
            <Rect
                x={Selector(canvasCenter, v => v.x - dotSize.width / 2)}
                y={Selector(canvasSize, v => v.height - dotSize.height / 2)}
                width={dotSize.width}
                height={dotSize.height}
            />
        </Group>
    )
}