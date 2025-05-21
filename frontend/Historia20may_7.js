import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const HorariosScreen = () => {
  const [cargando, setCargando] = useState(true);
  const [horarios, setHorarios] = useState([]);

 
  useEffect(() => {
    setTimeout(() => {
    
      const horariosEjemplo = [
        { id: 1, hora: "08:00 AM" },
        { id: 2, hora: "10:00 AM" },
      ];
      setHorarios(horariosEjemplo);
      setCargando(false);
    }, 2000);
  }, []);

 
  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Cargando horarios, por favor espera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Horarios Disponibles:</Text>
      {horarios.map((item) => (
        <Text key={item.id}>{item.hora}</Text>
      ))}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HorariosScreen;