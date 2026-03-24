import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Prisma, PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const prisma = new PrismaClient;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

// Routes
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Portfolio Builder API" });
});

// Return user data
app.get("/api/users/:userId", async (req, res) => {
  const userId = req.params['userId'];
  const user = await prisma.users.findUnique({
    where: {userId: userId}
  });

  res.json(user)
});

app.get("/api/users/:userId/portfolios", async (req, res) => {
  const userId = req.params['userId'];
  const userPortolios = await prisma.portfolios.findMany({
    where: {userId: userId}
  });

  res.json(userPortolios);

})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
