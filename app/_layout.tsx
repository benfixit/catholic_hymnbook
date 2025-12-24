import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import HymnProvider from '@/store/HymnProvider';
import ThemeProvider from '@/store/ThemeProvider';

const InitialLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <HymnProvider>
        <InitialLayout />
      </HymnProvider>
    </ThemeProvider>
  );
}