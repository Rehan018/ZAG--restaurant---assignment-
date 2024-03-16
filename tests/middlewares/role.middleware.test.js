// test/middlewares/role.middleware.test.js

const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { isAdmin, isBusinessOwner } = require('../../src/middlewares/role.middleware');
const User = require('../../src/models/user.model');

// Mock User.findById for testing
jest.mock('../../src/models/user.model.js', () => ({
  findById: jest.fn(),
}));

describe('Role Middleware', () => {
  describe('isAdmin Middleware', () => {
    it('should return 403 if user is not admin', async () => {
      User.findById.mockResolvedValueOnce({ role: 'user' }); // Mock user with role 'user'

      const req = mockRequest({ userId: 'user_id' });
      const res = mockResponse();

      await isAdmin(req, res, () => {});

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith({ message: 'Requires admin role' });
    });

    // Add more test cases for user with admin role and error handling
  });

  describe('isBusinessOwner Middleware', () => {
    it('should return 403 if user is not a business owner', async () => {
      User.findById.mockResolvedValueOnce({ role: 'user' }); // Mock user with role 'user'

      const req = mockRequest({ userId: 'user_id' });
      const res = mockResponse();

      await isBusinessOwner(req, res, () => {});

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith({ message: 'Requires business owner role' });
    });

    // Add more test cases for user with businessOwner role and error handling
  });
});
