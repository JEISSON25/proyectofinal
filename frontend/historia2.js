import React from 'react';
import { View, Button, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore'; 
import { db } from '../backend/Historia1backed'; 

const ConfirmacionCancelacion = ({ reservationId }) => { 
  const CancelarReserva = async () => { 
    Alert.alert(
      'Confirmación',
      '¿Seguro que deseas cancelar?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancelación exitosa'),
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: async () => { 
            try {
     
              const reservationRef = doc(db, 'reservations', reservationId);

              await updateDoc(reservationRef, {
                status: 'cancelled', 
                
              });

              console.log('Reserva cancelada exitosamente');
              Alert.alert('Éxito', 'La reserva ha sido cancelada.');
            } catch (error) {
              console.error('Error al cancelar la reserva:', error);
              Alert.alert('Error', 'No se pudo cancelar la reserva. Intenta de nuevo.');
            }
          },
        },
      ],
      { cancelable: false } // Profesor, la función cancelable se usa para que cuando el usuario le de 
      //fuera del ventana emergente esta se cierre. Al usar el false está exigiendole 
     //al usuario que seleccione sí o no. 
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Cancelar Reserva"
        onPress={CancelarReserva}
        color="#FF0000"
      />
    </View>
  );
};

export default ConfirmacionCancelacion;