const express = require('express');
const router = express.Router();
const { getAllRooms } = require('../controllers/roomsController');
const { confirmarReserva } = require('../controllers/bookingsController'); // <--- NUEVO

// Ruta para obtener todas las salas
router.get('/', async (req, res) => {
  try {
    const rooms = await getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para confirmar una reserva
router.post('/confirmar-reserva', confirmarReserva); // <--- NUEVO

module.exports = router;
