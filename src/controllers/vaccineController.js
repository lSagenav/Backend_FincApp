const db = require("../config/db");

/*
GET /api/vaccines
*/
exports.getVaccines = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT *
      FROM vaccines
      ORDER BY created_at DESC
    `);

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching vaccines"
    });

  }

};


/*
POST /api/vaccines
*/
exports.createVaccine = async (req, res) => {

  try {

    const {
      animal_id,
      user_id,
      vaccine_name,
      application_date,
      next_date,
      notes,
      status
    } = req.body;

    await db.query(
      `INSERT INTO vaccines
      (animal_id, user_id, vaccine_name, application_date, next_date, notes, status)
      VALUES (?,?,?,?,?,?,?)`,
      [
        animal_id,
        user_id,
        vaccine_name,
        application_date,
        next_date,
        notes,
        status
      ]
    );

    res.status(201).json({
      message: "Vaccine registered"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error registering vaccine"
    });

  }

};


/*
PUT /api/vaccines/:id
*/
exports.updateVaccine = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      vaccine_name,
      application_date,
      next_date,
      notes,
      status
    } = req.body;

    await db.query(
      `UPDATE vaccines
      SET vaccine_name=?, application_date=?, next_date=?, notes=?, status=?
      WHERE id=?`,
      [
        vaccine_name,
        application_date,
        next_date,
        notes,
        status,
        id
      ]
    );

    res.json({
      message: "Vaccine updated"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error updating vaccine"
    });

  }

};