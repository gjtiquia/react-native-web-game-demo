import { Vector2, Vector2Zero } from "../../utilities";
import { GameObject } from "../GameObject";
import { Component } from "./Component";

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