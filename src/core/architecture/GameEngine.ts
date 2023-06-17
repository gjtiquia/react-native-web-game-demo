import { Vector2 } from "src/core"

export interface GameEngineConfig {
    /** One cycle of a game loop is called a tick. Tick rate is the number of ticks per second. */
    tickRate: number

    referenceResolution: Vector2
}

export class GameEngine {
    public get tick() { return this._tick }
    public get tickRate() { return this._config.tickRate }
    public get isInitialized() { return this._isInitialized }
    public get isAwake() { return this._isAwake }

    // TODO : Refactor later
    public get test_box_y() { return this._test_box_y }
    public get test_platform_y() { return this._test_platform_y }
    public get test_referenceResolution_y() { return this._config.referenceResolution.y }
    //

    private get _fixedDeltaTime() { return (1000 / this._config.tickRate) }

    private _config: GameEngineConfig;
    private _isInitialized: boolean = false;
    private _isAwake: boolean = false;
    private _tick: number = 0;
    private _fixedUpdateInterval?: NodeJS.Timer;

    // TODO : Refactor later
    private _test_box_y: number = 0;
    private _test_platform_y: number = 0;
    //

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

        // TODO : Refactor later
        // ReferenceResolution: 100
        this._test_box_y = 80;
        this._test_platform_y = 20;
        //

        this._isAwake = true;
    }

    private fixedUpdate() {
        // console.log("Fixed Update Tick:", this._tick);

        // TODO : Update logic

        // TODO : Just testing, refactor later
        const speed = 0.05; // Units per delta time (in ms)
        if (this._test_box_y > this._test_platform_y) {
            this._test_box_y -= speed * this._fixedDeltaTime;
        }

        // console.log(this._test_yPosition);


        this._tick++;
    }

    private resetState() {
        this._isInitialized = false;
        this._isAwake = false;
        this._tick = 0;
        this.clearFixedUpdateInterval();
    }

    private startFixedUpdateInterval() {
        console.log(`Game Engine Tick Rate: ${this._config.tickRate}TPS`);
        console.log(`Game Engine Fixed Delta Time: ${this._fixedDeltaTime}ms`)
        console.log("Starting Game Engine Fixed Update Interval");

        this.fixedUpdate(); // The first update
        this._fixedUpdateInterval = setInterval(() => this.fixedUpdate(), this._fixedDeltaTime);
    }

    private clearFixedUpdateInterval() {
        if (this._fixedUpdateInterval) {
            console.log("Clearing fixed update interval")
            clearInterval(this._fixedUpdateInterval);

            this._fixedUpdateInterval = undefined;
        }
    }
}