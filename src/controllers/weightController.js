const db = require("../config/db");

/*
POST /api/weights
Registrar peso
*/
exports.addWeight = async (req, res) => {

  try {

    const { animal_id, current_weight, user_id } = req.body;

    await db.query(
      `INSERT INTO weight_logs (animal_id, user_id, current_weight)
       VALUES (?, ?, ?)`,
      [animal_id, user_id, current_weight]
    );

    res.status(201).json({
      message: "Weight recorded successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error recording weight",
      error: error.message
    });

  }

};


/*
GET /api/weights
Listar historial de pesos
*/
exports.getWeights = async (req, res) => {

  try {

    const [rows] = await db.query(
      "SELECT * FROM weight_logs ORDER BY weighing_date DESC"
    );

    res.json(rows);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching weights"
    });

  }

};