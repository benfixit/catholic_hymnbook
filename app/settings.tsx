import { useTheme } from '@/store/ThemeProvider';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { DARK_THEME, LIGHT_THEME, borderBottomColor } from '@/constants/theme';
import SettingsButton from '@/components/SettingsButton';
import { ColorsType } from '@/typings';

export default function SettingsScreen() {
    const { colors, theme, toggleTheme } = useTheme();
    const styles = makeStyles(colors);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.themeTitle}>Theme</Text>
            <View>
              <SettingsButton title='Dark' icon='moon' isActive={theme === DARK_THEME} onPress={() => toggleTheme(DARK_THEME)} />
              <SettingsButton title='Light' icon='sunny' isActive={theme === LIGHT_THEME} onPress={() => toggleTheme(LIGHT_THEME)} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const makeStyles = (colors: ColorsType) => StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 16,
    height: "100%"
  },
  themeTitle: {
    color: colors.text,
    fontWeight: 700
  },
  pressable: {
    borderColor: borderBottomColor,
    borderWidth: 1,
    backgroundColor: colors.background,
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
