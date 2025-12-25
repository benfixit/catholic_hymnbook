import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Example icon set
import { router } from 'expo-router';

const FloatingActionButton = () => {
  const handlePress = () => {
    router.push("/modal");
  };

  return (
    // The main container should have flex: 1 to fill the screen
    <View style={styles.mainContainer}>
      {/* ... Your main screen content goes here (e.g., ScrollView, FlatList, Text) ... */}
      
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        style={styles.floatingButton}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // Add other main screen styles here
  },
  floatingButton: {
    position: 'absolute', // Key property for floating
    width: 60,
    height: 60,
    borderRadius: 30, // Makes the button circular
    backgroundColor: '#007AFF', // Example color
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
});

export default FloatingActionButton;
