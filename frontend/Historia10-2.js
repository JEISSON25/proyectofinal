//Como usuario quiero un boton "Atras" en la vista de los horarios para volver a la vista de las salas facilmente

import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

function PantallaHorarios({ route, navigation }) {
  const { idSala, nombreSala } = route.params;

  const Horarios = [
    { hora: '09:00 AM - 10:00 AM', evento: 'Reunión', asunto: 'Equipo de Gestión' },
  ];

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.encabezado}>Horarios de {nombreSala}</Text>
      <Text style={estilos.subEncabezado}>ID de la sala: {idSala}</Text>

      <ScrollView style={estilos.scrollHorarios} contentContainerStyle={estilos.contenidoScrollHorarios}>
        {Horarios.map((horario, indice) => (
          <View key={indice} style={estilos.elementoHorario}>
            <Text style={estilos.horaHorario}>{horario.hora}</Text>
            <Text style={estilos.eventoHorario}>{horario.evento}</Text>
            {horario.asunto ? (
              <Text style={estilos.asuntoHorario}>({horario.asunto})</Text>
            ) : null}
          </View>
        ))}
      </ScrollView>

      <View style={estilos.contenedorBoton}>
        <Button
          title="Volver a la Lista de Salas"
          onPress={() => navigation.goBack()}
          color="#007bff"
        />
      </View>
    </View>
  );
}

export default PantallaHorarios;