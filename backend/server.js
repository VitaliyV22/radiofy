const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { createUsersTable } = require('./models/userModel');
const authRoutes = require('./routes/authRoutes');
const radioRoutes = require('./routes/radioRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
const pool = require('./config/db');

// Create users table
createUsersTable();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/radio', radioRoutes);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
