import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';

const CancelarReserva = () => {
  const [cargando, setCargando] = useState(false);
  const cancelarReserva = () => {
    setCargando(true); 
    setTimeout(() => {
      setCargando(false); 
      alert('Reserva cancelada con éxito'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Reservas</Text>
      <Button title="Cancelar Reserva" onPress={cancelarReserva} />
      {cargando && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default CancelarReserva;
