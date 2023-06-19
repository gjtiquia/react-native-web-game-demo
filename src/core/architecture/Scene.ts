import { type GameObjectInstanceConfig, GameObject } from "./GameObject";

export interface SceneConfig {
    initialGameObjects?: GameObjectInstanceConfig[]
}

export class Scene {
    private _gameObjects: GameObject[];

    constructor(config: SceneConfig) {
        if (config.initialGameObjects)
            this._gameObjects = config.initialGameObjects.map(gameObjectConfig => new GameObject(gameObjectConfig));
        else
            this._gameObjects = new Array<GameObject>();
    }

    public findGameObject(instanceID: string): GameObject | undefined {
        const gameObject = this._gameObjects.find(gameObject => gameObject.instanceID === instanceID)

        if (!gameObject)
            console.error(`Cannot find game object with instanceID ${instanceID}!`)

        return gameObject;
    }

    public onAwake(): void {
        this._gameObjects.forEach(gameObject => gameObject.onAwake());
    }

    public onFixedUpdate(): void {
        this._gameObjects.forEach(gameObject => gameObject.onEarlyUpdate());

        this._gameObjects.forEach(gameObject => gameObject.onFixedUpdate());

        // TODO : Physics Update (update Rigidbody position according to velocity/acceleration)
        // TODO : Collision Detection
        // TODO : Collision Resolution (resolve Rigidbody position and set the transform position)

        // TODO : LateUpdate
        this._gameObjects.forEach(gameObject => gameObject.onLateUpdate());
    }
}