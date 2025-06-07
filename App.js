import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Historia10 from './frontend/Historia10';
import MapView, { Marker } from 'react-native-maps';
import React from 'react';



export default function App() {
  return (
    <View style={styles.container}>
      <Historia10 />
      <MapView/>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



import React from 'react';
import RetryLocationScreen from './RetryLocationScreen'; 

export default function App() {
  return <RetryLocationScreen />;
}

import ListaSalas from './frontend/ListaSalas';
export default function App() {
  return <ListaSalas />;
}