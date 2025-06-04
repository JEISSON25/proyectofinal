const express = require('express');
const app = express();
const userSettingsRoutes = require('./routes/userSettings');

app.use(express.json());
app.use('/api/userSettings', userSettingsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
