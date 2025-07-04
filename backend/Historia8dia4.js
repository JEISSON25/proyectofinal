const admin = require("firebase-admin");

async function getRoomsByCapacity(minCapacity) {
    if (!Number.isInteger(minCapacity) || minCapacity <= 0) {
        throw new Error("El parámetro capacidad minima debe ser un número positivo.");
    }

    const db = admin.firestore();
    const roomsRef = db.collection("rooms");

    // Se usara snapshot para obtener los documentos que cumplen con la condición
    const snapshot = await roomsRef.where("capacity", ">=", minCapacity).get();

    let rooms = [];
    snapshot.forEach(doc => {
        rooms.push({ id: doc.id, ...doc.data() });
    });

    return rooms;
}
