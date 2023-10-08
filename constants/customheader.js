import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      {/* Set the status bar background color to match your app's background */}
      <StatusBar backgroundColor="rgb(16,196,40)" barStyle="default" />
      
      {/* Rest of your custom header */}
      <View style={styles.headerContent}>
        <Text style={styles.headerText}>Custom Header</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white', // Set the background color to match your app's background
    height: 60, // Adjust the height as needed
    marginTop:-100
  },
  headerContent: {
    height: 60, // Keep the same height as the header
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'black', // Set the text color to match your app's text color
    fontSize: 18,
  },
});

export default CustomHeader;
