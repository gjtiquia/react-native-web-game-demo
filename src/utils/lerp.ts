export const lerp = (a: number, b: number, alpha: number) => {
    return (a + (b - a) * alpha)
}