const pool = require("../config/db");

async function createFavoritesTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS favorites (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        station_name VARCHAR(255) NOT NULL,
        station_url VARCHAR(255) NOT NULL,
        station_flag VARCHAR(255) NOT NULL
      );
    `;
  try {
    await pool.query(createTableQuery);
    console.log('Table "favorites" created successfully');
  } catch (error) {
    console.error("Error creating table:", error);
  }
}
module.exports = { createFavoritesTable };