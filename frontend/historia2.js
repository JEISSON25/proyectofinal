import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"; //ActivityIndicator es el icono de carga
import MapView from "react-native-maps"; // importacion de mapa

const Historia2 = () => {
    const [loading, setLoading] = React.useState(true); // estado de carga, y lo inicializamos en true


    return(
        <View style={styles.container}>
            {loading && (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00202e"/> // icono de carga azul
                <Text style={styles.loadingText}>Cargando Mapa...</Text>
                </View>

            )}
            <MapView
            //estilos del mapa
                style_={styles.map }
                onMapReady={() => setLoading(false)}//cuando el mapa este listo, cambia el estado de carga a false
                initialRegion={{
                    // coordenadas de colombia
                    latitude: 4.5709, 
                    longitude: -74.2973,
                    latitudeDelta: 5,
                    longitudeDelta: 5,

                }}
            />
        </View>
    );
};

const styles= StyleSheet.create({
    container:{
        flex:1,     
    },
    map:{
        flex:1,
    },
    loadingContainer:{
        position:"absolute",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: 'rgba(255,255,255,0.8)',
        zIndex:10,

    },
    loaderText:{
        marginTop:10,
        fontSize:16,
        color:"#00333",
    },

})


        
export default Historia2;
