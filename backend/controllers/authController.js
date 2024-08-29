const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    console.log('Received registration request for:', email);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
      [username, email, hashedPassword]
    );
    console.log('User inserted into database:', result.rows[0].id);

    res.status(201).json({ message: 'User registered successfully', userId: result.rows[0].id });
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
      console.error('Token', token);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
      console.error('Credential error');
    }
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Login failed' });
  }
}

module.exports = { registerUser, loginUser };
