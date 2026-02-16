const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = 'secret_key_fincapp';

exports.register = (req, res) => {
  const { full_name, email, password, phone, farm_name } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  User.findByEmail(email, (err, result) => {
    if (result.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = [
      full_name,
      email,
      hashedPassword,
      phone,
      farm_name
    ];

    User.create(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, result) => {
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];
    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  });
};
