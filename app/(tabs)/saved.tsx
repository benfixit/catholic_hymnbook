import EmptyScreen from "@/components/Empty";
import { useHymns } from "@/store/HymnProvider";
import { useTheme } from "@/store/ThemeProvider";
import { ColorsType, HymnType, Nullable } from "@/typings";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

export default function SavedScreen() {
    const { favorites, hymns, setHymn } = useHymns();
    const { colors } = useTheme();
    const [ favoriteHymns, setFavoriteHymns ] = useState<HymnType[]>([]);
    const styles = useMemo(() => makeStyles(colors), [colors]);

    useEffect(() => {
        const data = hymns.filter(hymn => favorites.includes(hymn.id));
        setFavoriteHymns(data);
    }, [favorites]);

    const renderItem = (item: HymnType, setHymn: Dispatch<SetStateAction<Nullable<HymnType>>>) => {
        const router = useRouter();

        return (
            <Pressable onPress={() => {
                setHymn(item)
                router.push(`/(tabs)/[${item.id}]`);
            }} style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'}, styles.pressable]}>
                <View style={styles.view}>
                    <View style={styles.hymnIdView}>
                        <Text style={styles.hymnId}>{item.id}</Text>
                    </View>
                    <View style={styles.hymnTitleView}>
                        <Text style={styles.hymnTitle}>{item.title}</Text>
                        <Text style={styles.hymnSubtitle}>English . Entrance</Text>
                    </View>
                    <View style={styles.hymnIconView}>
                        <Ionicons style={styles.hymnIcon} name="chevron-forward-outline" size={24} />
                    </View>
                </View>
            </Pressable>
        );
    }

    return (
        <>
        {favoriteHymns.length > 0 ? (
            <FlatList 
                showsVerticalScrollIndicator={false} 
                renderItem={({item}) => renderItem(item, setHymn)} 
                data={favoriteHymns} 
                keyExtractor={(item) => item.slug}
                contentContainerStyle={{ rowGap: 16 }}
                style={styles.flatList}
            />
        ) : (
            <EmptyScreen>
                <Ionicons name="heart-outline" size={48} style={styles.icon} />
                <Text>
                    You have no favorite hymns saved yet.
                </Text>
            </EmptyScreen>
        )}
        </>
    );
}

const makeStyles = (colors: ColorsType) => {
    return StyleSheet.create({
    icon: {
        color: "#888888",
        marginBottom: 16
    },
    flatList: { 
            padding: 16 
        },
        pressable: {
            backgroundColor: colors.secondaryBackground,
            borderWidth: 1,
            borderColor: "transparent",
            borderRadius: 8,
            paddingVertical: 24,
            paddingHorizontal: 12
        },
        view: {
            backgroundColor: colors.secondaryBackground,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            columnGap: 16
        },
        hymnIdView: {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "transparent",
            borderRadius: 8,
            paddingVertical: 12,
            backgroundColor: colors.secondaryColor
        },
        hymnTitleView: {
            flex: 5
        },
        hymnIconView: {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "transparent",
            borderRadius: 8,
            paddingVertical: 12
        },
        hymnId: {
            color: colors.primaryColor,
            fontWeight: "bold"
        },
        hymnTitle: {
            color: colors.text,
            fontSize: 14,
            fontWeight: "bold",
            backgroundColor: colors.secondaryBackground,
            marginBottom: 8
        },
        hymnSubtitle: {
            color: "rgb(136, 152, 174)",
            fontSize: 12,
            backgroundColor: colors.secondaryBackground
        },
        hymnIcon: {
            color: "rgb(136, 152, 174)",
        }
})}