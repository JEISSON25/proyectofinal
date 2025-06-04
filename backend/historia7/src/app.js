const express = require('express');
const app = express();
const roomsRoutes = require('./routes/rooms');

app.use(express.json());
app.use('/api/rooms', roomsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
