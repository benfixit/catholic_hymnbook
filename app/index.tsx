//@ts-nocheck
import { useHymns } from "@/store/HymnProvider";
import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet, FlatList, Pressable, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


const renderItem = (item, setHymn) => {
    const router = useRouter();

    return (
        <Pressable onPress={() => {
            setHymn(item)
            router.push({ pathname: `/hymns/${item.id}` });
        }} style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'}, styles.pressable]}>
            <View style={styles.view}>
                <Text style={styles.text}>{item.title}</Text>
            </View>
        </Pressable>
    );
}

export default function Index() {
    const { hymns, setHymn } = useHymns();
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList renderItem={({item}) => renderItem(item, setHymn)} data={hymns} keyExtractor={(item) => item.id} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    item: {
        padding: 24
    },
    pressable: {},
    view: {
        borderBottomWidth: 1,
        borderBottomColor: "#cdcdcd",
        padding: 20,
    },
    text: {
        fontSize: 16,
        color: "#000000"
    }
});