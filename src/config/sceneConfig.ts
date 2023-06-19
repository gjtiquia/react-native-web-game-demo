import { SceneConfig, boxPrefab, platformPrefab } from "src/internalExports";

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