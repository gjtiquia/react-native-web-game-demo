interface SkiaConfig {
    debugMode: boolean,

    /** Closer to 1 = Follow closer, Closer to 0 = Smoother but follow slower */
    interpolationStrength: number,

    /** Unit: pixels. If crossed this threshold, will snap into the position instead.  */
    interpolationThreshold: number,
}

export const skiaConfig: SkiaConfig = {
    debugMode: true,

    interpolationStrength: 0.35,
    interpolationThreshold: 300
}