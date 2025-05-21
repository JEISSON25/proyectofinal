// backend/historia7/src/controllers/bookingsController.js
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

/**
 * Confirma una reserva y bloquea el slot correspondiente
 * @param {string} slotId - ID del slot a reservar
 * @param {string} userId - ID del usuario que hace la reserva
 */
const confirmarReserva = async (req, res) => {
  const { slotId, userId } = req.body;

  if (!slotId || !userId) {
    return res.status(400).json({ error: "slotId y userId son requeridos." });
  }

  const slotRef = db.collection("slots").doc(slotId);

  try {
    await db.runTransaction(async (transaction) => {
      const slotDoc = await transaction.get(slotRef);

      if (!slotDoc.exists) {
        throw new Error("El slot no existe.");
      }

      if (!slotDoc.data().isAvailable) {
        throw new Error("El slot ya fue reservado.");
      }

      // Marcar como no disponible
      transaction.update(slotRef, { isAvailable: false });

      // Crear reserva
      const reservaRef = db.collection("reservas").doc(`${slotId}_${userId}`);
      transaction.set(reservaRef, {
        slotId,
        userId,
        status: "confirmado",
        timestamp: new Date(),
      });
    });

    res.status(200).json({ mensaje: "Reserva confirmada y slot bloqueado." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { confirmarReserva };
