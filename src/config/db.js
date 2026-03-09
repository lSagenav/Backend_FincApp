const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "qwe$123",
  database: "FincApp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 🔹 Verificar conexión al iniciar el servidor
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Database connected successfully");
    connection.release(); // liberar conexión al pool
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
  }
})();

module.exports = db;