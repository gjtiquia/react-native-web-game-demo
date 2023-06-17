import { SceneConfig } from "src/core";

import { boxPrefab, platformPrefab } from "./assets/prefabs";
import { Box } from "./assets/scripts/box";

export const sceneConfig: SceneConfig = {
    initialGameObjects: [
        {
            ...boxPrefab,
            instanceID: "boxInstance",
            initialPosition: { x: 0, y: 80 },
        },
        {
            ...platformPrefab,
            instanceID: "platformInstance",
            initialPosition: { x: 0, y: 30 }
        }
    ]
}