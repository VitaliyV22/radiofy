const pool = require('../config/db');

async function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Table "users" created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

module.exports = { createUsersTable };
