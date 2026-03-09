const db = require("../config/db");

// Get all animals
const getAllAnimals = async () => {
  const [rows] = await db.query(`
    SELECT id, tag_number, breed, status
    FROM animals
  `);
  return rows;
};

// Create new animal
const createAnimal = async (tag_number, breed, status = "healthy") => {
  const [result] = await db.query(`
    INSERT INTO animals (tag_number, breed, status)
    VALUES (?, ?, ?)
  `, [tag_number, breed, status]);

  return result.insertId;
};

// Get animal full history
const getAnimalHistory = async (animalId) => {
  const [rows] = await db.query(`
    SELECT 
      a.id,
      a.tag_number,
      a.breed,
      w.current_weight,
      w.weighing_date,
      h.medication_name,
      h.ai_diagnosis,
      h.alert_level,
      h.event_date
    FROM animals a
    LEFT JOIN weight_logs w ON w.animal_id = a.id
    LEFT JOIN health_records h ON h.animal_id = a.id
    WHERE a.id = ?
  `, [animalId]);

  return rows;
};

module.exports = {
  getAllAnimals,
  createAnimal,
  getAnimalHistory
};