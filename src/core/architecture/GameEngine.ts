export interface GameEngineConfig {
    fixedDeltaTime: number,
    autoInit?: boolean
}

export class GameEngine {
    public get tick() { return this._tick }
    public get fixedDeltaTime() { return this._config.fixedDeltaTime }

    private _config: GameEngineConfig;
    private _tick: number = 0;
    private _clearUpdateInterval?: NodeJS.Timer;

    constructor(config: GameEngineConfig) {
        this._config = config;

        console.log("Game Engine Instantiated");
        if (config.autoInit === undefined || config.autoInit === true)
            this.initialize();
    }

    public initialize() {
        console.log("Initializing Game Engine...");

        this.awake();

        console.log("Game Engine Fixed Update Tick Rate: ", this._config.fixedDeltaTime);
        console.log("Starting Game Engine Fixed Update Loop");
        this.fixedUpdate(); // The first update
        this._clearUpdateInterval = setInterval(() => this.fixedUpdate(), this._config.fixedDeltaTime);
    }

    public deinitialize() {
        console.log("Deinitializing Game Engine...");

        if (this._clearUpdateInterval)
            clearInterval(this._clearUpdateInterval);
    }

    private awake() {
        console.log("Game Engine Awake")

        // TODO : Awake logic
    }

    private fixedUpdate() {
        // console.log("Fixed Update Tick:", this._tick);

        // TODO : Update logic

        this._tick++;
    }
}