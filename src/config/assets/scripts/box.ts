import { InputAction } from "src/config/gameEngineConfig";
import { Component, Time } from "src/core";
import { InputSystem } from "src/core/architecture/InputSystem";

export class Box extends Component {
    private _acceleration: number = -0.00045;
    private _velocity: number = 0;

    public override fixedUpdate(): void {
        if (this.isJumpPressed() && this.isOnGround()) { // TODO : Use jump buffer
            this.jump();
        }

        this.updatePhysics();

        if (this.isOnGround()) {
            this.stayOnGround();
        }
    }

    private isJumpPressed(): boolean {
        return InputSystem.isActionBuffered(InputAction.Jump);
    }

    private jump(): void {
        this._velocity = 0.22;
    }

    private updatePhysics(): void {
        this._velocity += this._acceleration * Time.fixedDeltaTime;
        this._transform.position.y += this._velocity * Time.fixedDeltaTime;
    }

    private isOnGround(): boolean {
        return this._transform.position.y <= 30;
    }

    private stayOnGround(): void {
        this._velocity = 0;
        this._transform.position.y = 30;
    }
}