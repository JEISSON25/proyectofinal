const express = require('express');
const router = express.Router();
const { getAllRooms } = require('../controllers/roomsController');

router.get('/', async (req, res) => {
  try {
    const rooms = await getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
