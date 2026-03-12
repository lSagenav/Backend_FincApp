require("dotenv").config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


// RUTAS ORIGINALES (las que sí funcionaban)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes')); // 👈 dejar singular
app.use('/api/animals', require('./routes/animalRoutes')); // nueva ruta
app.use("/api/weights",require("./routes/weightRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api", require("./routes/syncRoutes"));
app.use("/api", require("./routes/reportRoutes"));


app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});