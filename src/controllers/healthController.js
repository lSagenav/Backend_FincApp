const db = require("../config/db");

/*
GET /api/health-records
*/
exports.getHealthRecords = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT *
      FROM health_records
      ORDER BY event_date DESC
    `);

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching health records"
    });

  }

};


/*
POST /api/health-records
*/
exports.createHealthRecord = async (req, res) => {

  try {

    const {
      animal_id,
      user_id,
      medication_name,
      ai_diagnosis,
      alert_level
    } = req.body;

    await db.query(
      `INSERT INTO health_records
      (animal_id, user_id, medication_name, ai_diagnosis, alert_level)
      VALUES (?,?,?,?,?)`,
      [
        animal_id,
        user_id,
        medication_name,
        ai_diagnosis,
        alert_level
      ]
    );

    res.status(201).json({
      message: "Health record created successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error creating health record"
    });

  }

};