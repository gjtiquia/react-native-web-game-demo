import { useEffect } from "react";
import { Canvas, useValue, } from "@shopify/react-native-skia";
import { GameEngineProvider } from "src/core";
import { gameEngineInstance } from "src/config/gameEngineConfig";
import { RoundedBox } from "./RoundedBox";
import { DebugGroup } from "./DebugGroup";
import { Platform } from "./Platform";
import { skiaConfig } from "src/config/skiaConfig";

// Note 1: Top Left is (0, 0)
// Note 2: Using Reanimated 2 due to Expo not supporting Reanimated 3 yet.
const MyCanvas = () => {
    const canvasSize = useValue({ width: 0, height: 0 });

    useEffect(() => {
        console.log("Canvas Mounted");
        if (gameEngineInstance)
            gameEngineInstance.initialize();

        return () => {
            console.log("Canvas Unmounted");
            if (gameEngineInstance)
                gameEngineInstance.deinitialize();
        }
    }, [])

    // TODO : Dynamically create UI objects from game objects in game engine
    return (
        <Canvas style={{ flex: 1, backgroundColor: "#222" }} onSize={canvasSize} mode="continuous">
            <GameEngineProvider value={gameEngineInstance}>
                <RoundedBox canvasSize={canvasSize} />
                <Platform canvasSize={canvasSize} />

                {skiaConfig.debugMode ? <DebugGroup canvasSize={canvasSize} /> : null}
            </GameEngineProvider>
        </Canvas>
    )
}

export default MyCanvas;