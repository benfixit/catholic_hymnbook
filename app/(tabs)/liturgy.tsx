import { useEffect, useMemo, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useTheme } from "@/store/ThemeProvider";
import { ColorsType } from "@/typings";
import { categories, ROMCAL_CATEGORIES_BRIDGE } from "@/constants/categories";
import { useHymns } from "@/store/HymnProvider";
import { useCalendar } from "@/store/SeasonProvider";
import List from "@/components/List";
import { borderBottomColor } from "@/constants/theme";
import EmptyScreen from "@/components/Empty";

export default function LiturgyScreen() {
    const { hymns } = useHymns();
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
                {filteredHymns.length > 0 ? (
                    <List hymns={filteredHymns} />
                ): (
                <EmptyScreen>
                    <Ionicons name="reader-outline" size={48} style={styles.icon} />
                    <Text style={styles.iconText}>
                        No suggestions.
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
            fontSize: 20,
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
        suggestedView: {
            display: "flex",
            flexDirection: "row",
            marginVertical: 24,
            alignItems: "center",
            justifyContent: "center",
            columnGap: 4
        },
        suggestedTitle: {
            fontSize: 14,
            color: colors.text
        },
        hr: {
            flex: 1,
            borderBottomColor: borderBottomColor,
            borderBottomWidth: 1
        },
        icon: {
            color: colors.secondaryText,
            marginBottom: 16
        },
        iconText: {
            color: colors.secondaryText
        }
    });
}