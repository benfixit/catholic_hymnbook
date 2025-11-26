//@ts-nocheck
import SearchBox from "@/components/Search";
import { useHymns } from "@/store/HymnProvider";
import { useTheme } from "@/store/ThemeProvider";
import { Link, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Text, View, StyleSheet, FlatList, Pressable, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const { hymns, setHymn } = useHymns();
    const { colors, theme } = useTheme();
    const [filteredHymns, setFilteredHymns] = useState(hymns);
    const styles = useMemo(() => makeStyles(colors), [colors])    

    const onSearch = (searchTerm) => {
        const newHymns = hymns.filter(hymn => {
            return hymn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hymn.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hymn.content.toLowerCase().includes(searchTerm.toLowerCase());
        });

        setFilteredHymns(newHymns);
    }

    const renderItem = (item, setHymn) => {
        const router = useRouter();

        return (
            <Pressable onPress={() => {
                setHymn(item)
                router.push({ pathname: `/hymn/${item.id}` });
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
                <SearchBox onSearch={onSearch} />
                <FlatList showsVerticalScrollIndicator={false} renderItem={({item}) => renderItem(item, setHymn)} data={filteredHymns} keyExtractor={(item) => item.slug} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const makeStyles = (colors) => {
    const styles = StyleSheet.create({
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

    return styles;
}