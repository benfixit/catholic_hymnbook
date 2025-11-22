import HymnProvider from '@/store/HymnProvider';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {

  return (
    <ThemeProvider value={DefaultTheme}>
      <HymnProvider>
        <Stack screenOptions={{ headerTitle: "Catholic Hymbook" }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="hymns" />
        </Stack>
        <StatusBar style="auto" />
      </HymnProvider>
    </ThemeProvider>
  );
}
