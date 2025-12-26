import { Link, Stack } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { linkColor } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <>
        <Stack.Screen />
        <View style={styles.container}>
            <Text>Hymn not found</Text>
            <Link href="/" dismissTo style={styles.link}>
                <Text>
                  <Ionicons name='home' size={24} color={linkColor} />
                  Home
                </Text>
            </Link>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 16,
    paddingVertical: 16,
  },
});
