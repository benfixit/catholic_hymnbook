import Ionicons from "@react-native-vector-icons/ionicons"
import { Tabs } from "expo-router";

export default function TabScreen() {
    return (
        <Tabs>
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