import { SafeAreaView } from "react-native-safe-area-context";
import MyCanvas from "./MyCanvas";

const MySkiaComponent = () => {
    return (
        <SafeAreaView className="absolute h-full w-full">
            <MyCanvas />
        </SafeAreaView>
    );
};

export default MySkiaComponent;