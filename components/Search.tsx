import React, { useMemo, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useTheme } from "@/store/ThemeProvider";
import { ColorsType } from "@/typings";

type Props = {
    onSearch: Function
};

const SearchBox: React.FC<Props> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const handleChange = (text: string) => {
        console.log("term ::: ", text);
        setSearchTerm(text);

        //@todo debounce this

        onSearch(text)
    }

    return (
        <View style={styles.view}>
            <TextInput 
                style={styles.input} 
                onChangeText={handleChange} 
                placeholder="Search by title or keyword"
                placeholderTextColor={"#888888"}
                value={searchTerm} 
            />
        </View>
    );
}

const makeStyles = (colors: ColorsType) => StyleSheet.create({
    view: {
        paddingHorizontal: 16
    },
    input: {
        height: 50,
        borderColor: "#cdcdcd",
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: colors.text
    }
});

export default SearchBox;