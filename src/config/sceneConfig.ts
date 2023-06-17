import { SceneConfig } from "src/core";

import { boxPrefab, platformPrefab } from "./assets/prefabs";

export const sceneConfig: SceneConfig = {
    initialGameObjects: [
        {
            ...boxPrefab,
            initialPosition: { x: 0, y: 80 }
        },
        {
            ...platformPrefab,
            initialPosition: { x: 0, y: 30 }
        }
    ]
}