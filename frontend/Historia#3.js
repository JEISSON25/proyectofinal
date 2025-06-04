import React, { useEffect, useState } from 'react';
import { View, PermissionsAndroid, Platform, Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const MapaConUbicacion = () => {
  const [location, setLocation] = useState(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; 
  };

  const obtenerUbicacion = async () => {
    const tienePermiso = await requestLocationPermission();
    if (!tienePermiso) {
      Alert.alert('Permiso denegado', 'No se puede obtener la ubicación sin permisos');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      },
      (error) => {
        console.error(error);
        Alert.alert('Error', 'No se pudo obtener la ubicación');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    obtenerUbicacion();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          region={location}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker coordinate={location} title="Mi ubicación actual" />
        </MapView>
      )}
    </View>
  );
};

export default MapaConUbicacion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
