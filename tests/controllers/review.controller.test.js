const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Review = require('../../src/models/review.model');
const { Types } = mongoose;

jest.spyOn(console, 'log').mockImplementation(() => {});


const reviewData = {
  rating: 4,
  comment: 'Test review comment',
  user: new Types.ObjectId(),
  business: new Types.ObjectId(),
};

describe('Review Controller', () => {
  beforeEach(async () => {
   
    await Review.deleteMany({});
  });


  afterAll(() => {
    console.log.mockRestore();
  });


  describe('POST /api/reviews', () => {
    it('should create a new review', async () => {
      const res = await request(app)
        .post('/api/reviews')
        .send(reviewData)
        .expect(201);

      expect(res.body).toHaveProperty('message', 'Review created successfully');
    });
  });

  describe('GET /api/reviews/business/:businessId', () => {

    beforeEach(async () => {
      await Review.create(reviewData);
    });

    it('should get all reviews for a business', async () => {
      const res = await request(app)
        .get(`/api/reviews/business/${reviewData.business}`)
        .expect(200);

      expect(res.body).toHaveLength(1);
    });
  });

});
