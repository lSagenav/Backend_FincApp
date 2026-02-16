const User = require('../models/userModel');

exports.getProfile = (req, res) => {
  User.findById(req.userId, (err, result) => {
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result[0]);
  });
};
