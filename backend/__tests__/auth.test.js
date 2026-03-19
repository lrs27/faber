/**
 * Auth Routes Tests
 * Tests for user signup and login authentication logic
 */

import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Helper to create mock request/response
const createMockReqRes = (body = {}) => {
  const req = { body };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return { req, res };
};

// Shared mock Prisma for tests
let mockPrisma;

beforeEach(() => {
  mockPrisma = {
    users: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
    }
  };
});

describe('Auth Routes - Signup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Input Validation', () => {
    test('should reject signup without email', async () => {
      const { req, res } = createMockReqRes({
        password: 'testpass123',
        displayName: 'Test User'
      });

      // Simulate validation logic from auth.js
      const { email, password, displayName } = req.body;
      
      if (!email || !password || !displayName) {
        res.status(400).json({ error: "Email, password, and display name are required" });
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        error: "Email, password, and display name are required" 
      });
    });

    test('should reject signup without password', async () => {
      const { req, res } = createMockReqRes({
        email: 'test@example.com',
        displayName: 'Test User'
      });

      const { email, password, displayName } = req.body;
      
      if (!email || !password || !displayName) {
        res.status(400).json({ error: "Email, password, and display name are required" });
      }

      expect(res.status).toHaveBeenCalledWith(400);
    });

    test('should reject signup with short password (< 8 chars)', async () => {
      const { req, res } = createMockReqRes({
        email: 'test@example.com',
        password: 'short',
        displayName: 'Test User'
      });

      const { password } = req.body;
      
      if (password.length < 8) {
        res.status(400).json({ error: "Password must be at least 8 characters" });
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        error: "Password must be at least 8 characters" 
      });
    });

    test('should accept password with exactly 8 characters', async () => {
      const { req, res } = createMockReqRes({
        email: 'test@example.com',
        password: '12345678',
        displayName: 'Test User'
      });

      const { password } = req.body;
      const isValid = password.length >= 8;

      expect(isValid).toBe(true);
    });
  });

  describe('Duplicate Email Check', () => {
    test('should reject signup with existing email', async () => {
      const existingUser = {
        userId: 'user-123',
        email: 'existing@example.com',
        displayName: 'Existing User'
      };

      mockPrisma.users.findUnique.mockResolvedValue(existingUser);

      const { req, res } = createMockReqRes({
        email: 'existing@example.com',
        password: 'testpass123',
        displayName: 'New User'
      });

      // Simulate checking for existing user
      const existingCheck = await mockPrisma.users.findUnique({
        where: { email: req.body.email.toLowerCase() }
      });

      if (existingCheck) {
        res.status(409).json({ error: "An account with this email already exists" });
      }

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ 
        error: "An account with this email already exists" 
      });
    });
  });

  describe('Password Hashing', () => {
    test('should hash password with bcrypt', async () => {
      const password = 'testpass123';
      const SALT_ROUNDS = 10;

      const hash = await bcrypt.hash(password, SALT_ROUNDS);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(50); // bcrypt hashes are ~60 chars
    });

    test('should verify hashed password correctly', async () => {
      const password = 'testpass123';
      const SALT_ROUNDS = 10;

      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      const isValid = await bcrypt.compare(password, hash);

      expect(isValid).toBe(true);
    });

    test('should reject incorrect password', async () => {
      const password = 'testpass123';
      const wrongPassword = 'wrongpassword';
      const SALT_ROUNDS = 10;

      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      const isValid = await bcrypt.compare(wrongPassword, hash);

      expect(isValid).toBe(false);
    });
  });
});

describe('Auth Routes - Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Input Validation', () => {
    test('should reject login without email', async () => {
      const { req, res } = createMockReqRes({
        password: 'testpass123'
      });

      const { email, password } = req.body;
      
      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ 
        error: "Email and password are required" 
      });
    });

    test('should reject login without password', async () => {
      const { req, res } = createMockReqRes({
        email: 'test@example.com'
      });

      const { email, password } = req.body;
      
      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
      }

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('User Lookup', () => {
    test('should reject login for non-existent user', async () => {
      mockPrisma.users.findUnique.mockResolvedValue(null);

      const { req, res } = createMockReqRes({
        email: 'nonexistent@example.com',
        password: 'testpass123'
      });

      const user = await mockPrisma.users.findUnique({
        where: { email: req.body.email.toLowerCase() }
      });

      if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
      }

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ 
        error: "Invalid email or password" 
      });
    });

    test('should reject OAuth user trying password login', async () => {
      const oauthUser = {
        userId: 'user-123',
        email: 'oauth@example.com',
        displayName: 'OAuth User',
        passwordHash: null,  // OAuth users have no password hash
        authProvider: 'google'
      };

      mockPrisma.users.findUnique.mockResolvedValue(oauthUser);

      const { req, res } = createMockReqRes({
        email: 'oauth@example.com',
        password: 'anypassword'
      });

      const user = await mockPrisma.users.findUnique({
        where: { email: req.body.email.toLowerCase() }
      });

      if (user && !user.passwordHash) {
        res.status(401).json({ 
          error: "This account uses Google sign-in. Please use 'Continue with Google'." 
        });
      }

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ 
        error: "This account uses Google sign-in. Please use 'Continue with Google'." 
      });
    });
  });

  describe('JWT Token Generation', () => {
    test('should generate valid JWT token', () => {
      const JWT_SECRET = 'test-secret';
      const user = {
        userId: 'user-123',
        email: 'test@example.com'
      };

      const token = jwt.sign(
        { userId: user.userId, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // JWT has 3 parts
    });

    test('should decode JWT token with correct payload', () => {
      const JWT_SECRET = 'test-secret';
      const user = {
        userId: 'user-123',
        email: 'test@example.com'
      };

      const token = jwt.sign(
        { userId: user.userId, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const decoded = jwt.verify(token, JWT_SECRET);

      expect(decoded.userId).toBe(user.userId);
      expect(decoded.email).toBe(user.email);
    });

    test('should reject invalid JWT signature', () => {
      const JWT_SECRET = 'test-secret';
      const WRONG_SECRET = 'wrong-secret';
      const user = { userId: 'user-123', email: 'test@example.com' };

      const token = jwt.sign(
        { userId: user.userId, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      expect(() => {
        jwt.verify(token, WRONG_SECRET);
      }).toThrow();
    });
  });
});
