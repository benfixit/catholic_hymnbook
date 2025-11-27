import { UnknownOutputParams, useLocalSearchParams, useRouter } from "expo-router";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, FlatList, Pressable, StatusBar } from "react-native";
import debounce from 'debounce';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "@/components/Search";
import { useHymns } from "@/store/HymnProvider";
import { useTheme } from "@/store/ThemeProvider";
import { Category, ColorsType, HymnType } from "@/typings";
import { searchFilterCallback } from "@/utils";

export default function Index() {
    const { hymns, setHymn } = useHymns();
    const { colors } = useTheme();
    const [filteredHymns, setFilteredHymns] = useState(hymns);
    const [searchTerm, setSearchTerm] = useState("");
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const params: UnknownOutputParams & { category: Category } = useLocalSearchParams();

    useEffect(() => {
        let data = hymns;

        if (params.category) {
            data = data.filter((hymn) => hymn.category === params.category);
        }

        data = data.filter(hymn => searchFilterCallback(hymn, searchTerm));

        setFilteredHymns(data)

    }, [params.category, searchTerm]);

    const onSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    }

    const renderItem = (item: HymnType, setHymn: Dispatch<SetStateAction<HymnType>>) => {
        const router = useRouter();

        return (
            <Pressable onPress={() => {
                setHymn(item)
                router.push(`/hymn/[${item.id}]`);
            }} style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'}, styles.pressable]}>
                <View style={styles.view}>
                    {/* <Text style={styles.text}>{item.id}. {item.title}</Text> */}
                    <Text style={styles.text}>{item.title}</Text>
                </View>
            </Pressable>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <SearchBox onSearch={debounce(onSearch, 300)} />
                <FlatList showsVerticalScrollIndicator={false} renderItem={({item}) => renderItem(item, setHymn)} data={filteredHymns} keyExtractor={(item) => item.slug} />
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
        item: {
            padding: 24
        },
        pressable: {},
        view: {
            borderBottomWidth: 1,
            borderBottomColor: "#cdcdcd",
            backgroundColor: colors.background,
            padding: 24,
        },
        text: {
            color: colors.text,
            fontSize: 16,
        }
    });
}