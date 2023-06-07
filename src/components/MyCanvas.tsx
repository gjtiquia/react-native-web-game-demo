import { useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { Canvas } from "@shopify/react-native-skia";
import { Vector2, Vector2Zero } from "src/core";
import { RoundedBox } from "./RoundedBox";

// Note: Top Left is (0, 0)
const MyCanvas = () => {
    const [canvasSize, setCanvasSize] = useState<Vector2>(Vector2Zero);

    const canvasCenter: Vector2 = { x: canvasSize.x / 2, y: canvasSize.y / 2 }
    const rectWidth = 64;
    const rectHeight = 128;

    function onLayoutEvent(event: LayoutChangeEvent): void {
        const width = event.nativeEvent.layout.width;
        const height = event.nativeEvent.layout.height;
        const size: Vector2 = { x: width, y: height };

        setCanvasSize(size);
    }

    return (
        <Canvas style={{ flex: 1, backgroundColor: "#222" }} onLayout={onLayoutEvent}>
            <RoundedBox position={canvasCenter} size={{ x: rectWidth, y: rectHeight }} />
        </Canvas>
    )
}

export default MyCanvas;