const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

/*
REGISTER
*/
exports.register = async (req, res) => {

  try {

    const { full_name, email, password, phone, farm_name } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const existingUser = await User.findByEmail(email);

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = [
      full_name,
      email,
      hashedPassword,
      phone,
      farm_name
    ];

    await User.create(newUser);

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error registering user",
      error: error.message
    });

  }

};


/*
LOGIN
*/
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const result = await User.findByEmail(email);

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const user = result[0];

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token
    });

  } catch (error) {

    res.status(500).json({
      message: "Login error",
      error: error.message
    });

  }

};