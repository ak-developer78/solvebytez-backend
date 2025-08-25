// backend/server.js (Complete & Final Version for Deployment)

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// --- 1. Import ALL of your route files ---
const contactRoutes = require('./routes/contact');
const popupRoutes = require('./routes/popup');

const app = express();
const PORT = process.env.PORT || 8000;

// --- 2. Middleware ---
// This is your corrected CORS setup from before
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// --- 3. API Routes ---
// This part is correct and does not cause the error, but we keep it.
app.use('/api', contactRoutes);
app.use('/api', popupRoutes);


// --- 4. SERVE REACT APP (FOR PRODUCTION DEPLOYMENT) ---
// This section was likely missing or incorrect and is needed for a full-stack app.
// It must come AFTER your API routes.
app.use(express.static(path.join(__dirname, '../WEBSITE/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../WEBSITE/dist', 'index.html'));
});


// --- 5. Start the server ---
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
