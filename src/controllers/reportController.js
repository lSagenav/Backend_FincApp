const db = require("../config/db");

exports.animalsByBreed = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT breed, COUNT(*) AS total
      FROM animals
      GROUP BY breed
    `);

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error generating report"
    });

  }

};


exports.averageWeight = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT animal_id, AVG(current_weight) AS average_weight
      FROM weight_logs
      GROUP BY animal_id
    `);

    res.json(rows);

  } catch (error) {

    res.status(500).json({
      message: "Error generating weight report"
    });

  }

};