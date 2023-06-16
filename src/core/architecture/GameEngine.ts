export interface GameEngineConfig {
    fixedDeltaTime: number,
    autoInit?: boolean
}

export class GameEngine {
    public get tick() { return this._tick }
    public get isInitialized() { return this._isInitialized }

    // TODO : Refactor later
    public get test_yPosition() { return this._test_yPosition }

    private get _fixedDeltaTime() { return this._config.fixedDeltaTime }

    private _config: GameEngineConfig;
    private _isInitialized: boolean = false;
    private _tick: number = 0;
    private _fixedUpdateInterval?: NodeJS.Timer;

    // TODO : Refactor later
    private _test_yPosition: number = 0;

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
        // console.log("Fixed Update Tick:", this._tick);

        // TODO : Update logic

        // TODO : Just testing, refactor later
        const speed = 0.1;
        this._test_yPosition += speed * this._fixedDeltaTime;
        // console.log(this._test_yPosition);


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