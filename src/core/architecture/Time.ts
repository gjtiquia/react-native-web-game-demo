export abstract class Time {
    public static get fixedDeltaTime() { return (1000 / this.tickRate) }
    public static tickRate: number;
}