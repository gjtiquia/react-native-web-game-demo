import { Vector2, Scene, GameEngineConfig, SceneConfig, Time, InputSystem, InputSystemConfig } from "src/internalExports";

export class GameEngine {
    // STATIC MEMBERS
    public static referenceResolution: Vector2;

    // PUBLIC GETTERS
    public get tick() { return this._tick }
    public get isInitialized() { return this._isInitialized }
    public get isAwake() { return this._isAwake }
    public get scene() { return this._scene }

    // PRIVATE MEMBERS
    private _scene: Scene;
    private _isInitialized: boolean = false;
    private _isAwake: boolean = false;
    private _tick: number = 0;
    private _fixedUpdateInterval?: NodeJS.Timer;

    // CONSTRUCTOR
    constructor(config: GameEngineConfig) {
        console.log("Game Engine Instantiated");

        GameEngine.referenceResolution = config.referenceResolution;
        Time.tickRate = config.tickRate;
        InputSystem.initialize(config.inputSystemConfig);

        this._scene = new Scene(config.sceneConfig);
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
        this._scene.onFixedUpdate();
        InputSystem.clearBufferredActions();
        this._tick++;
    }

    private resetState() {
        this._isInitialized = false;
        this._isAwake = false;
        this._tick = 0;
        this.clearFixedUpdateInterval();
    }

    private startFixedUpdateInterval() {
        console.log(`Game Engine Tick Rate: ${Time.tickRate}TPS`);
        console.log(`Game Engine Fixed Delta Time: ${Time.fixedDeltaTime}ms`)
        console.log("Starting Game Engine Fixed Update Interval");

        this.fixedUpdate(); // The first update
        this._fixedUpdateInterval = setInterval(() => this.fixedUpdate(), Time.fixedDeltaTime);
    }

    private clearFixedUpdateInterval() {
        if (!this._fixedUpdateInterval) return;

        console.log("Clearing fixed update interval")
        clearInterval(this._fixedUpdateInterval);

        this._fixedUpdateInterval = undefined;
    }
}