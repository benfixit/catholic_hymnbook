import { Link } from "expo-router";
import { useMemo } from "react";
import * as Application from 'expo-application';
import { Text, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/store/ThemeProvider";
import { ColorsType } from "@/typings";
import { APP_TITLE } from "@/constants/app";
import { mainColor } from "@/constants/theme";

export default function About() {
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const appVersion = Application.nativeApplicationVersion; 

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.view}>
                    <Image
                    source={require('@/assets/images/image.png')} // Local image file
                    style={styles.image}
                    />
                    
                    {/* App Information */}
                    <Text style={styles.title}>{APP_TITLE}</Text>
                    <Text style={styles.version}>Version {appVersion}</Text>
                    
                    {/* About Section */}
                    <Text style={styles.heading}>About</Text>
                    <Text style={styles.paragraph}>
                        I give all praise and glory to God for giving me the knowldege and strength to build this project.
                    </Text>
                    <Text style={styles.paragraph}>
                        Special thanks to you for using this work to propagate God's word. God bless you.
                    </Text>
                    
                    <Text style={styles.paragraph}>
                        All the hymns on this project were gotten from the Catholic Hymn Book (Nigeria) and from <Link href={"https://hymns.mariarch.com/"} style={styles.link}>Mariarch Hymns.</Link>
                    </Text>

                    {/* Contact Information */}
                    <Text style={styles.heading}>Contact Information</Text>
                    <Text style={styles.contactItem}>Email: devemeka2@gmail.com</Text>
                    <Text style={styles.contactItem}>Website: <Link href={"https://emekainya.com/"} style={styles.link}>Visit my web profile.</Link></Text>
                    <Text style={styles.contactItem}>© 2025 Chukwuemeka Inya</Text>
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
        image: {
            marginBottom: 16,
            resizeMode: 'contain', 
            width: 120, 
            height: 120,
            marginLeft: -20
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 5,
            color: colors.text,
        },
        version: {
            fontSize: 16,
            color: colors.text,
            marginBottom: 20,
        },
        heading: {
            fontSize: 20,
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
        contactItem: {
            fontSize: 14,
            color: colors.text,
            marginTop: 5,
        },
        link: {
            color: mainColor
        }
    });
}