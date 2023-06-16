import { SafeAreaProvider } from "react-native-safe-area-context"

import { MySkiaComponent } from "src/components";
import { UIOverlay } from "src/UIOverlay";
import { useGameEngine } from "src/core";
import { gameEngineConfig } from "src/config/gameEngineConfig";

const Main = () => {
    useGameEngine(gameEngineConfig);

    return (
        <SafeAreaProvider>
            <MySkiaComponent />
            <UIOverlay />
        </SafeAreaProvider>
    );
}

export { Main }