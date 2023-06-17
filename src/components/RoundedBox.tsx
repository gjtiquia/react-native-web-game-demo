import { RoundedRect, useValue, Group, Selector, useClockValue, useValueEffect } from "@shopify/react-native-skia";
import { Vector2, useGameEngine } from "src/core";

export const RoundedBox = ({ interpolate }: { interpolate: boolean }) => {
    const { gameEngine } = useGameEngine();
    const clock = useClockValue();

    const size = useValue<Vector2>({ x: 64, y: 128 })

    const centerX = useValue(interpolate ? 100 : 200);
    const centerY = useValue(0);

    const radius = useValue(10);

    useValueEffect(clock, () => {
        if (interpolate) {
            // runTiming(centerY, gameEngine.test_yPosition); // Hard to customize interpolation behaviour

            const distance = gameEngine.test_yPosition - centerY.current;
            centerY.current += distance * 0.35; // Closer to 1 = Follow closer, Closer to 0 = Smoother but follow slower
        }
        else {
            centerY.current = gameEngine.test_yPosition;
        }
    });

    return (
        <Group transform={[{ translateX: - size.current.x / 2 }, { translateY: - size.current.y / 2 }]}>
            <RoundedRect
                x={centerX}
                y={centerY}
                width={Selector(size, v => v.x)}
                height={Selector(size, v => v.y)}
                r={radius}
                color={interpolate ? "lightblue" : "blue"}
            />
        </Group>
    )
}

