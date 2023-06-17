import { Vector2 } from "../utilities";
import { Component, Transform } from "./components";

export interface GameObjectConfig {
    id: string,
    initialPosition: Vector2
}

export class GameObject {
    public get id() { return this._id }
    public get transform() { return this._transform }

    private _id: string;
    private _transform: Transform;
    private _components: Component[];

    constructor(config: GameObjectConfig) {
        console.log("Initializing game object, id: ", config.id);

        this._id = config.id;

        const transform = new Transform(this);
        transform.setPosition(config.initialPosition);

        this._transform = transform;
        this._components = new Array<Component>(transform);
    }

    public onAwake(): void {
        this._components.forEach(component => component.awake());
    }

    public onFixedUpdate(): void {
        this._components.forEach(component => component.fixedUpdate());
    }
}