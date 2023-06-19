import { GameObject } from "src/internalExports";

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