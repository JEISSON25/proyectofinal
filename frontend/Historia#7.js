import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


const coords = {
  latitude: 6.280017, 
  longitude: -75.584030, 
};

const MapaCampus = () => {
  return (
    <View style={style.contenedor}>
      <MapView
        provider={PROVIDER_GOOGLE} 
        style={style.mapa}
        initialRegion={{
          coords,
          latitudeDelta: 0.005,  
          longitudeDelta: 0.005, 
        }}
        mapType="standard" 
      >

        <Marker
          coordinate={coords}
          title="Campus"
          description="Este es el campus del TdeA"
        />
      </MapView>
    </View>
  );
};

const style = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  mapa: {
    flex: 1,
  },
});

export default MapaCampus;
