import { InputSystemConfig, SceneConfig, Vector2 } from "src/internalExports";

export interface GameEngineConfig {
    /** One cycle of a game loop is called a tick. Tick rate is the number of ticks per second. */
    tickRate: number,
    referenceResolution: Vector2,
    sceneConfig: SceneConfig,
    inputSystemConfig: InputSystemConfig
}