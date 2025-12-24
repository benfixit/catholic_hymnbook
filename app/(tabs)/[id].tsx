import { useHymns } from '@/store/HymnProvider';
import { useTheme } from '@/store/ThemeProvider';
import { ColorsType } from '@/typings';
import Ionicons from '@react-native-vector-icons/ionicons';
import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import Markdown from "react-native-markdown-display";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HymnScreen() {
  const { selectedHymn, toggleFavorites, favorites } = useHymns();
  const { colors } = useTheme();
  const wrapper = makeStyles(colors);
  const markdown = makeMarkdownStyles(colors);

  if (!selectedHymn) {
    return;
  }

  let caption = `${selectedHymn.title.toUpperCase()}`;
  const isFavorite = favorites.includes(selectedHymn.id);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={wrapper.safeArea}>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          style={wrapper.scrollView} 
          contentInsetAdjustmentBehavior='automatic'
        >
          <View style={wrapper.view}>
            <View style={wrapper.captionView}>
              <Text style={wrapper.caption}>{caption}</Text>
            </View>
            <View  style={wrapper.meta}>
              <View  style={wrapper.tags}>
                {["Advent", "Christmas"].map((item, index) => <Text key={index} style={wrapper.tagItem}>{item}</Text>)}
              </View>
              <Pressable style={wrapper.favorite} onPress={() => toggleFavorites(selectedHymn.id)}>
                <Ionicons style={wrapper.favoriteIcon} name={isFavorite ? "heart" : "heart-outline"} size={24} />
              </Pressable>
            </View>
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
    },
    captionView: {
      marginVertical: 16
    },
    caption: {
      fontWeight: "bold",
      fontSize: 18
    },
    meta: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 16
    },
    tags: {
      display: "flex",
      flexDirection: "row",
      columnGap: 4
    },
    tagItem: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: "#dddddd",
      borderRadius: 8
    },
    favorite: {

    },
    favoriteIcon: {
      color: "red"
    }
  });
}
