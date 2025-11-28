import Ionicons, { IoniconsIconName } from "@react-native-vector-icons/ionicons";
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    title: string;
    icon: IoniconsIconName;
    isActive: boolean;
    onPress: (event: GestureResponderEvent) => void;
};

const SettingsButton = (props: Props) => {
    const { title, icon, isActive, onPress } = props;

    return (
        <Pressable style={styles.pressable} onPress={onPress}>
        <View style={styles.pressableView}>
            <Ionicons name={icon} size={16} style={{ marginRight: 4 }} />
            <Text>{title}</Text>
        </View>
        <View>
            {isActive ? <Ionicons name='checkmark-circle' size={16} color={'#0078d7'} /> : <Ionicons name='ellipse-outline' size={16} />}
        </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        borderColor: "#cdcdcd",
        borderWidth: 1,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 8
    },
    pressableView: {
        display: "flex",
        flexDirection: "row"
    },
});

export default SettingsButton;