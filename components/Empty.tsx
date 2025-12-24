import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

type Props = {
    children: ReactNode
}

const EmptyScreen: React.FC<Props> = ({ children }) => {
    return (
        <View style={styles.main}>
            {children}
        </View>
    );
}

export default EmptyScreen;

const styles = StyleSheet.create({
    main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
})