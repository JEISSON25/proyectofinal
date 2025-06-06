import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Historia20may_9 = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.boton, disabled && styles.botonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.textoBoton}>Confirmar Reserva</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  botonDisabled: {
    backgroundColor: "gray",
  },
  textoBoton: {
    color: "white",
    fontSize: 16,
  },
});

export default Historia20may_9;
