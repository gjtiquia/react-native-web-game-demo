import { Button, Platform, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context"

// Notice the import path `@shopify/react-native-skia/lib/module/web`
// This is important only to pull the code responsible for loading Skia.
import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { UIOverlay } from "./UIOverlay";
import { useEffect } from "react";
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
            <WithSkiaWeb
                getComponent={() => import("src/components/MySkiaComponent")}
                fallback={<Text>Loading Skia...</Text>}
            />
            <UIOverlay />
        </SafeAreaProvider>
    );
}

export { Main }