import { Redirect, router, Slot, Stack } from "expo-router";
import { Pressable, StyleSheet, Alert, Share, Text, View, Platform } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { HeaderBackButton } from "@react-navigation/elements";
import { useHymns } from "@/store/HymnProvider";
import { Colors } from "@/constants/theme";
import { truncateString } from "@/utils";

const HymnLayout = () => {
    const { selectedHymn } = useHymns();

    const handleShare = async () => {
        try {
            const message = `
                CHB ${selectedHymn?.id} \n
                ${selectedHymn?.content}
            `;

            await Share.share({ message });

        } catch (error: any) {
            Alert.alert(error.message)
        }
    }

    const HeaderLeft = () => {
        return <HeaderBackButton 
                    backImage={() => <Ionicons name="arrow-back" size={24} style={styles.icon} />} onPress={() => router.back()}></HeaderBackButton>
    }

    const HeaderRight = () => {
        return (
            <Pressable style={styles.pressable}>
                <Ionicons name="share-social" size={20} style={styles.icon} onPress={handleShare} />
            </Pressable>
        )
    }

    if (!selectedHymn) {
        return <Redirect href={`/+not-found`} />
    }

    let title = `${selectedHymn.id}. ${selectedHymn.title.toUpperCase()}`;

    if (Platform.OS === "android") {
        title = truncateString(`${selectedHymn.id}. ${selectedHymn.title.toUpperCase()}`, 36);
    }

    return (
        <>
            <Stack.Screen options={{ 
                headerLeft: () => <HeaderLeft />, 
                title,
                headerRight: () => <HeaderRight />,
                headerTitleStyle: {
                    fontSize: 14
                }
            }} />
            <Slot />
        </>

    );
}

const styles = StyleSheet.create({
    pressable: {
        marginRight: 8,
    },
    icon: {
        color: Colors.dark.text,
        padding: 12,
    }
});

export default HymnLayout;