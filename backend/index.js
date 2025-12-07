const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { connectDB } = require("./config/database");
const userRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const PORT = process.env.PORT || 4000;

// connect DB
connectDB();

// --- CORS setup ---
// Allowed origins come from an env var (comma separated) or fallback to localhost + your Vercel URL
// Set CLIENT_ORIGINS on Render to: https://your-frontend.vercel.app,http://localhost:3000
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGINS || 'http://localhost:3000').split(',');

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like curl, mobile apps, server-to-server)
    if (!origin) return callback(null, true);
    if (CLIENT_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // enable preflight for all routes

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the E-Learning Platform",
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
