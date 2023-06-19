import { type Vector2 } from "../types";
import {
    type Component,
    type ComponentConfig,
    Transform
} from "./components";

export interface GameObjectPrefabConfig {
    prefabID: string,
    prefabComponents?: ComponentConfig[]
}

export interface GameObjectInstanceConfig extends GameObjectPrefabConfig {
    instanceID: string,
    initialPosition: Vector2
}

export class GameObject {
    public get instanceID() { return this._instanceID }
    public get transform() { return this._transform }

    private _instanceID: string;
    private _transform: Transform;
    private _components: Component[];

    constructor(config: GameObjectInstanceConfig) {
        // TODO : Assign the instance ID here!
        console.log("Initializing game object, instance ID: ", config.instanceID);

        this._instanceID = config.instanceID;

        const transform = new Transform(this);
        transform.setPosition(config.initialPosition);

        this._transform = transform;
        this._components = new Array<Component>(transform);

        config.prefabComponents?.forEach(componentConfig => {
            const component = new componentConfig.component(this);
            this._components.push(component);
        })
    }

    public onAwake(): void {
        this._components.forEach(component => component.awake());
    }

    public onFixedUpdate(): void {
        this._components.forEach(component => component.fixedUpdate());
    }

    public onEarlyUpdate(): void {
        this._components.forEach(component => component.earlyUpdate());
    }

    public onLateUpdate(): void {
        this._components.forEach(component => component.lateUpdate());
    }
}