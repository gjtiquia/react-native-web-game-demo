import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context"

// Notice the import path `@shopify/react-native-skia/lib/module/web`
// This is important only to pull the code responsible for loading Skia.
import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { UIOverlay } from "src/UIOverlay";
import { useEffect } from "react";
import { InputSystem } from "./core/architecture";
import { InputAction } from "./config";

export const Main = () => {
    // Only listen to keyboard events on the web
    listenToKeyboardEvents();

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

const listenToKeyboardEvents = () => {
    const onKeyDownEvent = (e: KeyboardEvent) => {
        if (e.code === "Space") {
            InputSystem.addActionToBuffer(InputAction.Jump);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", onKeyDownEvent);
        return () => document.removeEventListener("keydown", onKeyDownEvent);
    }, []);
}
