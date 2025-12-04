import { LIGHT_THEME } from "@/constants/theme";
import { useTheme } from "@/store/ThemeProvider";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet } from "react-native";

const HeaderRight = () => {
    const { theme, toggleTheme } = useTheme();

    const handlePress = () => {
        toggleTheme();
    }

    return (
        <Pressable style={styles.pressable} onPress={handlePress}>
            <Ionicons name={theme === LIGHT_THEME ? 'moon' : 'sunny'} color={"white"} size={20} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        marginRight: 16
    }
});

export default HeaderRight;