import { useHymns } from '@/store/HymnProvider';
import { useTheme } from '@/store/ThemeProvider';
import { ColorsType } from '@/typings';
import Ionicons from '@react-native-vector-icons/ionicons';
import { View, StyleSheet, ScrollView, Text, Pressable, Alert, Share, Platform } from 'react-native';
import Markdown from "react-native-markdown-display";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router, Stack } from "expo-router";
import { HeaderBackButton } from "@react-navigation/elements";
import FloatingActionButton from '@/components/FloatingButton';
import { useTypeFace } from '@/store/TypeFaceProvider';

export default function HymnScreen() {
  const { selectedHymn, toggleFavorites, favorites } = useHymns();
  const { colors } = useTheme();
  const { fontSize } = useTypeFace();
  const wrapper = makeStyles(colors, fontSize);
  const markdown = makeMarkdownStyles(colors, fontSize);

  if (!selectedHymn) {
    return;
  }

  let caption = `${selectedHymn.title.toUpperCase()}`;
  const isFavorite = favorites.includes(selectedHymn.id);

  const handleShare = async () => {
      try {
          const message = `
              CHB ${selectedHymn?.id} \n
              ${selectedHymn?.content}
          `;

          await Share.share({ message });

      } catch (error: any) {
          Alert.alert(error.message)
      }
  }

  const HeaderLeft = () => {
      return <HeaderBackButton
                  backImage={() => <Ionicons name="arrow-back" size={24} style={wrapper.icon} />} 
                  onPress={() => router.push("/")}
                  />
  }

  const HeaderRight = () => {
      return (
          <Pressable style={wrapper.pressable}>
              <Ionicons name="share-social" size={20} style={wrapper.icon} onPress={handleShare} />
          </Pressable>
      )
  }

  if (!selectedHymn) {
      return <Redirect href={`/+not-found`} />
  }

  let title = `Hymn ${selectedHymn.id}`.toUpperCase();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={wrapper.safeArea}>
        <Stack.Screen options={{ 
            headerLeft: () => <HeaderLeft />, 
            title,
            headerRight: () => <HeaderRight />,
            headerTitleStyle: {
                fontSize: 14
            },
        }} 
        />
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
        <FloatingActionButton />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const makeMarkdownStyles = (colors: ColorsType, fontSize: number) => {
  return StyleSheet.create({
    paragraph: {
      color: colors.text,
      fontSize,
      marginBottom: 12,
      marginTop: 12
    },
    ordered_list_icon: {
      fontSize,
      fontWeight: "bold",
      marginBottom: 12,
      marginTop: 12,
    },
    ordered_list_content: {
      fontSize,
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

const makeStyles = (colors: ColorsType, fontSize: number) => {
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
      fontSize: fontSize + 2
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
      borderRadius: 8,
      fontSize: fontSize - 4
    },
    favorite: {

    },
    favoriteIcon: {
      color: "red"
    },
    pressable: {
        marginRight: 8,
    },
    icon: {
        // color: Colors.dark.text,
        color: "#000000",
        padding: 12,
    }
  });
}
