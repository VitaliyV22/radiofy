const express = require('express');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoritesController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router()

// Get user's favorites
router.get('/getFavorites', authenticateToken, getFavorites);

// Add a favorite
router.post('/addFavorites', authenticateToken, addFavorite);

// Remove a favorite
router.delete('/removeFavorite/:id', authenticateToken, removeFavorite);

module.exports = router;