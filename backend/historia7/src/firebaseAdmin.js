const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;

/*Profe no sé quién se encargó de la BD de firebase entonces de momento no está conectado como tal con firebase,
en la próxima clase hago la conexión.*/