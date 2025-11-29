import Ionicons, { IoniconsIconName } from "@react-native-vector-icons/ionicons";
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native";
import { borderBottomColor, mainColor } from "@/constants/theme";
import { useTheme } from "@/store/ThemeProvider";
import { ColorsType } from "@/typings";

type Props = {
    title: string;
    icon: IoniconsIconName;
    isActive: boolean;
    onPress: (event: GestureResponderEvent) => void;
};

const SettingsButton = (props: Props) => {
    const { title, icon, isActive, onPress } = props;
    const { colors } = useTheme();
    const styles = makeStyles(colors);

    return (
        <Pressable style={styles.pressable} onPress={onPress}>
            <View style={styles.view}>
                <Ionicons name={icon} size={16} style={styles.icon} />
                <Text style={styles.text}>{title}</Text>
            </View>
            <View>
                {isActive ? <Ionicons name='checkmark-circle' size={16} style={styles.iconToggle} /> : <Ionicons name='ellipse-outline' size={16} style={styles.iconToggle} />}
            </View>
        </Pressable>
    );
}

const makeStyles = (colors: ColorsType) => StyleSheet.create({
    pressable: {
        borderColor: borderBottomColor,
        borderWidth: 1,
        backgroundColor: colors.background,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 8
    },
    view: {
        display: "flex",
        flexDirection: "row"
    },
    icon: {
        color: colors.text,
        marginRight: 4
    },
    iconToggle: {
        borderColor: borderBottomColor,
        color: colors.text
    },
    text: {
        color: colors.text,
    }
});

export default SettingsButton;