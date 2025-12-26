import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Example icon set
import { ColorsType } from '@/typings';
import { useTheme } from '@/store/ThemeProvider';

const FloatingActionButton = () => {
  const { colors } = useTheme();
  const wrapper = makeStyles(colors);
  const handlePress = () => {
    router.push("/modal");
  };

  return (
    <View style={wrapper.mainContainer}>      
      <Pressable
        onPress={handlePress}
        style={wrapper.floatingButton}
      >
        <Ionicons name="text-outline" size={30} color="#fff" />
      </Pressable>
    </View>
  );
};

const makeStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      // Add other main screen styles here
    },
    floatingButton: {
      position: 'absolute', // Key property for floating
      width: 60,
      height: 60,
      borderRadius: 30, // Makes the button circular
      backgroundColor: colors.primaryColor, // Example color
      justifyContent: 'center',
      alignItems: 'center',
      right: 30, // Position from the right edge
      bottom: 30, // Position from the bottom edge
      // Add shadows for better UI presentation (Android elevation and iOS shadow props)
      elevation: 4, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
  })
}

export default FloatingActionButton;
