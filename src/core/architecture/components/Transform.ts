import { Vector2, Vector2Zero, GameObject, Component } from "src/internalExports";

export class Transform extends Component {

    /** This is the render position after all the physics calculation (if any by a Rigidbody component) */
    public get position() { return this._position }
    public get previousPosition() { return this._previousPosition }

    private _position: Vector2 = Vector2Zero;
    private _previousPosition: Vector2 = Vector2Zero;

    constructor(gameObject: GameObject) {
        super(gameObject);
    }

    public setPosition(position: Vector2) {
        this._position = { ...position };
        this._previousPosition = { ...position };
    }

    public override earlyUpdate(): void {
        this._previousPosition = { ...this._position };
    }
}