import { Redirect, Slot, Stack } from "expo-router";
import { useHymns } from "@/store/HymnProvider";


const HymnLayout = () => {
    const { selectedHymn } = useHymns();

    if (!selectedHymn) {
        return <Redirect href={`/+not-found`} />
    }

    let title = `${selectedHymn.id}. ${selectedHymn.title.toUpperCase()}`;
    if (selectedHymn.subtitle) {
        title += ` ${selectedHymn.subtitle}`;
    }

    return (
        <>
            <Stack.Screen options={{ title }} />
            <Slot />
        </>

    );
}

export default HymnLayout;