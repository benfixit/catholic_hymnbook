import { Redirect, router, Slot, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { HeaderBackButton } from "@react-navigation/elements";
import { useHymns } from "@/store/HymnProvider";





const HymnLayout = () => {
    const { selectedHymn } = useHymns();

    const HeaderLeft = () => {
        return <HeaderBackButton 
                    backImage={() => <Ionicons name="arrow-back-outline" size={24} style={styles.backButton} />} onPress={() => router.back()}></HeaderBackButton>
    }

    if (!selectedHymn) {
        return <Redirect href={`/+not-found`} />
    }

    let title = `${selectedHymn.id}. ${selectedHymn.title.toUpperCase()}`;
    if (selectedHymn.subtitle) {
        title += ` ${selectedHymn.subtitle}`;
    }

    return (
        <>
            <Stack.Screen options={{ 
                title,
                headerLeft: () => <HeaderLeft />, }} />
            <Slot />
        </>

    );
}

const styles = StyleSheet.create({
    backButton: {
        color: "#ffffff",
        padding: 12,
    }
});

export default HymnLayout;