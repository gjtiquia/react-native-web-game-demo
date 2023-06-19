import { GameEngine } from "../architecture";
import { Vector2 } from "../types";

export function WorldToCanvas(worldPosition: Vector2, canvasSize: Vector2): Vector2 {
    // currently only transforms y position
    // TODO : transform x position

    const gameY = worldPosition.y;
    const refY = GameEngine.referenceResolution.y;
    const normalizedY = gameY / refY;

    // Assuming canvas y-axis is downwards
    const flippedY = 1 - normalizedY;
    const targetY = flippedY * canvasSize.y;

    return { x: 0, y: targetY };
}