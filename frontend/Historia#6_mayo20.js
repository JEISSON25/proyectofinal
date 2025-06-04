import React, { useEffect, useState } from 'react';

import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from './firebaseConfig'; 

const horariosBase = [
  { id: 1, hora: '09:00 AM' },
  { id: 2, hora: '10:00 AM' },
  { id: 3, hora: '11:00 AM' },
  { id: 4, hora: '12:00 PM' },
  { id: 5, hora: '01:00 PM' },
];

const formatearFecha = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

const SeleccionHorarioScreen = ({ route }) => {
  const { sala } = route.params;
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const fechaHoy = formatearFecha(new Date());


  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const q = query(
          collection(firestore, 'reservas'),
          where('sala', '==', sala),
          where('fecha', '==', fechaHoy)
        );
        const querySnapshot = await getDocs(q);
        const reservasFirestore = [];
        querySnapshot.forEach((doc) => {
          reservasFirestore.push(doc.data());
        });

        setReservas(reservasFirestore);
      } catch (error) {
        console.error('Error cargando reservas:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, [sala, fechaHoy]);

  const seleccionarHorario = (hora) => {
    const yaReservado = reservas.some((r) => r.hora === hora.hora);
    if (yaReservado) {
      Alert.alert('Este horario ya está reservado');
    } else {
      Alert.alert(`Horario seleccionado: ${hora.hora}`);
    }
  };

  if (cargando) {
    return (
      <View>
        <Text>Cargando horarios</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>selecinado {sala}</Text>
      <Text>Selecciona un horario:</Text>

      {horariosBase.map((hora) => {
        const reservado = reservas.some((r) => r.hora === hora.hora);
        
        return (
          <TouchableOpacity
            key={hora.id}
            onPress={() => seleccionarHorario(hora)}
            disabled={reservado}
            style={{ backgroundColor: reservado ? '#ccc' : '#4CAF50', marginVertical: 6, padding: 12 }}
          >
            <Text style={{ color: reservado ? '#666' : 'white', textAlign: 'center' }}>
              {hora.hora}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SeleccionHorarioScreen;
