import { Component, Time } from "src/core";

export class Box extends Component {
    private _speed: number = 0.05;

    public override fixedUpdate(): void {
        if (this._transform.position.y > 30)
            this._transform.position.y -= this._speed * Time.fixedDeltaTime;
        else
            this._transform.position.y = 80;
    }
}