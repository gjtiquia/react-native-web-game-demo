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
    const canvasSize = useValue({ width: 0, height: 0 });

    useEffect(() => {
        console.log("Canvas Mounted");
        gameEngineInstance.initialize();

        return () => {
            console.log("Canvas Unmounted");
            gameEngineInstance.deinitialize();
        }
    }, [])

    return (
        <Canvas style={{ flex: 1, backgroundColor: "#222" }} onSize={canvasSize} mode="continuous">
            <GameEngineProvider value={gameEngineInstance}>
                <RoundedBox interpolate={false} />
                <RoundedBox interpolate={true} />

                <DebugGroup canvasSize={canvasSize} />
            </GameEngineProvider>
        </Canvas>
    )
}

export default MyCanvas;