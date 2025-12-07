// config/database.js
const mongoose = require('mongoose');

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    // Optional: exit process if DB is required for app
    // process.exit(1);
  }
}

module.exports = { connectDB };
