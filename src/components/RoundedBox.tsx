import { RoundedRect, useValue, Group, useClockValue, useValueEffect } from "@shopify/react-native-skia";
import { useGameEngine } from "src/core";

export const RoundedBox = () => {
    const DEBUG_MODE = true;
    const INTERPOLATION_STRENGTH = 0.35; // Closer to 1 = Follow closer, Closer to 0 = Smoother but follow slower

    const { gameEngine } = useGameEngine();
    const clock = useClockValue();

    const width = useValue(64);
    const height = useValue(128);
    const radius = useValue(10);

    const centerX = useValue(100);
    const centerY = useValue(0);

    const DEBUG_centerX = useValue(0);
    const DEBUG_centerY = useValue(0);

    useValueEffect(clock, () => {
        // TODO : Dynamically get from game engine

        const distance = gameEngine.test_yPosition - centerY.current;
        centerY.current += distance * INTERPOLATION_STRENGTH;

        if (DEBUG_MODE) {
            DEBUG_centerX.current = centerX.current;
            DEBUG_centerY.current = gameEngine.test_yPosition;
        }
    });


    return (
        <Group transform={[{ translateX: - width.current / 2 }, { translateY: - height.current / 2 }]}>
            <RoundedRect
                x={centerX}
                y={centerY}
                width={width}
                height={height}
                r={radius}
                color={"lightblue"}
            />

            {DEBUG_MODE ?
                <RoundedRect
                    x={DEBUG_centerX}
                    y={DEBUG_centerY}
                    width={width}
                    height={height}
                    r={radius}
                    color={"red"}
                    opacity={0.5}
                /> : null
            }
        </Group>
    )
}

