const Review = require('../models/review.model');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { rating, comment, business } = req.body;
    const review = new Review({
      rating,
      comment,
      user: req.userId,
      business,
    });
    await review.save();
    res.status(201).send({ message: 'Review created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all reviews for a business
exports.getReviewsByBusiness = async (req, res) => {
  try {
    const reviews = await Review.find({ business: req.params.businessId });
    res.status(200).send(reviews);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, comment },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).send({ message: 'Review not found' });
    }
    res.status(200).send(updatedReview);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).send({ message: 'Review not found' });
    }
    res.status(200).send({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Respond to a review (for business owners)
exports.respondToReview = async (req, res) => {
  try {
    const { ownerResponse } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { ownerResponse },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).send({ message: 'Review not found' });
    }
    res.status(200).send(updatedReview);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};