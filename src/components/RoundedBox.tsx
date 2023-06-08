import { SkiaProps, RoundedRect, AnimatedProp, AnimatedProps, SkiaValue, useValue, useComputedValue } from "@shopify/react-native-skia";
import { Vector2, Vector2Zero, Vector2One } from "src/core";

interface RoundedBoxProps {
    /** The position of the center of the box. */
    position: AnimatedVector2,

    /** The width and height of the rounded box. */
    size: Vector2,

    /** The radius of the rounded corner of the box. */
    radius: number
}

interface AnimatedVector2 {
    x: AnimatedProp<number>,
    y: AnimatedProp<number>
}

export const RoundedBox = ({ position, size, radius }: RoundedBoxProps) => {

    // TODO : Make the size animated too

    // const x = useComputedValue(() => (position.x as SkiaValue<number>).current - (size.x as SkiaValue<number>).current / 2, [position]);
    const y = useComputedValue(() => (position.y as SkiaValue<number>).current - size.y / 2, [position.y]);

    // const width = useComputedValue(() => size.x, [size]);
    // const height = useComputedValue(() => size.y, [size]);

    return (
        <RoundedRect
            x={position.x}
            y={y}
            width={size.x}
            height={size.y}
            r={radius}
            color="lightblue"
        />
    )
}

// function getTopLeftPosition(position: SkiaValue<Vector2>, size: AnimatedProp<Vector2>): AnimatedProp<Vector2> {
//     const x = getTopLeftX(position.current.x, size.x);
//     const y = getTopLeftY(position.y, size.y);

//     return { x, y };
// }

// function getTopLeftX(pivotX: AnimatedProps<number>, width: AnimatedProps<number>): AnimatedProps<number> {
//     return pivotX - width / 2;
// }

// function getTopLeftY(pivotY: number, height: number): number {
//     return pivotY - height / 2;
// }

