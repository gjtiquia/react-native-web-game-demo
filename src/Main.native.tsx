import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context"

import { MySkiaComponent } from "src/components";
import { UIOverlay } from "./UIOverlay";
import { GameEngine } from "./core";

const Main = () => {
    useEffect(() => {
        const gameEngine = new GameEngine();

        return () => {
            gameEngine.onDestroy();
        }
    }, [])

    return (
        <SafeAreaProvider>
            <MySkiaComponent />
            <UIOverlay />
        </SafeAreaProvider>
    );
}

export { Main }