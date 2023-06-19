import { ComponentConfig, Vector2 } from "src/internalExports"

export interface GameObjectPrefabConfig {
    prefabID: string,
    prefabComponents?: ComponentConfig[]
}

export interface GameObjectInstanceConfig extends GameObjectPrefabConfig {
    instanceID: string,
    initialPosition: Vector2
}