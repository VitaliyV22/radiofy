const express = require('express');
const { getRadioData } = require('../controllers/radioController');

const router = express.Router();

router.get('/', getRadioData);

module.exports = router;
