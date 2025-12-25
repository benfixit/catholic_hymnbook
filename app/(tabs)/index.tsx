import { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import debounce from 'debounce';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "@/components/Search";
import { useHymns } from "@/store/HymnProvider";
import { useTheme } from "@/store/ThemeProvider";
import { ColorsType } from "@/typings";
import { searchFilterCallback } from "@/utils";
import { categories } from "@/constants/categories";
import List from "@/components/List";

export default function Index() {
    const { hymns, category: categorySlug } = useHymns();
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

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.searchWrapper}>
                    <SearchBox onSearch={debounce(onSearch, 300)} />
                </View>
                <View style={styles.listWrapper}>
                    <List hymns={filteredHymns} />
                </View>
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
            paddingTop: 16
        },
        searchWrapper: {
            backgroundColor: colors.secondaryBackground,
            paddingVertical: 16
        },
        listWrapper: {
            padding: 16
        }
    });
}