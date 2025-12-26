import { useEffect, useMemo, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import EmptyScreen from "@/components/Empty";
import List from "@/components/List";
import { useHymns } from "@/store/HymnProvider";
import { useTheme } from "@/store/ThemeProvider";
import { ColorsType, HymnType } from "@/typings";

export default function SavedScreen() {
    const { favorites, hymns } = useHymns();
    const { colors } = useTheme();
    const [ favoriteHymns, setFavoriteHymns ] = useState<HymnType[]>([]);
    const styles = useMemo(() => makeStyles(colors), [colors]);

    useEffect(() => {
        const data = hymns.filter(hymn => favorites.includes(hymn.id));
        setFavoriteHymns(data);
    }, [favorites]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {favoriteHymns.length > 0 ? (
                    <List hymns={favoriteHymns} />
                ) : (
                    <EmptyScreen>
                        <Ionicons name="heart-outline" size={48} style={styles.icon} />
                        <Text>
                            You have no favorite hymns saved yet.
                        </Text>
                    </EmptyScreen>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const makeStyles = (colors: ColorsType) => {
    return StyleSheet.create({
        container: {
            padding: 16,
            backgroundColor: colors.background,
            flex: 1
        },
        icon: {
            color: colors.secondaryText,
            marginBottom: 16
        },
        iconText: {
            color: colors.secondaryText
        }
    })
}