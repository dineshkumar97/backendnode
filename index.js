import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { setServers } from "node:dns/promises";
import serverless from "serverless-http";

import userDetailsRouter from "./src/routes/userDetailsRouter.js";

setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const mongooseString = process.env.DATABASE_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api-learn/user", userDetailsRouter);

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Node.js Express API is working",
    environment: process.env.NODE_ENV || "development"
  });
});

// MongoDB
mongoose
  .connect(mongooseString)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });


// ------------------------------------
// LOCAL
// ------------------------------------
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}


// ------------------------------------
// AWS LAMBDA
// ------------------------------------
export const handler = serverless(app);