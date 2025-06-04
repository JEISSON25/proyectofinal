const db = require('../firebaseAdmin');

async function getAllRooms() {
  try {
    const snapshot = await db.collection('rooms').get();
    const rooms = [];

    snapshot.forEach(doc => {
      rooms.push({ id: doc.id, ...doc.data() });
    });

    return rooms;
  } catch (error) {
    console.error('Error getting rooms:', error);
    throw new Error('Could not fetch rooms');
  }
}

module.exports = { getAllRooms };
