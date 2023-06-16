export interface GameEngineConfig {
    fixedDeltaTime: number,
    autoInit?: boolean
}

export class GameEngine {
    public get tick() { return this._tick }
    public get isInitialized() { return this._isInitialized }

    private _config: GameEngineConfig;

    private _isInitialized: boolean = false;
    private _tick: number = 0;
    private _fixedUpdateInterval?: NodeJS.Timer;

    constructor(config: GameEngineConfig) {
        console.log("Game Engine Instantiated");
        this._config = config;
    }

    public initialize() {
        console.log("Initializing Game Engine...");

        this.resetState();
        this._isInitialized = true;

        this.awake();
        this.startFixedUpdateInterval();
    }

    public deinitialize() {
        if (!this._isInitialized) return;

        console.log("Deinitializing Game Engine...");

        this.clearFixedUpdateInterval();
    }

    private awake() {
        console.log("Game Engine Awake")

        // TODO : Awake logic
    }

    private fixedUpdate() {
        console.log("Fixed Update Tick:", this._tick);

        // TODO : Update logic

        this._tick++;
    }

    private resetState() {
        this._isInitialized = false;
        this._tick = 0;
        this.clearFixedUpdateInterval();
    }

    private startFixedUpdateInterval() {
        console.log("Game Engine Fixed Update Tick Rate: ", this._config.fixedDeltaTime);
        console.log("Starting Game Engine Fixed Update Interval");

        this.fixedUpdate(); // The first update
        this._fixedUpdateInterval = setInterval(() => this.fixedUpdate(), this._config.fixedDeltaTime);
    }

    private clearFixedUpdateInterval() {
        if (this._fixedUpdateInterval) {
            console.log("Clearing fixed update interval")
            clearInterval(this._fixedUpdateInterval);

            this._fixedUpdateInterval = undefined;
        }
    }
}