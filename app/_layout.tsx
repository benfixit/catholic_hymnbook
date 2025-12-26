import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HymnProvider from '@/store/HymnProvider';
import ThemeProvider from '@/store/ThemeProvider';
import TypeFaceProvider from '@/store/TypeFaceProvider';
import SeasonProvider from '@/store/SeasonProvider';

const InitialLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen 
          name='(tabs)' 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name='modal' 
          options={{ 
            headerShown: false, 
            presentation: "containedTransparentModal" 
          }} 
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <TypeFaceProvider>
      <SeasonProvider>
        <ThemeProvider>
          <HymnProvider>
            <InitialLayout />
          </HymnProvider>
        </ThemeProvider>
      </SeasonProvider>
    </TypeFaceProvider>
  );
}