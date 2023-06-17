import { Scene, SceneConfig } from "../architecture"
import { Vector2 } from "../utilities";

export interface GameEngineConfig {
    /** One cycle of a game loop is called a tick. Tick rate is the number of ticks per second. */
    tickRate: number,
    referenceResolution: Vector2,
    sceneConfig: SceneConfig
}

export class GameEngine {
    // STATIC MEMBERS
    public static REFERENCE_RESOLUTION: Vector2;
    public static TICK_RATE: number;

    // PUBLIC GETTERS
    public get tick() { return this._tick }
    public get isInitialized() { return this._isInitialized }
    public get isAwake() { return this._isAwake }
    public get scene() { return this._scene }

    // PRIVATE GETTERS
    private get _fixedDeltaTime() { return (1000 / this._config.tickRate) }

    // PRIVATE MEMBERS
    private _config: GameEngineConfig;
    private _scene: Scene;
    private _isInitialized: boolean = false;
    private _isAwake: boolean = false;
    private _tick: number = 0;
    private _fixedUpdateInterval?: NodeJS.Timer;

    // CONSTRUCTOR
    constructor(config: GameEngineConfig) {
        console.log("Game Engine Instantiated");
        this._config = config;
        this._scene = new Scene(config.sceneConfig);

        GameEngine.REFERENCE_RESOLUTION = config.referenceResolution;
        GameEngine.TICK_RATE = config.tickRate;
    }

    // PUBLIC METHODS
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

        this._scene.onAwake();
        this._isAwake = true;
    }

    private fixedUpdate() {
        this._scene.onFixedUpdate(this._fixedDeltaTime);
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
        if (!this._fixedUpdateInterval) return;

        console.log("Clearing fixed update interval")
        clearInterval(this._fixedUpdateInterval);

        this._fixedUpdateInterval = undefined;
    }
}