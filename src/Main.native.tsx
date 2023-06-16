import { SafeAreaProvider } from "react-native-safe-area-context"

import { MySkiaComponent } from "src/components";
import { UIOverlay } from "src/UIOverlay";
import { useGameEngine } from "src/core";

const Main = () => {
    useGameEngine();

    return (
        <SafeAreaProvider>
            <MySkiaComponent />
            <UIOverlay />
        </SafeAreaProvider>
    );
}

export { Main }