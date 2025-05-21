import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

const SeleccionHorarioScreen = ({ route, navigation }) => {
  const { sala } = route.params;  

  const horarios = [
    { id: 1, hora: '09:00 AM', reservado: false },

    { id: 2, hora: '10:00 AM', reservado: false },

    { id: 3, hora: '11:00 AM', reservado: false },

    { id: 4, hora: '12:00 PM', reservado: false },

    { id: 5, hora: '01:00 PM', reservado: false },
  ];



    if (hora.reservado) {

      alert('Este horario ya está reservado.');
    } else {

      alert(`Horario seleccionado: ${hora.hora}`);


    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionaste: {sala}</Text>
      <Text style={styles.subtitle}>Selecciona un horario:</Text>
      {horarios.map((hora) => (
        <TouchableOpacity
          key={hora.id}
          onPress={() => seleccionarHorario(hora)}
          disabled={hora.reservado} /
          style={[styles.horarioButton, hora.reservado && styles.disabledButton]}
        >
          <Text style={styles.horarioText}>{hora.hora}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


export default SeleccionHorarioScreen;
