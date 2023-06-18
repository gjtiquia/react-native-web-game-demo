export interface InputSystemConfig {
    inputActions: string[]
}

export abstract class InputSystem {

    private static _inputActions: string[];
    private static _bufferedActions: string[];

    public static initialize(config: InputSystemConfig) {
        this._inputActions = config.inputActions.map(action => action);
        this._bufferedActions = new Array<string>();

        console.log("Input System initialized! Registered actions: ", this._inputActions);
    }

    // TODO : rename to addToBuffer
    public static bufferAction(inputAction: string) {
        // TODO : Add a buffer limit?

        if (!this._inputActions.includes(inputAction)) {
            console.error(`InputSystem: The input action "${inputAction}" is not registered! Registered actions: `, this._inputActions);
            return;
        }

        this._bufferedActions.push(inputAction);
        console.log("Buffered Actions: ", this._bufferedActions);

        // TODO : Publish a message somehow in case need instant feedback?
    }

    // TODO : Clear buffer
}