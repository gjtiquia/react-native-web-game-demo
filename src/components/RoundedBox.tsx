import { SkiaProps, RoundedRect, AnimatedProp, AnimatedProps, SkiaValue, useValue, useComputedValue, Group, SkPoint, Selector, center, SkSize, useClockValue, useValueEffect } from "@shopify/react-native-skia";
import { Vector2, useGameEngine } from "src/core";

interface RoundedBoxProps {
    /** The position of the center of the box. */
    centerPosition: AnimatedVector2, // TODO : Try use Vector2 and Selector

    /** The width and height of the rounded box. */
    size: AnimatedVector2, // TODO : Try use Vector2 and Selector

    /** The radius of the rounded corner of the box. */
    radius: number
}

interface AnimatedVector2 {
    x: AnimatedProp<number>,
    y: AnimatedProp<number>
}

export const RoundedBox = () => {
    const { gameEngine } = useGameEngine();
    const clock = useClockValue();

    const size = useValue<Vector2>({ x: 64, y: 128 })
    const centerPosition = useValue<Vector2>({ x: 100, y: 0 })
    const radius = useValue(10);

    useValueEffect(clock, () => {
        centerPosition.current = { ...centerPosition.current, y: gameEngine.test_yPosition };
    });

    return (
        <Group transform={[{ translateX: - size.current.x / 2 }, { translateY: - size.current.y / 2 }]}>
            <RoundedRect
                x={Selector(centerPosition, v => v.x)}
                y={Selector(centerPosition, v => v.y)}
                width={Selector(size, v => v.x)}
                height={Selector(size, v => v.y)}
                r={radius}
                color="lightblue"
            />
        </Group>
    )
}

