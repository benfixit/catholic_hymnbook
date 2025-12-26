import { Link } from "expo-router";
import { useMemo } from "react";
import * as Application from 'expo-application';
import { Text, StyleSheet, ScrollView, Image, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/store/ThemeProvider";
import { ColorsType } from "@/typings";
import { APP_TITLE } from "@/constants/app";
import { borderBottomColor, linkColor } from "@/constants/theme";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useHymns } from "@/store/HymnProvider";

export default function About() {
    const { colors } = useTheme();
    const { hymns } = useHymns();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const appVersion = Application.nativeApplicationVersion; 

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.view}>
                    <View style={styles.titleView}>
                        <Image
                        source={require('@/assets/images/image.png')} // Local image file
                        style={styles.image}
                        />
                        
                        {/* App Information */}
                        <Text style={styles.title}>{APP_TITLE}</Text>
                        <Text style={styles.version}>Version {appVersion}</Text>
                    </View>
                    
                    {/* About Section */}
                    <View>
                        <Text style={styles.heading}>ABOUT</Text>
                        <Text style={styles.paragraph}>
                            I give all praise and glory to God for giving me the knowldege and strength to build this project.
                        </Text>
                        <Text style={styles.paragraph}>
                            Special thanks to you for using this work to propagate God's word. God bless you.
                        </Text>
                        
                        <Text style={styles.paragraph}>
                            All the hymns on this project were gotten from the Catholic Hymn Book (Nigeria) and from <Link href={"https://hymns.mariarch.com/"} style={styles.link}>Mariarch Hymns.</Link>
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Ionicons name="timer-outline" size={24} style={styles.cardIcon} />
                        <Text style={styles.cardTitle}>Classic Roots</Text>
                        <Text style={styles.cardText}>Over {hymns.length} curated traditional hymns.</Text>
                    </View>

                    <View style={styles.quoteView}>
                        <Ionicons name="heart-outline" size={24} color={"#ffffff"} style={{ marginBottom: 16 }} />
                        <Text style={{ color: "#ffffff", marginBottom: 16 }}>"Sing and make music from your heart to the Lord."</Text>
                        <Text style={styles.copy}>© 2025 Chukwuemeka Inya</Text>
                    </View>
                </ScrollView>
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
        view: {
            padding: 20,
            backgroundColor: colors.background,
            color: colors.text
        },
        titleView: {
            display: "flex",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: borderBottomColor
        },
        image: {
            resizeMode: 'contain', 
            width: 120, 
            height: 120,
            marginBottom: 16
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 5,
            color: colors.text,
        },
        version: {
            fontSize: 16,
            color: colors.secondaryText,
            marginBottom: 20,
        },
        heading: {
            fontSize: 16,
            fontWeight: '600',
            marginTop: 20,
            marginBottom: 10,
            color: colors.text,
        },
        paragraph: {
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 16,
            color: colors.text,
        },
        card: {
            backgroundColor: colors.secondaryBackground,
            padding: 24,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#dddddd",
            marginBottom: 52
        },
        cardIcon: { 
            marginBottom: 12,
            color: colors.text
        },
        cardTitle: {
            fontSize: 16, 
            fontWeight: "bold", 
            marginBottom: 12,
            color: colors.text
        },
        cardText: { 
            color: colors.secondaryText
        },
        quoteView: {
            padding: 48,
            display: "flex",
            alignItems: "center",
            backgroundColor: colors.primaryColor,
            borderTopLeftRadius: 52,
            borderTopRightRadius: 52
        },
        copy: {
            fontSize: 14,
            color: "#ffffff",
        },
        link: {
            color: linkColor
        }
    });
}