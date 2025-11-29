import { Redirect, router, Slot, Stack } from "expo-router";
import { Pressable, StyleSheet, Alert, Share } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { HeaderBackButton } from "@react-navigation/elements";
import { useHymns } from "@/store/HymnProvider";
import { Colors } from "@/constants/theme";

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
            <Pressable>
                <Ionicons name="share-social" size={24} style={styles.icon} onPress={handleShare} />
            </Pressable>
        )
    }

    if (!selectedHymn) {
        return <Redirect href={`/+not-found`} />
    }

    const title = `${selectedHymn.id}. ${selectedHymn.title.toUpperCase()}`;

    return (
        <>
            <Stack.Screen options={{ title, headerLeft: () => <HeaderLeft />, headerRight: () => <HeaderRight /> }} />
            <Slot />
        </>

    );
}

const styles = StyleSheet.create({
    icon: {
        color: Colors.dark.text,
        padding: 12,
    }
});

export default HymnLayout;