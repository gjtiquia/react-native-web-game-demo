import { SafeAreaProvider } from "react-native-safe-area-context"

import { MySkiaComponent } from "src/components";
import { UIOverlay } from "src/UIOverlay";

const Main = () => {
    return (
        <SafeAreaProvider>
            <MySkiaComponent />
            <UIOverlay />
        </SafeAreaProvider>
    );
}

export { Main }