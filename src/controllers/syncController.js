const db = require("../config/db");

exports.syncData = async (req, res) => {

  try {

    const userId = req.user.id;

    const [animals] = await db.query(`
      SELECT * FROM animals
      WHERE user_id = ?
    `,[userId]);

    const [weights] = await db.query(`
      SELECT * FROM weight_logs
      WHERE user_id = ?
    `,[userId]);

    const [health] = await db.query(`
      SELECT * FROM health_records
      WHERE user_id = ?
    `,[userId]);

    const [events] = await db.query(`
      SELECT * FROM farm_events
      WHERE user_id = ?
    `,[userId]);

    res.json({
      animals,
      weights,
      health_records: health,
      farm_events: events
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error syncing data"
    });

  }

};