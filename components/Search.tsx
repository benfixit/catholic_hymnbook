import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

type Props = {
    onSearch: Function
};

const SearchBox: React.FC<Props> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleChange = (text: string) => {
        console.log("Search text ::: ", text);
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

const styles = StyleSheet.create({
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
        color: "#333333"
    }
});

export default SearchBox;