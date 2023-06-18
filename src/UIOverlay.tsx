import { Pressable, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Footer } from "src/ui"
import { InputSystem } from "./core/architecture/InputSystem"

export const UIOverlay = () => {
    return (
        <SafeAreaView className="h-full flex justify-end">
            <Pressable
                className="bg-blue-400 active:bg-blue-500 border-slate-50 mb-6 self-center px-24 py-4 rounded-md"
                onPress={() => {
                    console.log("Jump!");
                    InputSystem.bufferAction("jump"); // TODO : save the string in an enum? dont hardcode
                }}
            >
                <Text className="text-slate-50 font-bold text-3xl">Jump</Text>
            </Pressable>

            <Footer />
        </SafeAreaView>
    )
}