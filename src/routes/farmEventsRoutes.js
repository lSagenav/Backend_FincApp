const express = require("express");
const router = express.Router();

const farmEventsController = require("../controllers/farmEventsController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, farmEventsController.getFarmEvents);

router.post("/", authMiddleware, farmEventsController.createFarmEvent);

module.exports = router;