//Como usuario quiero un boton "Atras" en la vista de los horarios para volver a la vista de las salas facilmente

import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

function PantallaHorarios({ route, navigation }) {
  const { idSala, nombreSala } = route.params;
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const q = query(collection(db, 'timeSlots'), where('roomId', '==', idSala));
        const querySnapshot = await getDocs(q);
        const horariosData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            hora: `${data.startTime} - ${data.endTime}`,
            evento: data.evento || 'Disponible',
            asunto: data.asunto || '',
          };
        });
        setHorarios(horariosData);
      } catch (error) {
        console.error('Error al obtener horarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHorarios();
  }, [idSala]);

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.encabezado}>Horarios de {nombreSala}</Text>
      <Text style={estilos.subEncabezado}>ID de la sala: {idSala}</Text>

      <ScrollView contentContainerStyle={estilos.scrollContenido}>
        {loading ? (
          <Text>Cargando horarios...</Text>
        ) : horarios.length === 0 ? (
          <Text>No hay horarios disponibles.</Text>
        ) : (
          horarios.map(({ id, hora, evento, asunto }) => (
            <View key={id} style={estilos.item}>
              <Text style={estilos.hora}>{hora}</Text>
              <Text>{evento}</Text>
              {asunto ? <Text style={estilos.asunto}>({asunto})</Text> : null}
            </View>
          ))
        )}
      </ScrollView>

      <Button title="Volver a la Lista de Salas" onPress={() => navigation.goBack()} color="#007bff" />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, padding: 16, backgroundColor: '#fff' },
  encabezado: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  subEncabezado: { fontSize: 16, marginBottom: 12 },
  scrollContenido: { paddingBottom: 20 },
  item: { marginBottom: 12, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
  hora: { fontSize: 16, fontWeight: 'bold' },
  asunto: { fontSize: 14, fontStyle: 'italic', color: '#555' },
});

export default PantallaHorarios;
