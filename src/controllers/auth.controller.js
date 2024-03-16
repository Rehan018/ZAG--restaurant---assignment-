const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwt.utils');
const User = require('../models/user.model');
const JWT_SECRET="your_secret_key_here";
// Sign up a new user
exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    const token=generateToken({id:newUser._id,role:newUser.role});
    res.status(201).send({ message: 'User registered successfully' ,token});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Sign in a user
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }
    const token=generateToken({id:user._id,role:user.role});
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};