const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const contactRoutes = require('./routes/contact');
const popupRoutes = require('./routes/popup');

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api', contactRoutes);
app.use('/api', popupRoutes);

// Serve React App in Production
// This must come AFTER your API routes.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../WEBSITE/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../WEBSITE/dist', 'index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
