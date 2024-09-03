const express = require('express');
const { registerUser, loginUser, getUserData } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public 
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route to get user data
router.get('/profile', authenticateToken, getUserData);

module.exports = router;
