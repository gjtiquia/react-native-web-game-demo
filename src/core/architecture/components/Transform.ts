// import { GameObject, Vector2, Vector2Zero } from "src/core";

import { GameObject } from "../../architecture";
import { Vector2, Vector2Zero } from "../../utilities";

//! Not sure why defining this in another file breaks
export abstract class Component {
    protected _gameObject: GameObject;

    constructor(gameObject: GameObject) {
        this._gameObject = gameObject;

        console.log("Component: GameObject ID: ", gameObject.id);
    }

    public awake(): void { }
    public fixedUpdate(): void { }
}

export class Transform extends Component {

    /** This is the render position after all the physics calculation (if any by a Rigidbody component) */
    public get position() { return this._position }

    private _position: Vector2 = Vector2Zero;

    constructor(gameObject: GameObject) {
        super(gameObject);
    }

    public setPosition(position: Vector2) {
        this._position = position;
    }
}