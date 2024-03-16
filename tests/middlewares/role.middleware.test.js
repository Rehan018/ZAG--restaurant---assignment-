const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { isAdmin, isBusinessOwner } = require('../../src/middlewares/role.middleware');
const User = require('../../src/models/user.model');


jest.mock('../../src/models/user.model.js', () => ({
  findById: jest.fn(),
}));

describe('Role Middleware', () => {
  describe('isAdmin Middleware', () => {
    it('should return 403 if user is not admin', async () => {
      User.findById.mockResolvedValueOnce({ role: 'user' }); 

      const req = mockRequest({ userId: 'user_id' });
      const res = mockResponse();

      await isAdmin(req, res, () => {});

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith({ message: 'Requires admin role' });
    });


  });

  describe('isBusinessOwner Middleware', () => {
    it('should return 403 if user is not a business owner', async () => {
      User.findById.mockResolvedValueOnce({ role: 'user' }); 

      const req = mockRequest({ userId: 'user_id' });
      const res = mockResponse();

      await isBusinessOwner(req, res, () => {});

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith({ message: 'Requires business owner role' });
    });

  });
});
