import { Component, GameObject } from "src/internalExports";

export interface ComponentConfig {
    component: new (gameObject: GameObject) => Component
}