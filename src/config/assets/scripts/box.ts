import { Component, Time } from "src/core";

export class Box extends Component {
    private _acceleration: number = -0.008;
    private _velocity: number = 0;

    public override fixedUpdate(): void {
        this._velocity += this._acceleration;
        this._transform.position.y += this._velocity * Time.fixedDeltaTime;

        if (this._transform.position.y < 30) {
            this._velocity = 0.12;
            this._transform.position.y = 30;
            return;
        }
    }
}