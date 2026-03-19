import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const SALT_ROUNDS = 10;

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    { userId: user.userId, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// POST /api/auth/signup - Email/Password signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    // Validate input
    if (!email || !password || !displayName) {
      return res.status(400).json({ error: "Email, password, and display name are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    // Hash password with bcrypt (automatically salts)
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = await prisma.users.create({
      data: {
        email: email.toLowerCase(),
        displayName,
        passwordHash,
        authProvider: "email"
      }
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: "Account created successfully",
      user: {
        userId: user.userId,
        email: user.email,
        displayName: user.displayName
      },
      token
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to create account" });
  }
});

// POST /api/auth/login - Email/Password login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const user = await prisma.users.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if user signed up with OAuth (no password)
    if (!user.passwordHash) {
      return res.status(401).json({ 
        error: "This account uses Google sign-in. Please use 'Continue with Google'." 
      });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user: {
        userId: user.userId,
        email: user.email,
        displayName: user.displayName
      },
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

// POST /api/auth/google - Google OAuth
router.post("/google", async (req, res) => {
  try {
    const { googleId, email, displayName, profileImageUrl } = req.body;

    if (!googleId || !email) {
      return res.status(400).json({ error: "Google ID and email are required" });
    }

    // Check if user exists by googleId or email
    let user = await prisma.users.findFirst({
      where: {
        OR: [
          { googleId },
          { email: email.toLowerCase() }
        ]
      }
    });

    if (user) {
      // Update existing user with Google info if not already set
      if (!user.googleId) {
        user = await prisma.users.update({
          where: { userId: user.userId },
          data: {
            googleId,
            authProvider: user.passwordHash ? user.authProvider : "google",
            profileImageUrl: profileImageUrl || user.profileImageUrl
          }
        });
      }
    } else {
      // Create new user
      user = await prisma.users.create({
        data: {
          email: email.toLowerCase(),
          displayName: displayName || email.split("@")[0],
          googleId,
          authProvider: "google",
          profileImageUrl
        }
      });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      message: user ? "Login successful" : "Account created successfully",
      user: {
        userId: user.userId,
        email: user.email,
        displayName: user.displayName
      },
      token
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ error: "Failed to authenticate with Google" });
  }
});

// GET /api/auth/me - Get current user
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.users.findUnique({
      where: { userId: decoded.userId }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        userId: user.userId,
        email: user.email,
        displayName: user.displayName,
        profileImageUrl: user.profileImageUrl,
        role: user.role
      }
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    console.error("Auth check error:", error);
    res.status(500).json({ error: "Failed to verify authentication" });
  }
});

// GET /api/auth/dashboard-stats - Get user's dashboard statistics
router.get("/dashboard-stats", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user's portfolios with stats
    const portfolios = await prisma.portfolios.findMany({
      where: { userId: decoded.userId },
      select: {
        portfolioId: true,
        title: true,
        slug: true,
        aiScore: true,
        viewCount: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
        template: {
          select: { name: true }
        }
      },
      orderBy: { updatedAt: "desc" }
    });

    // Get recent AI feedback for this user
    const recentFeedback = await prisma.aIFeedback.findMany({
      where: { userId: decoded.userId },
      select: {
        feedbackId: true,
        overallScore: true,
        createdAt: true,
        portfolio: {
          select: { title: true }
        }
      },
      orderBy: { createdAt: "desc" },
      take: 10
    });

    // Calculate stats
    const portfolioCount = portfolios.length;
    const totalViews = portfolios.reduce((sum, p) => sum + (p.viewCount || 0), 0);
    
    // Calculate average AI score (only from portfolios that have been scored)
    const scoredPortfolios = portfolios.filter(p => p.aiScore !== null);
    const avgAiScore = scoredPortfolios.length > 0
      ? Math.round(scoredPortfolios.reduce((sum, p) => sum + p.aiScore, 0) / scoredPortfolios.length)
      : 0;

    // Build activity feed from real data
    const activities = [];

    // Add portfolio creation/update activities
    for (const p of portfolios) {
      // Check if created recently (within last 30 days)
      const createdAt = new Date(p.createdAt);
      const updatedAt = new Date(p.updatedAt);
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // If created and updated at same time, it's a new portfolio
      if (Math.abs(createdAt.getTime() - updatedAt.getTime()) < 1000) {
        if (createdAt > thirtyDaysAgo) {
          activities.push({
            action: "Created portfolio",
            portfolio: p.title,
            time: p.createdAt
          });
        }
      } else {
        // Portfolio was updated
        if (updatedAt > thirtyDaysAgo) {
          activities.push({
            action: "Updated portfolio",
            portfolio: p.title,
            time: p.updatedAt
          });
        }
      }

      // Published portfolio activity
      if (p.isPublished && createdAt > thirtyDaysAgo) {
        activities.push({
          action: "Published portfolio",
          portfolio: p.title,
          time: p.updatedAt
        });
      }
    }

    // Add AI feedback activities
    for (const feedback of recentFeedback) {
      activities.push({
        action: `AI Score: ${feedback.overallScore}`,
        portfolio: feedback.portfolio.title,
        time: feedback.createdAt
      });
    }

    // Sort by time descending and take top 10
    activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    const recentActivity = activities.slice(0, 10);

    res.json({
      stats: {
        portfolioCount,
        avgAiScore,
        totalViews
      },
      portfolios: portfolios.map(p => ({
        portfolioId: p.portfolioId,
        name: p.title,
        slug: p.slug,
        template: p.template?.name || "Custom",
        lastEdited: p.updatedAt,
        score: p.aiScore || 0,
        viewCount: p.viewCount || 0,
        isPublished: p.isPublished
      })),
      recentActivity
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    console.error("Dashboard stats error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

export default router;
