export abstract class Time {
    /** Unit: ms. The fixed time between ticks */
    public static get fixedDeltaTime() { return (1000 / this.tickRate) }

    /** Unit: ticks per second. */
    public static tickRate: number;
}