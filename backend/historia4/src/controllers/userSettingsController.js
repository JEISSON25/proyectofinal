const db = require('../firebaseAdmin');

async function createUserSettings(userId, notificationsEnabled) {
  try {
    const ref = db.collection('userSettings').doc(userId);
    await ref.set({ userId, notificationsEnabled });
    return { success: true };
  } catch (error) {
    console.error('Error creando configuración:', error);
    throw new Error('No se pudo crear configuración');
  }
}

module.exports = { createUserSettings };
