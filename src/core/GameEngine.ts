const FIXED_UPDATE_TICK_RATE = 1000;

export class GameEngine {
    private tick: number = 0;
    private fixedUpdateInterval: NodeJS.Timer;

    constructor() {
        console.log("Initializing Game Engine...");

        this.awake();

        console.log("Fixed Update Tick Rate: ", FIXED_UPDATE_TICK_RATE);
        this.fixedUpdate(); // The first update
        this.fixedUpdateInterval = setInterval(() => this.fixedUpdate(), FIXED_UPDATE_TICK_RATE);
    }

    public onDestroy() {
        console.log("Deinitializing Game Engine...");

        clearInterval(this.fixedUpdateInterval);
    }

    private awake() {
        console.log("Awake")

        // TODO : Awake logic
    }

    private fixedUpdate() {
        console.log("Fixed Update Tick:", this.tick);

        // TODO : Update logic

        this.tick++;
    }
}