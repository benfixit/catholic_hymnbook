import { Redirect, router, Slot, Stack } from "expo-router";
import { useHymns } from "@/store/HymnProvider";
import { HeaderBackButton } from "@react-navigation/elements";
import Ionicons from "@react-native-vector-icons/ionicons";


const HymnLayout = () => {
    const { selectedHymn } = useHymns();

    const HeaderLeft = () => {
        return <HeaderBackButton backImage={() => <Ionicons name="arrow-back-outline" size={24} style={{ padding: 12 }} />} onPress={() => router.back()}></HeaderBackButton>
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

export default HymnLayout;