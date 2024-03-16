const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET="your_secret_key_here";
// Generate a JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1d',
  });
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  };

module.exports = { generateToken,verifyToken};