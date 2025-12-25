import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useTheme } from "@/store/ThemeProvider";
import { ColorsType, HymnType, Nullable } from "@/typings";
import Ionicons from "@react-native-vector-icons/ionicons";
import { categories, ROMCAL_CATEGORIES_BRIDGE } from "@/constants/categories";
import { useHymns } from "@/store/HymnProvider";
import { useCalendar } from "@/store/SeasonProvider";

export default function LiturgyScreen() {
    const { hymns, setHymn } = useHymns();
    const { colors } = useTheme();
    const { calendar } = useCalendar();
    
    const [filteredHymns, setFilteredHymns] = useState(hymns);
    const styles = useMemo(() => makeStyles(colors), [colors]);

    useEffect(() => {
            // filter by category
            const category = categories.find(category => category.slug === ROMCAL_CATEGORIES_BRIDGE[calendar.season]);
            const idsSet = new Set(category?.hymns);

            const data = hymns.filter((hymn) => idsSet.has(hymn.id));

            setFilteredHymns(data)
    }, []);

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
                <View style={styles.banner}>
                    <Text style={styles.title}>{calendar.title}</Text>
                    <View>
                        <Text style={styles.season}>Season: {ROMCAL_CATEGORIES_BRIDGE[calendar.season]}</Text>
                    </View>
                    <Text style={styles.rank}>Rank: {calendar.rank}</Text>
                    <View style={styles.dateView}>
                        <Ionicons name="calendar" size={24} color={"#ffffff"} style={styles.calendar} />
                        <Text style={styles.date}>{calendar.date}</Text>
                    </View>
                </View>
                <View style={styles.suggestedView}>
                    <Text style={styles.suggestedTitle}>Seasonal Suggestions</Text>
                    <View style={styles.hr} />
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
            padding: 16,
        },
        banner: {
            borderRadius: 16,
            backgroundColor: colors.primaryColor,
            padding: 16
        },
        title: {
            color: "#ffffff",
            fontSize: 16,
            marginBottom: 16,
            fontWeight: "bold"
        },
        season: {
            color: "#ffffff",
            fontSize: 16,
            marginBottom: 12,
            textTransform: "capitalize"
        },
        rank: {
            color: "#ffffff",
            fontSize: 16,
            marginBottom: 12,
            textTransform: "capitalize"
        },
        dateView: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            columnGap: 8
        },
        calendar: {
            color: "#ffffff"
        },
        date: {
            color: "#ffffff"
        },
        flatList: {
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
        },
        suggestedView: {
            display: "flex",
            flexDirection: "row",
            marginVertical: 24,
            alignItems: "center",
            justifyContent: "center",
            columnGap: 4
        },
        suggestedTitle: {
            fontSize: 14
        },
        hr: {
            flex: 1,
            borderBottomColor: "#000000",
            borderBottomWidth: 1,
            // marginTop: 16,
            // marginBottom: 16
        }
    });
}