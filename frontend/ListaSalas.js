import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';


const mockSalas = [
  { id: '1', name: 'Sala a', capacity: 2 },
  { id: '2', name: 'Sala b', capacity: 4 },
  { id: '3', name: 'Sala c', capacity: 6 },
  { id: '4', name: 'Sala d', capacity: 8 },
];

const ListaSalas = () => {
  const [capacidadMinima, setCapacidadMinima] = useState('');
  const [salasFiltradas, setSalasFiltradas] = useState(mockSalas);

  useEffect(() => {
    if (capacidadMinima === '') {
      setSalasFiltradas(mockSalas);
    } else {
      const capacidad = parseInt(capacidadMinima);
      if (!isNaN(capacidad)) {
        const filtradas = mockSalas.filter(sala => sala.capacity >= capacidad);
        setSalasFiltradas(filtradas);
      }
    }
  }, [capacidadMinima]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Salas </Text>
      <TextInput
        style={styles.input}
        placeholder="Capacidad minima"
        keyboardType="numerico"
        value={capacidadMinima}
        onChangeText={setCapacidadMinima}
      />
      <FlatList
        data={salasFiltradas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.capacity}>Capacidad: {item.capacity}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 21,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderRadius: 6,
  },
  item: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  capacity: {
    fontSize: 16,
    color: '#555',
  },
});

export default ListaSalas;
