import { useHymns } from '@/store/HymnProvider';
import { useTheme } from '@/store/ThemeProvider';
import { ColorsType } from '@/typings';
import { View, StyleSheet, ScrollView } from 'react-native';
import Markdown from "react-native-markdown-display";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HymnScreen() {
  const { selectedHymn } = useHymns();
  const { colors } = useTheme();
  const wrapper = makeStyles(colors);
  const markdown = makeMarkdownStyles(colors);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={wrapper.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} style={wrapper.scrollView} contentInsetAdjustmentBehavior='automatic'>
          <View style={wrapper.view}>
            <Markdown style={markdown}>
              {selectedHymn?.content}
            </Markdown>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const makeMarkdownStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    paragraph: {
      color: colors.text,
      fontSize: 16,
      marginBottom: 12,
      marginTop: 12
    },
    ordered_list_icon: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 12,
      marginTop: 12,
    },
    ordered_list_content: {
      fontSize: 16,
      marginBottom: 12,
      marginTop: 12,
    },
    list_item: {
      color: colors.text,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    }
  });
}

const makeStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    safeArea: {
      backgroundColor: colors.background,
    },
    scrollView: {
      backgroundColor: colors.background,
      height: "100%"
    },
    view: {
      padding: 20,
      backgroundColor: colors.background,
      color: colors.text
    }
  });
}
