// backend/index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { connectDB } = require('./config/database');
const userRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to DB
connectDB();

// ---------- CORS ----------
// Allowed origins come from env var CLIENT_ORIGINS (comma-separated),
// fallback to localhost for dev.
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (curl, mobile apps, same-origin server requests)
    if (!origin) return callback(null, true);
    if (CLIENT_ORIGINS.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS: ' + origin));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 204
};

// Apply CORS globally (this handles preflight OPTIONS for your real routes)
app.use(cors(corsOptions));

// ---------- Middlewares ----------
app.use(express.json());
app.use(cookieParser());

// ---------- Routes ----------
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to the E-Learning Platform',
    success: true
  });
});

// ---------- Start ----------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
