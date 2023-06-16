import { useEffect, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { Canvas, Circle, Group, Rect, Selector, Text, interpolate, mix, point, size, useClockValue, useComputedValue, useFont, useSharedValueEffect, useValue, useValueEffect } from "@shopify/react-native-skia";
import { RoundedBox } from "./RoundedBox";
import { DebugGroup } from "./DebugGroup";
import { GameEngineProvider } from "src/core";
import { gameEngineInstance } from "src/config/gameEngineConfig";

// Note 1: Top Left is (0, 0)
// Note 2: Using Reanimated 2 due to Expo not supporting Reanimated 3 yet.
const MyCanvas = () => {
    const clock = useClockValue();
    const yPosition = useValue(0);
    const canvasSize = useValue({ width: 0, height: 0 });

    const canvasCenter = useComputedValue(() => {
        return point(canvasSize.current.width / 2, canvasSize.current.height / 2)
    }, [canvasSize]);

    useValueEffect(clock, () => {
        if (yPosition.current < canvasCenter.current.y)
            yPosition.current = interpolate(clock.current, [0, 10], [0, 5]);
    });

    useEffect(() => {
        console.log("Canvas Mounted");
        gameEngineInstance.initialize();

        return () => {
            console.log("Canvas Unmounted");
            gameEngineInstance.deinitialize();
        }
    }, [])

    const rectSize = size(64, 128);

    return (
        <Canvas style={{ flex: 1, backgroundColor: "#222" }} onSize={canvasSize} mode="continuous">
            <GameEngineProvider value={gameEngineInstance}>
                <RoundedBox
                    centerPosition={{ x: Selector(canvasCenter, (v) => v.x), y: yPosition }}
                    size={{ x: rectSize.width, y: rectSize.height }}
                    radius={10}
                />

                <DebugGroup canvasSize={canvasSize} />
            </GameEngineProvider>
        </Canvas>
    )
}

export default MyCanvas;