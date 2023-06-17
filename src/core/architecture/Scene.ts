import { GameObject, GameObjectConfig } from "./GameObject";

export interface SceneConfig {
    initialGameObjects?: GameObjectConfig[]
}

export class Scene {
    private _config: SceneConfig;
    private _gameObjects: GameObject[];

    constructor(config: SceneConfig) {
        this._config = config;

        if (config.initialGameObjects)
            this._gameObjects = config.initialGameObjects.map(gameObjectConfig => new GameObject(gameObjectConfig));
        else
            this._gameObjects = new Array<GameObject>();
    }

    public getGameObject(id: string): GameObject | undefined {
        return this._gameObjects.find(gameObject => gameObject.id === id)
    }

    public onAwake(): void {
        this._gameObjects.forEach(gameObject => gameObject.onAwake())
    }

    public onFixedUpdate(fixedDeltaTime: number): void {
        this._gameObjects.forEach(gameObject => gameObject.onFixedUpdate())

        // TODO : Physics Update (update Rigidbody position according to velocity/acceleration)
        // TODO : Collision Detection
        // TODO : Collision Resolution (resolve Rigidbody position and set the transform position)

        // TODO : Just testing, refactor later into its own custom script
        // const speed = 0.05; // Units per delta time (in ms)
        // if (this._test_box_y > this._test_platform_y) {
        //     this._test_box_y -= speed * fixedDeltaTime;
        // }
    }
}