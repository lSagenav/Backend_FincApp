const express = require("express");
const router = express.Router();

const vaccineController = require("../controllers/vaccineController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, vaccineController.getVaccines);

router.post("/", authMiddleware, vaccineController.createVaccine);

router.put("/:id", authMiddleware, vaccineController.updateVaccine);

module.exports = router;