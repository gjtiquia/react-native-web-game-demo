import { Group, Rect, Selector, SkSize, SkiaValue, Text, point, size, useComputedValue, useFont, useValue, } from "@shopify/react-native-skia";
import { GameEngine, useRender } from "src/core";

interface DebugGroupProps {
    canvasSize: SkiaValue<SkSize>
}

export const DebugGroup = ({ canvasSize }: DebugGroupProps) => {
    const fontSize = 18;
    const font = useFont(require("assets/fonts/Roboto/Roboto-Regular.ttf"), fontSize);

    const refreshRateDisplay = useValue("");
    const tickRateDisplay = useValue("");
    const tickDisplay = useValue("");

    const canvasCenter = useComputedValue(() => {
        return point(canvasSize.current.width / 2, canvasSize.current.height / 2)
    }, [canvasSize]);

    const dotSize = size(10, 10);

    const onGameEngineRender = (gameEngine: GameEngine) => {
        tickRateDisplay.current = `Tick Rate: ${gameEngine.tickRate}TPS`;
        tickDisplay.current = `Tick: ${gameEngine.tick}`;
    }

    const onSkiaRender = (deltaTime: number) => {
        const refreshRate = Math.round(1000 / (deltaTime));
        refreshRateDisplay.current = `Refresh Rate: ${refreshRate}Hz`
    }

    useRender(onGameEngineRender, onSkiaRender)

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