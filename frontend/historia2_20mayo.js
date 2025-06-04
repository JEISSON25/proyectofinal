import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { DefaultTheme, NavigationContainer }  from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SalaList from "./historia1Entrega2"; // historia1Entrega2 es igual al nombre de la vista de la sala 
import salaDetails from "salaDetails"; 
import Historia2 from "./historia2";


const Stack=createNativeStackNavigator(); //creacion de la piola de navegacion

const styles ={
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors, 
        background: '#ffffff',


    },

};

export default function App(){
    return(
        <NavigationContainer theme={styles}> 
            <Stack.Navigator 
            //aplico estilos globales 
            screenOptions={{
                headerStyle: styles.header,
                headerTitleStyle: styles.headerTitle,
                contentStyle: styles.content,
            }}>
                <Stack.Screen name="Salas" component={historia1Entrega2}/>"
                <Stack.Screen name="Details" component={salaDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}   

const style=StyleSheet.create({
    header: {
        backgroundColor: "#4a90e2",//color azulito
    },
    headerTitle: {
        color: "#ffffff",
        fontWeight: 'bold',
    },
    content: {
        backgroundColor: "#f9f9f9",
    }
})      
