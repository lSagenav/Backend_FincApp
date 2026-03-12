const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/reports/animals-by-breed",
  authMiddleware,
  reportController.animalsByBreed
);

router.get(
  "/reports/average-weight",
  authMiddleware,
  reportController.averageWeight
);


module.exports = router;