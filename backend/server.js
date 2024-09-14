const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { createUsersTable } = require('./models/userModel');
const { createFavoritesTable } = require('./models/favoritesModel');
const authRoutes = require('./routes/authRoutes');
const radioRoutes = require('./routes/radioRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
const pool = require('./config/db');

// Create users table
createUsersTable();
createFavoritesTable()

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/radio', radioRoutes);
app.use('/api/profile', authRoutes)
app.use('/api/favorites', favoritesRoutes);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
