import { useRouter } from "expo-router";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import debounce from 'debounce';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "@/components/Search";
import { useHymns } from "@/store/HymnProvider";
import { useTheme } from "@/store/ThemeProvider";
import { ColorsType, HymnType, Nullable } from "@/typings";
import { searchFilterCallback } from "@/utils";
import { categories } from "@/constants/categories";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function Index() {
    const { hymns, setHymn, category: categorySlug } = useHymns();
    const { colors } = useTheme();
    const [filteredHymns, setFilteredHymns] = useState(hymns);
    const [searchTerm, setSearchTerm] = useState("");
    const styles = useMemo(() => makeStyles(colors), [colors]);

    useEffect(() => {
        let data = hymns;

        // filter by category
        if (categorySlug) {
            const category = categories.find(category => category.slug === categorySlug);
            const idsSet = new Set(category?.hymns);

            data = data.filter((hymn) => idsSet.has(hymn.id));
        }

        // filter by search term
        data = data.filter(hymn => searchFilterCallback(hymn, searchTerm));

        setFilteredHymns(data)

    }, [categorySlug, searchTerm]);

    const onSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    }

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
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.searchWrapper}>
                    <SearchBox onSearch={debounce(onSearch, 300)} />
                </View>
                <FlatList 
                    showsVerticalScrollIndicator={false} 
                    renderItem={({item}) => renderItem(item, setHymn)} 
                    data={filteredHymns} 
                    keyExtractor={(item) => item.slug}
                    keyboardDismissMode="on-drag"
                    contentContainerStyle={{ rowGap: 16 }}
                    style={styles.flatList}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const makeStyles = (colors: ColorsType) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            paddingBottom: 16,
            paddingTop: 16,
        },
        searchWrapper: {
            backgroundColor: colors.secondaryBackground,
            paddingVertical: 16
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
            backgroundColor: "rgb(255, 240, 240)"
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
            color: "rgb(181, 26, 32)",
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
    });
}