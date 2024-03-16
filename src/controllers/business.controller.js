const Business = require('../models/business.model');

// Create a new business listing
exports.createBusiness = async (req, res) => {
  try {
    const { name, phone, address, images } = req.body;
    const business = new Business({
      name,
      phone,
      address,
      images,
      owner: req.userId,
    });
    await business.save();
    res.status(201).send({ message: 'Business listing created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all business listings
exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).send(businesses);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get a specific business listing
exports.getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).send({ message: 'Business not found' });
    }
    res.status(200).send(business);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update a business listing
exports.updateBusiness = async (req, res) => {
  try {
    const { name, phone, address, images } = req.body;
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      { name, phone, address, images },
      { new: true }
    );
    if (!updatedBusiness) {
      return res.status(404).send({ message: 'Business not found' });
    }
    res.status(200).send(updatedBusiness);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a business listing
exports.deleteBusiness = async (req, res) => {
  try {
    const deletedBusiness = await Business.findByIdAndDelete(req.params.id);
    if (!deletedBusiness) {
      return res.status(404).send({ message: 'Business not found' });
    }
    res.status(200).send({ message: 'Business listing deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};