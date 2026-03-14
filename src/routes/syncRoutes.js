const express = require("express");
const router = express.Router();

const syncController = require("../controllers/syncController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/sync", authMiddleware, syncController.syncData);

module.exports = router;