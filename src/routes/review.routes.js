const express = require('express');
const reviewController = require('../controllers/review.controller');
const authenticateToken=require('../middlewares/auth.middleware');
const { isBusinessOwner, isAdmin } = require('../middlewares/role.middleware');

const router = express.Router();

router.post('/', authenticateToken, reviewController.createReview);

router.get('/business/:businessId', reviewController.getReviewsByBusiness);


router.put('/:id', authenticateToken, (req, res, next) => {
  if (req.userId === req.body.user || req.role === 'admin') {
    next();
  } else {
    res.status(403).send({ message: 'Unauthorized' });
  }
}, reviewController.updateReview);


router.delete('/:id', authenticateToken, (req, res, next) => {
  if (req.userId === req.body.user || req.role === 'admin') {
    next();
  } else {
    res.status(403).send({ message: 'Unauthorized' });
  }
}, reviewController.deleteReview);

router.put('/:id/respond', authenticateToken, isBusinessOwner, reviewController.respondToReview);

module.exports = router;