const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public 
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected 
router.get('/profile', authenticateToken, (req, res) => {

  res.json({ message: 'This is a protected profile route', user: req.user });
});

module.exports = router;
