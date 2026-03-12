const db = require("../config/db");

exports.totalAnimals = async (req, res) => {

  const [rows] = await db.query(`
    SELECT COUNT(*) AS total_animals
    FROM animals
  `);

  res.json(rows[0]);

};

exports.averageWeight = async (req, res) => {

  const [rows] = await db.query(`
    SELECT AVG(current_weight) AS average_weight
    FROM weight_logs
  `);

  res.json(rows[0]);

};

exports.healthAlerts = async (req, res) => {

  const [rows] = await db.query(`
    SELECT alert_level, COUNT(*) AS total
    FROM health_records
    GROUP BY alert_level
  `);

  res.json(rows);

};