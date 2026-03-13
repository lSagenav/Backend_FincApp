require("dotenv").config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


// IMPORTAR RUTAS NUEVAS
const healthRoutes = require("./routes/healthRoutes");
const farmEventsRoutes = require("./routes/farmEventsRoutes");
const vaccineRoutes = require("./routes/vaccineRoutes");
const userRoutes = require("./routes/userRoutes");


// RUTAS ORIGINALES
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/animals', require('./routes/animalRoutes'));
app.use("/api/weights", require("./routes/weightRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api", require("./routes/syncRoutes"));
app.use("/api", require("./routes/reportRoutes"));

// NUEVAS RUTAS
app.use("/api/health-records", healthRoutes);
app.use("/api/farm-events", farmEventsRoutes);
app.use("/api/vaccines", vaccineRoutes);

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});