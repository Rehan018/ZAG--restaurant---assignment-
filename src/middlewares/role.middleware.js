const User = require('../models/user.model');

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).send({ message: 'Requires admin role' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

const isBusinessOwner = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user && user.role === 'businessOwner') {
      next();
    } else {
      res.status(403).send({ message: 'Requires business owner role' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = { isAdmin, isBusinessOwner };