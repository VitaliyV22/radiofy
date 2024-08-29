const express = require("express");
const cors = require("cors");
const radioData = require("./data/radioData.json");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const pool = new Pool({
  user: 'doadmin',
  host: 'db-postgresql-radiofy-do-user-17629119-0.k.db.ondigitalocean.com',
  database: 'defaultdb',
  password: 'AVNS_7DCTal7XAh3M9BQP9Bc',
  port: 25060,
  ssl: {
    require: true,
    rejectUnauthorized: false
}
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to the database. Current time:', res.rows[0].now);
  }
});

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


createUsersTable();

app.post('/api/register', async (req, res) => {
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
});

// Login endpoint
app.post('/api/login', async (req, res) => {
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
      console.error('Credential error:', error);
    }
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Login failed' });
  }
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Protected route example
app.get('api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user.userId });
});



app.get("/api/radioData", (req, res) => {
  res.json(radioData);
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
