// backend/server.js (The Absolute Final Version)

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contact');
const popupRoutes = require('./routes/popup');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware setup
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api', contactRoutes);
app.use('/api', popupRoutes);

// A simple "health check" route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Solvebytez backend is live and running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});