const express = require('express');
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use("/api/animals", require("./routes/animalsRoutes"));



app.listen(3000, () => {
  console.log('Server running on port 3000');
});
