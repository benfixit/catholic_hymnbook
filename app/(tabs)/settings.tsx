import { useMemo, useState } from "react";
import { Link } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Pressable, Switch } from "react-native";
import { useTheme } from "@/store/ThemeProvider";
import { ColorsType } from "@/typings";
import Ionicons from "@react-native-vector-icons/ionicons";
import { linkColor } from "@/constants/theme";

export default function SettingsScreen() {
    const { colors } = useTheme();
    const [themeEnabled, setThemeEnabled] = useState(false);
    
    const styles = useMemo(() => makeStyles(colors), [colors]);

    const toggleSwitch = () => {
        setThemeEnabled(!themeEnabled);
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.appearanceView}>
                    <Text style={styles.appearanceTitle}>Appearance</Text>
                    <Pressable style={styles.themePressable}>
                        <View style={styles.themeView}>
                            <Ionicons name="sunny-outline" size={24} style={styles.themeIcon} />
                            <Text style={styles.themeText}>Dark Mode</Text>
                            <View style={styles.switchView}>
                                <Switch
                                    trackColor={{ false: "#767577", true: colors.primaryColor }}
                                    thumbColor={ themeEnabled ? "#ffffff" : '#f4f3f4' }
                                    ios_backgroundColor={"#3e3e3e"}
                                    onValueChange={toggleSwitch}
                                    value={themeEnabled}
                                    style={styles.themeSwitch} // Example of resizing
                                />
                            </View>
                        </View>
                    </Pressable>
                </View>
                <View>
                    <Text style={styles.supportTitle}>Support</Text>
                    <View>
                        <View style={[styles.socialBase, styles.emailView]}>
                            <Ionicons name="mail-outline" size={24} color={colors.primaryColor} />
                            <Text style={styles.contactItem}>Email: devemeka2@gmail.com</Text>
                        </View>
                        <View  style={[styles.socialBase, styles.websiteView]}>
                            <Ionicons name="globe-outline" size={24} color={colors.primaryColor} />
                            <Text style={styles.contactItem}>Website: <Link href={"https://emekainya.com/"} style={styles.link}>Visit my web profile.</Link></Text>
                        </View>
                    </View>
                </View>x
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const makeStyles = (colors: ColorsType) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 16,
        },
        appearanceView: {
            marginBottom: 24
        },
        appearanceTitle: {
            textTransform: "uppercase",
            color: "#555555",
            marginBottom: 8
        },
        themePressable: {
            paddingHorizontal: 12,
            paddingVertical: 16,
            backgroundColor: "#ffffff",
            borderRadius: 8
        },
        themeView: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        themeIcon: {
            flex: 1,
            color: colors.primaryColor
        },
        themeText: {
            flex: 5
        },
        switchView: {
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
        },
        themeSwitch: { 
            transform: [{ scaleX: 0.7 }, { scaleY: 0.8 }] 
        },
        supportTitle: {
            textTransform: "uppercase",
            color: "#555555",
            marginBottom: 8
        },
        socialBase: { 
            display: "flex", 
            flexDirection: "row", 
            alignItems: "center", 
            columnGap: 16, 
            paddingHorizontal: 12,
            paddingVertical: 16,
            backgroundColor: "#ffffff"
        },
        emailView: {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#efefef"
        },
        websiteView: {
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8
        },
        contactItem: {

        },
        link: {
            color: linkColor
        }
    });
}