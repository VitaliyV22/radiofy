const pool = require("../config/db");

// get favorites
async function getFavorites(req, res) {
  try {
    const userId = req.user.userId; // Assumes the user ID is stored in req.user by authenticateToken
    const result = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Error fetching favorites" });
  }
}

//   add favorite

async function addFavorite(req, res) {
  try {
    const userId = req.user.userId;
    const { station_name, station_url, station_flag } = req.body;
    const result = await pool.query(
      "INSERT INTO favorites (user_id, station_name, station_url,station_flag) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, station_name, station_url, station_flag]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Error adding favorite" });
  }
}

// remove fav

async function removeFavorite(req, res) {
  try {
    const userId = req.user.userId;
    const favoriteId = req.params.id;
    const result = await pool.query(
      "DELETE FROM favorites WHERE id = $1 AND user_id = $2 RETURNING *",
      [favoriteId, userId]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Favorite not found or not authorized" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Error removing favorite" });
  }
}

module.exports = { getFavorites, addFavorite, removeFavorite };
