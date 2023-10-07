
import React from 'react';
import { View, Text } from 'react-native';

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Customize your loading screen here */}
      <Text>Loading...</Text>
    </View>
  );
}

export default LoadingScreen; // Export the component