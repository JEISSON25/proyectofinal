const express = require('express');
const router = express.Router();
const { createUserSettings } = require('../controllers/userSettingsController');

router.post('/', async (req, res) => {
  const { userId, notificationsEnabled } = req.body;

  if (typeof userId !== 'string' || typeof notificationsEnabled !== 'boolean') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const result = await createUserSettings(userId, notificationsEnabled);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
