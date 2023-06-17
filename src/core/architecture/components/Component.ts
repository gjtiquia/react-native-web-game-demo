import { GameObject } from "../../architecture";

export interface ComponentConfig {
    component: new (gameObject: GameObject) => Component
}

export abstract class Component {
    protected get _transform() { return this._gameObject.transform }
    protected _gameObject: GameObject;

    constructor(gameObject: GameObject) {
        this._gameObject = gameObject;
    }

    public awake(): void { }
    public fixedUpdate(): void { }
    public earlyUpdate(): void { }
    public lateUpdate(): void { }
}