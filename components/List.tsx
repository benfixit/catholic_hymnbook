import { useRouter } from "expo-router";
import React, { Dispatch, SetStateAction } from "react";
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import { ColorsType, HymnType, Nullable } from "@/typings";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useTheme } from "@/store/ThemeProvider";
import { useHymns } from "@/store/HymnProvider";
import { fetchHymnCategories } from "@/utils";
import { categories } from "@/constants/categories";

type Props = {
    hymns: Array<HymnType>
}

const List: React.FC<Props> = (props) => {
    const { hymns, ...rest } = props;
    const { colors } = useTheme();
    const { setHymn } = useHymns();
    const styles = makeStyles(colors);

    const renderItem = (item: HymnType, setHymn: Dispatch<SetStateAction<Nullable<HymnType>>>) => {
        const router = useRouter();
        const hymnCategories = fetchHymnCategories(categories, item).slice(0, 2);
        const lastIndex = hymnCategories.length - 1;

        return (
            <Pressable onPress={() => {
                setHymn(item)
                router.push(`/(tabs)/[${item.id}]`);
            }} style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'}, styles.pressable]}>
                <View style={styles.view}>
                    <View style={styles.hymnIdView}>
                        <Text style={styles.hymnId}>{item.id}</Text>
                    </View>
                    <View style={styles.hymnTitleView}>
                        <Text style={styles.hymnTitle}>{item.title}</Text>
                        <View style={styles.categories}>
                            <Text style={styles.hymnSubtitle}>English . </Text>
                            {hymnCategories.map((item, index) => <Text key={index} style={styles.tagItem}>{item.slug} {(index < lastIndex) && `.`} </Text>)}
                        </View>
                        
                    </View>
                    <View style={styles.hymnIconView}>
                        <Ionicons style={styles.hymnIcon} name="chevron-forward-outline" size={24} />
                    </View>
                </View>
            </Pressable>
        );
    }

    return (
        <FlatList 
            showsVerticalScrollIndicator={false} 
            renderItem={({item}) => renderItem(item, setHymn)} 
            data={hymns} 
            keyExtractor={(item) => item.slug}
            contentContainerStyle={{ rowGap: 16 }}
            keyboardDismissMode="on-drag"
            {...rest}
        />
    );
}

export default List;

const makeStyles = (colors: ColorsType) => {
    return StyleSheet.create({
        pressable: {
            backgroundColor: colors.secondaryBackground,
            borderWidth: 1,
            borderColor: "transparent",
            borderRadius: 8,
            paddingVertical: 24,
            paddingHorizontal: 12
        },
        view: {
            backgroundColor: colors.secondaryBackground,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            columnGap: 16
        },
        hymnIdView: {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "transparent",
            borderRadius: 8,
            paddingVertical: 12,
            backgroundColor: colors.secondaryColor
        },
        hymnTitleView: {
            flex: 5
        },
        hymnIconView: {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "transparent",
            borderRadius: 8,
            paddingVertical: 12
        },
        hymnId: {
            color: colors.primaryColor,
            fontWeight: "bold"
        },
        hymnTitle: {
            color: colors.text,
            fontSize: 14,
            fontWeight: "bold",
            backgroundColor: colors.secondaryBackground,
            marginBottom: 8
        },
        hymnSubtitle: {
            color: colors.secondaryText,
            fontSize: 12,
            backgroundColor: colors.secondaryBackground
        },
        hymnIcon: {
            color: colors.secondaryText,
        },
        categories: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        },
        tagItem: {
            color: colors.secondaryText,
            textTransform: "capitalize",
            fontSize: 12,
        }
    })
}