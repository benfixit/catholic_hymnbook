//@ts-nocheck
import { useHymns } from '@/store/HymnProvider';
import { useTheme } from '@/store/ThemeProvider';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Pressable } from 'react-native';
import Markdown from "react-native-markdown-display";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { DARK_THEME, LIGHT_THEME, AUTO_THEME } from '@/constants/theme';
import SettingsButton from '@/components/SettingsButton';
import { ThemeType } from '@/typings';

export default function SettingsScreen() {
    const [isActive, setIsActive] = useState(false);
    const { theme, toggleTheme, setToSystemTheme } = useTheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.themeTitle}>Theme</Text>
            <View style={styles.themeGroup}>
              <SettingsButton title='Dark' icon='moon' isActive={theme === DARK_THEME} onPress={() => toggleTheme(DARK_THEME)} />
              <SettingsButton title='Light' icon='sunny' isActive={theme === LIGHT_THEME} onPress={() => toggleTheme(LIGHT_THEME)} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  themeTitle: {
    fontWeight: 700
  },
  pressable: {
    borderColor: "#cdcdcd",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8
  },
  pressableView: {
    display: "flex",
    flexDirection: "row"
  },
});
