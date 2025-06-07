import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { collection, onSnapshot, query, where, doc, deleteDoc } from 'firebase/firestore';

const MisReservasScreen = ({ userId }) => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'reservas'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaReservas = [];
      querySnapshot.forEach((doc) => {
        listaReservas.push({ id: doc.id, ...doc.data() });
      });
      setReservas(listaReservas);
    });

    return () => unsubscribe();
  }, [userId]);


  const cancelarReserva = (id) => {
    Alert.alert(
      'Cancelar Reserva',
      'quiere cancelar la reserva?',

      [
        { text: 'No'},

        {
          text: 'Sí',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'reservas', id));
              Alert.alert('Reserva cancelada');
            } catch {
              Alert.alert('Error', 'no se puede cancelar');
            }
          },
        },
      ]
    );
  };


  const renderItem = ({ item }) => (
    <View>
      <Text>{`${item.sala} - ${item.hora}`}</Text>
      <TouchableOpacity onPress={() => cancelarReserva(item.id)}>
        <Text>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View>
      <Text>Mis Reservas</Text>
      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No tienes reservas</Text>}
      />
    </View>
  );
};


export default MisReservasScreen;
