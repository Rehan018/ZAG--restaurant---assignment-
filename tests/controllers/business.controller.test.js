const request = require('supertest');
const app = require('../../src/app'); 
const mongoose = require('mongoose');
const Business = require('../../src/models/business.model');

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
  owner: new mongoose.Types.ObjectId(),
};

describe('Business Controller', () => {

  beforeEach(async () => {
    await Business.deleteMany({});
  });

  describe('POST /api/businesses', () => {
    it('should create a new business listing', async () => {
      const res = await request(app)
        .post('/api/businesses')
        .send(businessData)
        .expect(201);

      expect(res.body).toHaveProperty('message', 'Business listing created successfully');
    });
  });


  describe('GET /api/businesses', () => {

    beforeEach(async () => {
      await Business.create(businessData);
    });

    it('should get all business listings', async () => {
      const res = await request(app)
        .get('/api/businesses')
        .expect(200);

      expect(res.body).toHaveLength(1); 
    });
  });


});
