const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");


router.get('/profile', authMiddleware, userController.getProfile);
router.get("/", authMiddleware, userController.getAllUsers);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.put('/:id/password', authMiddleware, userController.changePassword);

module.exports = router;
