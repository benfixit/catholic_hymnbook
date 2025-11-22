import { Link, Stack } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
        <Stack.Screen options={{ title: "Oops! Not Found"}} />
        <View style={styles.container}>
            <Text>Not Found Page</Text>
            <Link href="/" dismissTo style={styles.link}>
                <Text>Go to home screen</Text>
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
    marginTop: 15,
    paddingVertical: 15,
  },
});
