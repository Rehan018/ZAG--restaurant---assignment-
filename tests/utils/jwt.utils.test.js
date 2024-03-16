const jwt = require('jsonwebtoken');
const { generateToken, verifyToken } = require('../../src/utils/jwt.utils');

const JWT_SECRET = 'your_secret_key_here';

describe('JWT Utils', () => {
  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const payload = { id: 'user_id', role: 'user' };
      const token = generateToken(payload);

      const decoded = jwt.verify(token, JWT_SECRET);
      expect(decoded.id).toBe(payload.id);
      expect(decoded.role).toBe(payload.role);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid JWT token', async () => {
      const payload = { id: 'user_id', role: 'user' };
      const token = jwt.sign(payload, JWT_SECRET);

      const decoded = await verifyToken(token);
      expect(decoded.id).toBe(payload.id);
      expect(decoded.role).toBe(payload.role);
    });

    it('should throw an error for an invalid JWT token', async () => {
      const invalidToken = 'invalid_token';

      await expect(verifyToken(invalidToken)).rejects.toThrow();
    });
  });
});
