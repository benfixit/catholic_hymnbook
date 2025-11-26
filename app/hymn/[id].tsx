//@ts-nocheck
import { useHymns } from '@/store/HymnProvider';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Markdown from "react-native-markdown-display";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HymnScreen() {
  const [content, setContent] = useState();
  const { id } = useLocalSearchParams();
  const { selectedHymn } = useHymns();

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} style={{ height: "100%" }} contentInsetAdjustmentBehavior='automatic'>
          <View style={wrapper.view}>
            <Markdown style={styles}>
              {selectedHymn.content}
            </Markdown>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: 8
  },
  ordered_list_icon: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 8,
  },
  ordered_list_content: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: 8,
  },
  list_item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
});

const wrapper = StyleSheet.create({
  view: {
    padding: 24
  }
});
