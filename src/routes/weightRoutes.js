const express = require("express");
const router = express.Router();

const weightController = require("../controllers/weightController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, weightController.getWeights);

router.post("/", authMiddleware, weightController.addWeight);

module.exports = router;