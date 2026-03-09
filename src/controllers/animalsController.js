const animalsModel = require("../models/animalsModel");

// GET /api/animals
const getAnimals = async (req, res) => {
  try {
    const animals = await animalsModel.getAllAnimals();
    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching animals" });
  }
};

// POST /api/animals
const createAnimal = async (req, res) => {
  try {
    const { tag_number, breed } = req.body;

    if (!tag_number || !breed) {
      return res.status(400).json({
        message: "Tag number and breed are required"
      });
    }

    const animalId = await animalsModel.createAnimal(tag_number, breed);

    res.status(201).json({
      message: "Animal created successfully",
      animalId
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating animal",
      error: error.message
    });
  }
};

// GET /api/animals/:id/history
const getAnimalHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const history = await animalsModel.getAnimalHistory(id);

    if (!history.length) {
      return res.status(404).json({
        message: "Animal not found"
      });
    }

    res.json(history);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching animal history"
    });
  }
};

module.exports = {
  getAnimals,
  createAnimal,
  getAnimalHistory
};