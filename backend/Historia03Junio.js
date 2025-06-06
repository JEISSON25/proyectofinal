// routes
const express = require('express');
const router = express.Router();
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

router.delete('/reservations/:reservationId', async (req, res) => {
  const { reservationId } = req.params;

  try {
    const ref = db.collection('reservations').doc(reservationId);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    await ref.delete();
    return res.status(200).json({ message: 'Reserva eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    return res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
});

module.exports = router;

// services
export const deleteReservation = async (reservationId) => {
  try {
    const response = await fetch(`https://tu-servidor.com/api/reservations/${reservationId}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al cancelar la reserva');
    }

    return data.message;
  } catch (error) {
    console.error('Error al cancelar la reserva:', error.message);
    throw error;
  }
};

//js

import { deleteReservation } from '../services/reservationService';

const handleCancelReservation = async (id) => {
  try {
    const mensaje = await deleteReservation(id);
    alert(mensaje);
  } catch (error) {
    alert('Error: ' + error.message);
  }
};


