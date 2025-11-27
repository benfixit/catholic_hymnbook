//@ts-nocheck
import { useTheme } from "@/store/ThemeProvider";
import React, { useMemo, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

type Props = {
    onSearch: Function
};

const SearchBox: React.FC<Props> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { colors, theme } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const handleChange = (text: string) => {
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

const makeStyles = (colors) => StyleSheet.create({
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