import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Button, View, Text, Alert, StyleSheet } from 'react-native';

export default function LocationManager({ onLocationSuccess }) {
  const [locationDenied, setLocationDenied] = useState(false);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setLocationDenied(true);
      Alert.alert("Permiso denegado", "La app necesita acceso a tu ubicación.");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocationDenied(false);
    onLocationSuccess(location.coords);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {locationDenied && (
        <>
          <Text style={styles.text}>Ubicación denegada. Habilítala en ajustes.</Text>
          <Button title="Reintentar ubicación" onPress={getLocation} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: { marginBottom: 10, textAlign: 'center', color: '#333' }
});
