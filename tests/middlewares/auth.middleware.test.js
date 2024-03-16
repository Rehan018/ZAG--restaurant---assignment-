const jwt = require('jsonwebtoken');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const authenticateToken = require('../../src/middlewares/auth.middleware');

const JWT_SECRET = 'your_secret_key_here';

describe('Auth Middleware', () => {
  afterEach(() => {
    jest.resetAllMocks(); 
  });

  it('should return 401 if no token provided', () => {
    const req = mockRequest({
      headers: { Authorization: '' }, 
    });
    const res = mockResponse();

    authenticateToken(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ message: 'No token provided' });
  });

  it('should return 401 if token verification failed', () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const req = mockRequest({
      headers: { Authorization: 'Bearer invalid_token' }, 
    });
    const res = mockResponse();

    authenticateToken(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ message: 'Failed to authenticate token' });
  });
});
