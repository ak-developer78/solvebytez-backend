const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log('✅ PostgreSQL Connection Pool Created');

module.exports = {
  query: (text, params) => pool.query(text, params),
};
