const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Review = require('../../src/models/review.model');
const { Types } = mongoose;

// Mock console.log to suppress output during test execution
jest.spyOn(console, 'log').mockImplementation(() => {});

// Mock review data for testing
const reviewData = {
  rating: 4,
  comment: 'Test review comment',
  user: new Types.ObjectId(),
  business: new Types.ObjectId(),
};

describe('Review Controller', () => {
  // Hook to run before each test
  beforeEach(async () => {
    // Clear the Review collection before each test
    await Review.deleteMany({});
  });

  // Restore console.log after all tests are finished
  afterAll(() => {
    console.log.mockRestore();
  });

  // Test for creating a new review
  describe('POST /api/reviews', () => {
    it('should create a new review', async () => {
      const res = await request(app)
        .post('/api/reviews')
        .send(reviewData)
        .expect(201);

      expect(res.body).toHaveProperty('message', 'Review created successfully');
    });
  });

  // Test for getting all reviews for a business
  describe('GET /api/reviews/business/:businessId', () => {
    // First, create some reviews for testing
    beforeEach(async () => {
      await Review.create(reviewData);
    });

    it('should get all reviews for a business', async () => {
      const res = await request(app)
        .get(`/api/reviews/business/${reviewData.business}`)
        .expect(200);

      expect(res.body).toHaveLength(1); // Assuming only one review is created
    });
  });

  // Add more tests for other CRUD operations (PUT, DELETE) as needed
});
