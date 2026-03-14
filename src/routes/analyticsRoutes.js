const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analyticsController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get(
  "/animals/total",
  authMiddleware,
  roleMiddleware(["admin"]),
  analyticsController.totalAnimals
);

router.get(
  "/weights/average",
  authMiddleware,
  analyticsController.averageWeight
);

router.get(
  "/health/alerts",
  authMiddleware,
  roleMiddleware(["admin"]),
  analyticsController.healthAlerts
);

module.exports = router;