const express = require("express");
const router = express.Router();

const animalsController = require("../controllers/animalsController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/",authMiddleware,animalsController.getAnimals);

router.get("/:id",authMiddleware,animalsController.getAnimalById);

router.post("/",authMiddleware,animalsController.createAnimal);

router.put("/:id",authMiddleware,animalsController.updateAnimal);

router.delete("/:id",authMiddleware,animalsController.deleteAnimal);

router.get("/:id/history",authMiddleware,animalsController.getAnimalHistory);

module.exports = router;