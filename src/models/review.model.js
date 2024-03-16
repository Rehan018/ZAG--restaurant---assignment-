const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  business: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  ownerResponse: { type: String }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;