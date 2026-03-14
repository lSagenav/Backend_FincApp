const db = require("../config/db");

/*
POST /api/weights
Registrar peso
*/
exports.addWeight = async (req, res) => {
  try {
    const { animal_id, current_weight, user_id } = req.body;

    // Si animal_id no es número, buscar por tag_number
    let realAnimalId = animal_id;
    if (isNaN(animal_id)) {
      const [animals] = await db.query(
        'SELECT id FROM animals WHERE tag_number = ?', [animal_id]
      );
      if (animals.length === 0) {
        return res.status(404).json({ message: 'Animal not found' });
      }
      realAnimalId = animals[0].id;
    }

    await db.query(
      `INSERT INTO weight_logs (animal_id, user_id, current_weight)
       VALUES (?, ?, ?)`,
      [realAnimalId, user_id, current_weight]
    );

    res.status(201).json({ message: 'Weight recorded successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error recording weight', error: error.message });
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