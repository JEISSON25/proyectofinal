import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const RetryLocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const getLocation = async () => {
    setStatus('Solicitando permisos...');
    setErrorMsg('');
    setLocation(null);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permiso denegado para acceder a la ubicación');
      return;
    }

    setStatus('Obteniendo ubicación...');

    try {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setStatus('Ubicación obtenida correctamente');
    } catch (error) {
      setErrorMsg('Error al obtener ubicacióno: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Reintentar ubicación" onPress={getLocation} />

      {status ? <Text style={styles.status}>{status}</Text> : null}
      {location && (
        <Text style={styles.location}>
          Latitud: {location.latitude}, Longitud: {location.longitude}
        </Text>
      )}
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  status: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
  },
  location: {
    marginTop: 10,
    fontSize: 16,
    color: 'green',
  },
  error: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
  },
});

export default RetryLocationScreen;
