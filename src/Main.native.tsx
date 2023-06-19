import { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from 'expo-navigation-bar';

import { MySkiaComponent, UIOverlay } from "src/internalExports";

const Main = () => {
    // Init Android NavBar
    useEffect(() => {
        if (Platform.OS !== "android") return;

        NavigationBar.setBorderColorAsync("transparent");
        NavigationBar.setBackgroundColorAsync("#222")
    }, []);

    return (
        <SafeAreaProvider>
            <MySkiaComponent />
            <UIOverlay />

            <StatusBar style="light" backgroundColor="#222" hidden={false} />
        </SafeAreaProvider>
    );
}

export { Main }