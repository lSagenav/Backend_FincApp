// const User = require('../models/userModel');

// exports.getProfile = (req, res) => {
//   User.findById(req.userId, (err, result) => {
//     if (result.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(result[0]);
//   });
// };

const User = require("../models/userModel");

exports.getProfile = async (req, res) => {

  try {

    const userId = req.user.id;

    const result = await User.findById(userId);

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(result[0]);

  } catch (error) {

    res.status(500).json({
      message: "Error getting profile",
      error: error.message
    });

  }

};

exports.getAllUsers = async (req, res) => {

  try {

    const users = await User.findAll();

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: "Error getting users",
      error: error.message
    });

  }

};