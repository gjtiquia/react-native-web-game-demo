import { useEffect, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { Canvas, Circle, Group, Rect, Selector, SkSize, SkiaValue, Text, interpolate, mix, point, size, useClockValue, useComputedValue, useFont, useSharedValueEffect, useValue, useValueEffect } from "@shopify/react-native-skia";
import { Vector2, Vector2Zero, useGameEngine } from "src/core";
import { RoundedBox } from "./RoundedBox";

interface DebugGroupProps {
    canvasSize: SkiaValue<SkSize>
}

export const DebugGroup = ({ canvasSize }: DebugGroupProps) => {
    const { gameEngine } = useGameEngine();

    const fontSize = 18;
    const font = useFont(require("assets/fonts/Roboto/Roboto-Regular.ttf"), fontSize);

    const clock = useClockValue();
    const previousClock = useValue(0);

    const refreshRate = useValue(0);
    const refreshRateDisplay = useComputedValue(() => `Refresh Rate: ${refreshRate.current}Hz`, [refreshRate])
    const tickRateDisplay = useValue("");

    const tick = useValue(0);
    const tickDisplay = useComputedValue(() => `Tick: ${tick.current}`, [tick])

    // Called every frame
    useValueEffect(clock, () => {
        const deltaTime = clock.current - previousClock.current;
        const calculatedFPS = Math.round(1000 / (deltaTime));

        refreshRate.current = calculatedFPS;
        previousClock.current = clock.current;

        tickRateDisplay.current = `Tick Rate: ${gameEngine.tickRate}TPS`;
        tick.current = gameEngine.tick;
    });

    const canvasCenter = useComputedValue(() => {
        return point(canvasSize.current.width / 2, canvasSize.current.height / 2)
    }, [canvasSize]);

    const dotSize = size(10, 10);

    if (font == null) return null;
    return (
        <Group color={"red"}>
            <Text x={10} y={30} text={refreshRateDisplay} font={font} />
            <Text x={10} y={60} text={tickRateDisplay} font={font} />
            <Text x={10} y={90} text={tickDisplay} font={font} />
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