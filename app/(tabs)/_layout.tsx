import { router, Tabs } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons"
import { useTheme } from "@/store/ThemeProvider";
import { ColorsType } from "@/typings";

export default function TabScreen() {
    const { colors } = useTheme();
    const wrapper = makeStyles(colors);

    const HeaderRight = () => {
        return (
            <Pressable style={wrapper.pressable}>
                <Ionicons name="information-circle-outline" size={24} style={wrapper.icon} onPress={() => router.push("/(tabs)/about")} />
            </Pressable>
        )
    }

    return (
        <Tabs screenOptions={{ headerRight: () => <HeaderRight /> }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Hymns",
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="book-outline" color={color} />,
                }}
            />
            <Tabs.Screen
                name="liturgy"
                options={{
                    title: 'Liturgy',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="calendar-outline" color={color} />,
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="bookmark-outline" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <Ionicons size={28} name="settings-outline" color={color} />,
                }}
            />
            {/* Hide the dynamic route from the tab bar */}
            <Tabs.Screen name="[id]" options={{ href: null }} />
            <Tabs.Screen name="about" options={{ href: null }} /> 
            <Tabs.Screen name="+not-found" options={{ href: null }} /> 
        </Tabs>
    );
}

const makeStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    pressable: {
    },
    icon: {
        color: "#000000",
        padding: 12,
    }
  });
}
