const express = require('express');
const router = express.Router();
const db = require('../config/db');

// @route   POST /api/contact
// @desc    Handle contact form submission and save to DB
// @access  Public
router.post('/contact', async (req, res) => {
  const { name, email, phone, service, message } = req.body;
  if (!name || !email || !service) {
    return res.status(400).json({ msg: 'Please fill in all required fields.' });
  }

  try {
    const sql = `
      INSERT INTO contacts (name, email, phone, service, message) 
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [name, email, phone, service, message];
    await db.query(sql, values);
    
    console.log(`✅ New contact saved to PG DB: ${name}`);
    res.status(201).json({ msg: 'Thank you! Your message has been saved.' });
  } catch (error) {
    console.error('❌ PG DATABASE ERROR:', error);
    res.status(500).json({ msg: 'Server error. Please try again.' });
  }
});

module.exports = router;
