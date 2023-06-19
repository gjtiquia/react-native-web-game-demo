import { Pressable, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Footer, InputSystem, InputAction } from "src/internalExports"

//! somehow the code cannot compile? might be circular dependency
const jumpAction = InputAction.Jump;

export const UIOverlay = () => {
    return (
        <SafeAreaView className="h-full flex justify-end">
            <Pressable
                className="bg-blue-400 active:bg-blue-500 border-slate-50 mb-6 self-center px-24 py-4 rounded-md"
                onPressIn={() => {
                    InputSystem.addActionToBuffer("jump");
                }}
            >
                <Text className="text-slate-50 font-bold text-3xl">Jump</Text>
            </Pressable>

            <Footer />
        </SafeAreaView>
    )
}