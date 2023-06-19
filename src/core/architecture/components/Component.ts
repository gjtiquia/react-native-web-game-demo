// Import type to prevent circular dependencies
// References:
// https://stackoverflow.com/questions/24444436/circular-type-references-in-typescript
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html
import { type GameObject } from "../GameObject";
export { GameObject }

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