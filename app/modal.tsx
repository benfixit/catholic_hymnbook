import Ionicons from "@react-native-vector-icons/ionicons";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTypeFace } from "@/store/TypeFaceProvider";
import { useTheme } from "@/store/ThemeProvider";
import { ColorsType } from "@/typings";

export default function ModalScreen() {
    const { fontSize, saveFontSize } = useTypeFace();
    const { colors } = useTheme();
    const styles = makeStyles(colors);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.header}>
                        <Ionicons name="text-outline" size={24} style={styles.headerT} />
                        <Text style={styles.title}>Reading Display</Text>
                        <Ionicons name="close-outline" size={24} style={styles.closeIcon} onPress={() => router.dismiss()} />
                    </View>
                    <View style={styles.subtitleView}>
                        <Text style={styles.subtitle}>Adjust text size for easier reading:</Text>
                    </View>
                    <View style={styles.sliderView}>
                        <Text style={styles.smallA}>A</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={12}
                            maximumValue={32}
                            step={1}
                            minimumTrackTintColor={colors.primaryColor}
                            maximumTrackTintColor="gray"
                            onValueChange={(value) => saveFontSize(value)}
                            value={fontSize}
                            thumbTintColor={colors.primaryColor}
                        />
                        <Text style={styles.bigA}>A</Text>
                    </View>
                    <View style={styles.fontSizeView}>
                        <Text style={styles.fontSizeText}>{fontSize}px</Text>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const makeStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: colors.secondaryBackground,
        top: "70%",
        boxShadow: '5px 5px 5px 0px rgba(0, 0, 0, 0.5)',
    },
    wrapper: {
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    headerT: {
        flex: 1,
        color: colors.text
    },
    title: {
        flex: 5,
        fontWeight: "bold",
        fontSize: 20,
        color: colors.text
    },
    closeIcon: {
        flex: 1,
        textAlign: "right",
        color: colors.text
    },
    subtitleView: {
        marginBottom: 16
    },
    subtitle: {
        fontSize: 14,
        color: colors.text
    },
    sliderView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    smallA: {
        flex: 1,
        fontSize: 14,
        color: colors.text
    },
    slider: {
        flex: 5,
    },
    bigA: {
        flex: 1,
        textAlign: "right",
        fontSize: 32,
        color: colors.text
    },
    fontSizeView: {

    },
    fontSizeText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text
    }
})
};