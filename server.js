// backend/server.js (Complete & Final Version for Deployment)

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Loads variables from .env file

// --- 1. Import ALL of your route files ---
const contactRoutes = require('./routes/contact');
const popupRoutes = require('./routes/popup');

const app = express();
const PORT = process.env.PORT || 8000;

// --- 2. Middleware ---

// IMPORTANT: Configure CORS for your live frontend URL
// This tells your backend that it's okay to accept requests from your live React app.
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Use the live URL from Render's env variables
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// This allows the server to accept and parse JSON data in request bodies
app.use(express.json());

// --- 3. API Routes ---
// This tells the server to use your route files for any request starting with /api
app.use('/api', contactRoutes);
app.use('/api', popupRoutes);


// --- 4. SERVE REACT APP (FOR PRODUCTION DEPLOYMENT) ---
// This section is crucial for Render to correctly serve your full-stack application.
// It tells Express that if a request is not for the API, it should serve the built React files.
if (process.env.NODE_ENV === 'production') {
  // Set the static folder (points to the 'dist' folder where your built React app lives)
  app.use(express.static(path.join(__dirname, '../WEBSITE/dist')));

  // For any other route that is not an API route, serve the React app's main index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../WEBSITE/dist', 'index.html'));
  });
}


// --- 5. Start the server ---
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});