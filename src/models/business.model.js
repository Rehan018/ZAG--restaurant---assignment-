const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true }
  },
  images: [{ type: String }],
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;