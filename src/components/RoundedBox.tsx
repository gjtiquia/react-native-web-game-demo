import { SkiaProps, RoundedRect, AnimatedProp, AnimatedProps, SkiaValue, useValue, useComputedValue, Group, SkPoint, Selector, center, SkSize } from "@shopify/react-native-skia";
import { Vector2, Vector2Zero, Vector2One } from "src/core";

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

export const RoundedBox = ({ centerPosition, size, radius }: RoundedBoxProps) => {
    return (
        <Group transform={[{ translateX: - size.x / 2 }, { translateY: - size.y / 2 }]}>
            <RoundedRect
                x={centerPosition.x}
                y={centerPosition.y}
                width={size.x}
                height={size.y}
                r={radius}
                color="lightblue"
            />
        </Group>
    )
}

