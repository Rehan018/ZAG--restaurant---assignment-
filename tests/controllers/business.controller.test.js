// test/controllers/business.controller.test.js

const request = require('supertest');
const app = require('../../src/app'); // Assuming your app is exported from app.js
const mongoose = require('mongoose');
const Business = require('../../src/models/business.model');

// Mock business data for testing
const businessData = {
  name: 'Test Business',
  phone: '1234567890',
  address: {
    street: '123 Test St',
    city: 'Test City',
    state: 'Test State',
    zipcode: '12345',
  },
  images: ['image1.jpg', 'image2.jpg'],
  owner: new mongoose.Types.ObjectId(), // Fixed: Added 'new' keyword
};

describe('Business Controller', () => {
  // Hook to run before each test
  beforeEach(async () => {
    // Clear the Business collection before each test
    await Business.deleteMany({});
  });

  // Test for creating a new business listing
  describe('POST /api/businesses', () => {
    it('should create a new business listing', async () => {
      const res = await request(app)
        .post('/api/businesses')
        .send(businessData)
        .expect(201);

      expect(res.body).toHaveProperty('message', 'Business listing created successfully');
    });
  });

  // Test for getting all business listings
  describe('GET /api/businesses', () => {
    // First, create some business listings for testing
    beforeEach(async () => {
      await Business.create(businessData);
    });

    it('should get all business listings', async () => {
      const res = await request(app)
        .get('/api/businesses')
        .expect(200);

      expect(res.body).toHaveLength(1); // Assuming only one business is created
    });
  });

  // Add more tests for other CRUD operations (GET, PUT, DELETE) as needed
});
