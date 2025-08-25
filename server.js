// backend/server.js (The Definitive Final Version)

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contact');
const popupRoutes = require('./routes/popup');

const app = express();
const PORT = process.env.PORT || 8000;

// --- ADVANCED CORS CONFIGURATION ---
// This is the definitive fix. It creates a "whitelist" of allowed URLs.
const whitelist = [
  process.env.FRONTEND_URL, 
  'https://ak-developer78.github.io' // Add the second possible origin here
];

const corsOptions = {
  origin: function (origin, callback) {
    // If the origin is in our whitelist (or if it's not a browser request), allow it.
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};
// --- END OF ADVANCED CORS ---


// Middleware setup
app.use(cors(corsOptions)); // Use the new advanced options
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
