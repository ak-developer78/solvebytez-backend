const express = require('express');
const router = express.Router();
const db = require('../config/db');

// @route   POST /api/popup-submit
// @desc    Handle popup form submission and save to DB
// @access  Public
router.post('/popup-submit', async (req, res) => {
  const { fullName, email, service, message } = req.body;
  if (!fullName || !email || !service || !message) {
    return res.status(400).json({ msg: 'Please fill in all fields.' });
  }

  try {
    const sql = `
      INSERT INTO popup_submissions (name, email, service, message) 
      VALUES ($1, $2, $3, $4)
    `;
    const values = [fullName, email, service, message];
    await db.query(sql, values);

    console.log(`✅ New popup submission saved to PG DB: ${fullName}`);
    res.status(201).json({ msg: 'Thank you! Your message has been sent.' });
  } catch (error) {
    console.error('❌ PG DATABASE ERROR (POPUP):', error);
    res.status(500).json({ msg: 'Server error. Please try again.' });
  }
});

module.exports = router;
