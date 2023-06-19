export interface InputSystemConfig {
    inputActions: string[]
}

export abstract class InputSystem {

    private static _inputActions: string[];
    private static _bufferedActions: string[];

    public static initialize(config: InputSystemConfig): void {
        this._inputActions = config.inputActions.map(action => action);
        this._bufferedActions = new Array<string>();

        console.log("Input System initialized! Registered actions: ", this._inputActions);
    }

    public static addActionToBuffer(inputAction: string): void {
        if (this.isActionBuffered(inputAction, true)) return;

        this._bufferedActions.push(inputAction);
        // console.log("Buffered Actions: ", this._bufferedActions);

        // TODO : Publish a message somehow in case need instant feedback?
    }

    public static isActionBuffered(inputAction: string, logWarning: boolean = false): boolean {
        if (!this.isRegistered(inputAction)) return false;

        const isAlreadyBuffered = this._bufferedActions.includes(inputAction);

        if (isAlreadyBuffered && logWarning)
            console.warn(`InputSystem: The input action "${inputAction}" is already buffered! Ignoring...`);

        return isAlreadyBuffered;
    }

    public static clearBufferredActions(): void {
        // this._bufferedActions = [] may create issues if it is referenced somewhere else in the code
        // Reference: https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
        this._bufferedActions.length = 0;
    }

    private static isRegistered(inputAction: string, logError: boolean = true): boolean {
        const isRegistered = this._inputActions.includes(inputAction);

        if (!isRegistered && logError)
            console.error(`InputSystem: The input action "${inputAction}" is not registered! Registered actions: `, this._inputActions)

        return isRegistered;
    }
}