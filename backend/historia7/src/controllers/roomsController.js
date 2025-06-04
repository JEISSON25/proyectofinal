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
    console.error('Error al obtener salas:', error);
    throw new Error('No se pudo obtener la lista de salas');
}
}

module.exports = { getAllRooms };
