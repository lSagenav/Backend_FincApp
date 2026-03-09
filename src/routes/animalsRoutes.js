const express = require("express");
const router = express.Router();
const animalsController = require("../controllers/animalsController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protected routes
router.get("/", authMiddleware, animalsController.getAnimals);
router.post("/", authMiddleware, animalsController.createAnimal);
router.get("/:id/history", authMiddleware, animalsController.getAnimalHistory);

module.exports = router;