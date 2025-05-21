import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const horarios = [
    { hora: "09:00 - 10:00", ocupado: false },
    { hora: "10:00 - 11:00", ocupado: true },
    { hora: "11:00 - 12:00", ocupado: false },
    { hora: "12:00 - 13:00", ocupado: true },
];


const Historia6 = (navegation) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Selecciona un horario disponible:</Text>
            {horarios.map((h, idx) => (
                <View key={idx} style={styles.item}>
                    <Button
                        title={h.hora + (h.ocupado ? " (Ocupado)" : "")}
                        disabled={h.ocupado}
                        onPress={() => {/*aqui envia a la logica */}}
                        color={h.ocupado ? "#aaa" : "#007bff"}
                    />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    titulo: {
        fontSize: 18,
        marginBottom: 16,
        fontWeight: "bold",
    },
    item: {
        marginBottom: 10,
    },
});

export default Historia6;