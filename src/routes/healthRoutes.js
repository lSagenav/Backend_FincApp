const express = require("express");
const router = express.Router();

const healthController = require("../controllers/healthController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, healthController.getHealthRecords);

router.post("/", authMiddleware, healthController.createHealthRecord);

module.exports = router;