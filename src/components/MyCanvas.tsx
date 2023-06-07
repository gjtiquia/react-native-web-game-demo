import { Canvas, Circle, Group, RoundedRect, rect } from "@shopify/react-native-skia";
import { useState } from "react";
import { LayoutChangeEvent } from "react-native";


interface Vector2 {
    x: number,
    y: number
}

const ZERO: Vector2 = { x: 0, y: 0 }

// Note: Top Left is (0, 0)
const MyCanvas = () => {

    const [canvasSize, setCanvasSize] = useState<Vector2>(ZERO);

    const rectX = canvasSize.x / 2;
    const rectY = canvasSize.y / 2;
    const rectWidth = 64;
    const rectHeight = 128;

    function getTopLeftX(pivotX: number, width: number): number {
        return pivotX - width / 2;
    }

    function getTopLeftY(pivotY: number, height: number): number {
        return pivotY - height / 2;
    }

    function onLayoutEvent(event: LayoutChangeEvent): void {
        const width = event.nativeEvent.layout.width;
        const height = event.nativeEvent.layout.height;
        const size: Vector2 = { x: width, y: height };

        console.log("setCanvasSize", size);

        setCanvasSize(size);
    }

    return (
        <Canvas style={{ flex: 1, backgroundColor: "#222" }} onLayout={onLayoutEvent}>
            <Group blendMode="multiply">
                <RoundedRect
                    x={getTopLeftX(rectX, rectWidth)}
                    y={getTopLeftY(rectY, rectHeight)}
                    width={rectWidth}
                    height={rectHeight}
                    r={10}
                    color="lightblue"
                />
            </Group>
        </Canvas>
    )
}

export default MyCanvas;