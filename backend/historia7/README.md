# Historia #7 - Backend: Función getAllRooms - Andrés Camilo Díaz Quintero

## Descripción
Esta historia implementa el backend para obtener la lista completa de salas "rooms" desde Firestore

## Estructura del proyecto
- `src/firebaseAdmin.js`: Configura la conexión con Firestore usando credenciales de Firebase.
- `src/controllers/roomsController.js`: Contiene la función `getAllRooms` que consulta la colección `rooms`.
- `src/routes/rooms.js`: Define la ruta `/api/rooms` que responde con la lista de salas.
- `src/app.js`: Configura y arranca el servidor Express, montando las rutas.

## Falta:
 Descargar el archivo que aún falta `serviceAccountKey.json` desde Firebase, de igual yo lo añado en la próxima clase 



