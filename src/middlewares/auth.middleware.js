const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here'; 

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Failed to authenticate token' });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      
      req.userId = decoded.id;
      req.userRole = user.role;
      next();
    } catch (error) {
      console.error('Internal server error:', error.message);
      return res.status(500).send({ message: 'Internal server error' });
    }
  });
};

module.exports = authenticateToken;
