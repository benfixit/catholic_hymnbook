import { Redirect, router, Slot, Stack } from "expo-router";
import { Pressable, StyleSheet, Alert, Share } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Button, HeaderBackButton } from "@react-navigation/elements";
import { useHymns } from "@/store/HymnProvider";

const HymnLayout = () => {
    const { selectedHymn } = useHymns();

    const handleShare = async () => {
        try {
            // console.log("selected hymn ::: ", selectedHymn);
            const result = await Share.share({
                message: selectedHymn?.content as string
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("result ::: ", result.activityType, result.action)
                // shared with activity type of result.activityType
                } else {
                // shared
                console.log("only result action ::: ", result.action)
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
                console.log("only result dismissed ::: ", result.action)
            }

        } catch (error: any) {
            Alert.alert(error.message)
        }
    }

    const HeaderLeft = () => {
        return <HeaderBackButton 
                    backImage={() => <Ionicons name="arrow-back-outline" size={24} style={styles.backButton} />} onPress={() => router.back()}></HeaderBackButton>
    }

    const HeaderRight = () => {
        return (
            <Pressable>
                <Ionicons name="share-social-outline" size={24} style={styles.shareIcon} onPress={handleShare} />
            </Pressable>
        )
    }

    if (!selectedHymn) {
        return <Redirect href={`/+not-found`} />
    }

    const title = `${selectedHymn.id}. ${selectedHymn.title.toUpperCase()}`;

    return (
        <>
            <Stack.Screen options={{ title, headerLeft: () => <HeaderLeft />, headerRight: () => <HeaderRight /> }} />,
            <Slot />
        </>

    );
}

const styles = StyleSheet.create({
    backButton: {
        color: "#ffffff",
        padding: 12,
    },
    shareIcon: {
        color: "#ffffff",
        padding: 12,
    }
});

export default HymnLayout;