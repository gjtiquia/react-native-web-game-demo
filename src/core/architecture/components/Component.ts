import { GameObject } from "../../architecture";

//! Not sure why defining this in a separate file breaks?
// export abstract class Component {
//     protected _gameObject: GameObject;

//     constructor(gameObject: GameObject) {
//         this._gameObject = gameObject;

//         console.log("Component: GameObject ID: ", gameObject.id);
//     }

//     public awake(): void { }
//     public fixedUpdate(): void { }
// }