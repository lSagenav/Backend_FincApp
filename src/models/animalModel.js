const db = require("../config/db");

const Animal = {

  findAll: async () => {

    const [rows] = await db.query(`
      SELECT * FROM animals
    `);

    return rows;
  },

  findById: async (id) => {

    const [rows] = await db.query(`
      SELECT * FROM animals
      WHERE id = ?
    `,[id]);

    return rows;
  },

  create: async (data) => {

    const [result] = await db.query(`
      INSERT INTO animals (tag_number, breed, status, user_id)
      VALUES (?, ?, ?, ?)
    `,[
      data.tag_number,
      data.breed,
      data.status,
      data.user_id
    ]);

    return result;
  },

update: async (id, data) => {

  const fields = [];
  const values = [];

  if (data.tag_number) {
    fields.push("tag_number = ?");
    values.push(data.tag_number);
  }

  if (data.breed) {
    fields.push("breed = ?");
    values.push(data.breed);
  }

  if (data.birth_date) {
    fields.push("birth_date = ?");
    values.push(data.birth_date);
  }

  if (data.status) {
    fields.push("status = ?");
    values.push(data.status);
  }

  values.push(id);

  const sql = `UPDATE animals SET ${fields.join(", ")} WHERE id = ?`;

  const [result] = await db.query(sql, values);

  return result;
},

  delete: async (id) => {

    const [result] = await db.query(`
      DELETE FROM animals
      WHERE id=?
    `,[id]);

    return result;
  },

  getHistory: async (id) => {

    const [rows] = await db.query(`
      SELECT 
      a.tag_number,
      w.current_weight,
      w.weighing_date,
      h.medication_name,
      h.ai_diagnosis,
      h.alert_level,
      h.event_date
      FROM animals a
      LEFT JOIN weight_logs w ON a.id = w.animal_id
      LEFT JOIN health_records h ON a.id = h.animal_id
      WHERE a.id = ?
    `,[id]);

    return rows;
  }

};

module.exports = Animal;