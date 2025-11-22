//@ts-nocheck
import { useHymns } from '@/store/HymnProvider';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Markdown from "react-native-markdown-display";

export default function HymnScreen() {
  const [content, setContent] = useState();
  const { id } = useLocalSearchParams();
  const { selectedHymn } = useHymns();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>{selectedHymn.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18
  }
});
