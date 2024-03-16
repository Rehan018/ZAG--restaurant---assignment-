// tests/controllers/auth.controller.test.js

const request = require("supertest");
const app = require("../../src/app"); // Assuming your app is exported from app.js
const User = require("../../src/models/user.model");

// Mock user data for testing
const userData = {
  username: "testuser",
  email: "test@example.com",
  password: "testpassword",
  role: "user",
};

let server;

describe("Auth Controller", () => {
  // Hook to run before each test


  beforeEach(async () => {
    // Clear the User collection before each test
    await User.deleteMany({});
  });

  // Test for user signup
  describe("POST /api/auth/signup", () => {
    it("should create a new user", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send(userData)
        .expect(201);

      expect(res.body).toHaveProperty(
        "message",
        "User registered successfully"
      );
      expect(res.body).toHaveProperty("token");
    });
  });

  // Test for user signin
  describe("POST /api/auth/signin", () => {
    // First, create a user for testing
    beforeEach(async () => {
      await User.create(userData);
    });

    it("should sign in a user with valid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/signin")
        .send({ email: userData.email, password: userData.password })
        .expect(200);

      expect(res.body).toHaveProperty("token");
    });

    it('should return 404 if user is not found', async () => {
      await User.deleteMany({}); // Clear all users
    
      const res = await request(app)
        .post('/api/auth/signin')
        .send({ email: 'nonexistent@example.com', password: 'password123' })
        .expect(404);
    
      expect(res.body).toHaveProperty('message', 'User not found');
    });
    

    it("should return 401 if password is incorrect", async () => {
      const res = await request(app)
        .post("/api/auth/signin")
        .send({ email: userData.email, password: "wrongpassword" })
        .expect(401);

      expect(res.body).toHaveProperty("message", "Invalid password");
    });
  });
});
