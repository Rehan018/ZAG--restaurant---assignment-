const express = require('express');
const reviewController = require('../controllers/review.controller');
const authenticateToken=require('../middlewares/auth.middleware');
const { isBusinessOwner, isAdmin } = require('../middlewares/role.middleware');

const router = express.Router();

// Create a new review (requires authenticated user)
router.post('/', authenticateToken, reviewController.createReview);

// Get all reviews for a business
router.get('/business/:businessId', reviewController.getReviewsByBusiness);

// Update a review (requires authenticated user or admin role)
router.put('/:id', authenticateToken, (req, res, next) => {
  if (req.userId === req.body.user || req.role === 'admin') {
    next();
  } else {
    res.status(403).send({ message: 'Unauthorized' });
  }
}, reviewController.updateReview);

// Delete a review (requires authenticated user or admin role)
router.delete('/:id', authenticateToken, (req, res, next) => {
  if (req.userId === req.body.user || req.role === 'admin') {
    next();
  } else {
    res.status(403).send({ message: 'Unauthorized' });
  }
}, reviewController.deleteReview);

// Respond to a review (requires business owner role)
router.put('/:id/respond', authenticateToken, isBusinessOwner, reviewController.respondToReview);

module.exports = router;