const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Sign up a new user
router.post('/signup', authController.signup);

// Sign in a user
router.post('/signin', authController.signin);

module.exports = router;