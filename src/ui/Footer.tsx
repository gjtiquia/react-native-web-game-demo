import { View, Linking, Text } from "react-native"

export const Footer = () => {
    return (
        <View className="flex flex-row justify-between items-center p-2">
            <Text className="font-bold text-slate-50 text-lg">React Native Web Game Demo</Text>
            <Text
                className="font-bold text-blue-500"
                onPress={() => Linking.openURL("https://github.com/gjtiquia/react-native-web-game-demo")}
            >
                GitHub Link
            </Text>
        </View>
    )
}