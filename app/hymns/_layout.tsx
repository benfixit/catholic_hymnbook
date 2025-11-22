import { useEffect } from "react";
import { Redirect, Slot, useNavigation } from "expo-router";
import { useHymns } from "@/store/HymnProvider";


const HymnLayout = () => {
    const { selectedHymn } = useHymns();
    const navigation = useNavigation();

    useEffect(() => {
        if (selectedHymn) {
            navigation.setOptions({ title: `${selectedHymn.id}. ${selectedHymn.title.toUpperCase()}` })
        }
    }, [navigation]);

    if (!selectedHymn) {
        return <Redirect href={`/+not-found`} />
    }

    return (
        <Slot />
    );
}

export default HymnLayout;