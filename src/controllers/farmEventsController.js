const db = require("../config/db");

/*
GET /api/farm-events
*/
exports.getFarmEvents = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT *
      FROM farm_events
      ORDER BY created_at DESC
    `);

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching farm events"
    });

  }

};


/*
POST /api/farm-events
*/
exports.createFarmEvent = async (req, res) => {

  try {

    const { user_id, animal_id, event_type, description } = req.body;

    await db.query(
      `INSERT INTO farm_events
      (user_id, animal_id, event_type, description)
      VALUES (?,?,?,?)`,
      [user_id, animal_id, event_type, description]
    );

    res.status(201).json({
      message: "Farm event created"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error creating farm event"
    });

  }

};