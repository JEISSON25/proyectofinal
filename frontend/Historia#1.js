import * as Location from 'expo-location';
// UserLocationMap.js
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function UserLocationMap() {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
     
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'La app requiere acceso a tu ubicación para mostrarla en el mapa.'
        );
        setLoading(false);
        return;
      }
      
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest
      });
      setCoords(coords);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!coords) {
    return null; 
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
      showsUserLocation
    >
      <Marker
        coordinate={{
          latitude: coords.latitude,
          longitude: coords.longitude
        }}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    flex: 1
  }
});
