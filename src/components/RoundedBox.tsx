import { RoundedRect } from "@shopify/react-native-skia";
import { Vector2, Vector2Zero, Vector2One } from "src/core";

interface RoundedBoxProps {
    /** The position of the center of the box. */
    position?: Vector2,

    /** The width and height of the rounded box. */
    size?: Vector2,

    /** The radius of the rounded corner of the box. */
    radius?: number
}

const DEFAULT_SIZE: Vector2 = { x: 64, y: 64 }

export const RoundedBox = ({ position = Vector2Zero, size = DEFAULT_SIZE, radius = 10 }: RoundedBoxProps) => {
    const topLeftPosition: Vector2 = getTopLeftPosition(position, size);

    return (
        <RoundedRect
            x={topLeftPosition.x}
            y={topLeftPosition.y}
            width={size.x}
            height={size.y}
            r={radius}
            color="lightblue"
        />
    )
}

function getTopLeftPosition(position: Vector2, size: Vector2): Vector2 {
    const x = getTopLeftX(position.x, size.x);
    const y = getTopLeftY(position.y, size.y);

    return { x, y };
}

function getTopLeftX(pivotX: number, width: number): number {
    return pivotX - width / 2;
}

function getTopLeftY(pivotY: number, height: number): number {
    return pivotY - height / 2;
}

