export interface GameEngineConfig {
    fixedUpdateTickRate: number
}

export class GameEngine {
    private tick: number = 0;
    private fixedUpdateInterval: NodeJS.Timer;

    constructor(config: GameEngineConfig) {
        console.log("Initializing Game Engine...");

        this.awake();

        console.log("Fixed Update Tick Rate: ", config.fixedUpdateTickRate);
        this.fixedUpdate(); // The first update
        this.fixedUpdateInterval = setInterval(() => this.fixedUpdate(), config.fixedUpdateTickRate);
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